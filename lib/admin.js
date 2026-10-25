// Live-site editor. Loaded only for a signed-in admin (see lib/content.js boot()).
import { getClient, publicUrl } from "./supabase";
import { store, applyAll, keyFor, metaOf, persist, norm } from "./content";

const DEMO = process.env.NODE_ENV === "development" && typeof localStorage !== "undefined" && localStorage.getItem("bz:demo") === "1";

const SLOTS = [
  { id: "hero", label: "ჰეროს ფონი (კომპიუტერი)", def: "/bg/hero.webp", keys: ["css:hero"], maxW: 2560 },
  { id: "hero-m", label: "ჰეროს ფონი (ტელეფონი)", def: "/bg/hero-m.webp", keys: ["css:hero-m", "css:hero-m-blur", "css:hero-m-tile"], maxW: 1170 },
  { id: "section", label: "სექციების ფონი", def: "/bg/section.webp", keys: ["css:section"], maxW: 2000 },
  { id: "banner", label: "ბანერის ფონი", def: "/bg/hero.webp", keys: ["css:banner"], maxW: 2560 },
];

const CSS = `
[data-admin-ui],[data-admin-ui] *{box-sizing:border-box;font-family:inherit;letter-spacing:normal}
.bzbar{position:fixed;left:50%;bottom:12px;transform:translateX(-50%);z-index:2147483000;display:flex;gap:6px;align-items:center;flex-wrap:nowrap;justify-content:center;max-width:calc(100vw - 16px);padding:6px;border-radius:99px;white-space:nowrap;background:rgba(20,48,32,.92);color:#fff;box-shadow:0 14px 40px -10px rgba(0,0,0,.5);font-size:13px}
.bzbar button{min-height:38px;padding:0 13px;white-space:nowrap;border-radius:99px;border:0;background:rgba(255,255,255,.14);color:#fff;font-size:13px;cursor:pointer}
.bzbar button.on{background:#9CAA88;color:#12301F}
.bzbar .st{padding:0 8px;opacity:.85;min-width:0}
.bzbar .st:empty{display:none}
@media(max-width:600px){.bzbar .st{display:none}}
.bzhl{position:fixed;left:0;top:0;z-index:2147482990;pointer-events:none;border:2px dashed #3F7248;background:rgba(63,114,72,.14);border-radius:6px;display:none}
.bzpop{position:fixed;z-index:2147483001;width:min(440px,calc(100vw - 24px));padding:14px;border-radius:20px;background:#fff;color:#1B3A27;box-shadow:0 24px 60px -12px rgba(0,0,0,.45);display:grid;gap:10px;font-size:14px;max-height:calc(100vh - 24px);overflow:auto}
.bzpop textarea{width:100%;border:1.5px solid #cfd8c9;border-radius:12px;padding:10px 12px;font-size:16px;line-height:1.45;resize:vertical;color:#1B3A27;background:#fff}
.bzpop textarea:focus{outline:none;border-color:#3F7248}
.bzpop .row{display:flex;gap:8px;flex-wrap:wrap}
.bzpop button,.bzpop label.btn{min-height:40px;padding:0 16px;border-radius:99px;border:1.5px solid #cfd8c9;background:#fff;color:#1B3A27;font-size:14px;cursor:pointer;display:inline-flex;align-items:center}
.bzpop .pri{background:#224D30;border-color:#224D30;color:#fff}
.bzpop h4{font-size:15px;margin:0}
.bzpop img.th{width:100%;max-height:180px;object-fit:contain;border-radius:12px;background:#eef2e8}
.bzpop .slot{display:grid;grid-template-columns:72px 1fr;gap:10px;align-items:center;padding:8px;border-radius:14px;background:#f2f5ee}
.bzpop .slot img{width:72px;height:54px;object-fit:cover;border-radius:8px}
.bzpop .slot b{display:block;font-weight:500;margin-bottom:6px}
.bzpop input[type=file]{display:none}
html.bz-on,html.bz-on *:not([data-admin-ui] *){cursor:text !important}
`;

function h(tag, attrs, ...kids) {
  const e = document.createElement(tag);
  for (const k in attrs || {}) {
    if (k === "class") e.className = attrs[k];
    else if (k.startsWith("on")) e.addEventListener(k.slice(2), attrs[k]);
    else e.setAttribute(k, attrs[k]);
  }
  kids.flat().forEach((c) => e.append(c));
  return e;
}

function fakeClient() {
  const ok = async () => ({ error: null });
  const q = () => ({ upsert: ok, delete: () => ({ eq: ok, in: ok }) });
  return { from: q, storage: { from: () => ({ upload: ok }) }, auth: { signOut: ok } };
}

async function toCanvas(file, maxW) {
  const bmp = await createImageBitmap(file);
  const s = Math.min(1, maxW / bmp.width);
  const c = document.createElement("canvas");
  c.width = Math.round(bmp.width * s);
  c.height = Math.round(bmp.height * s);
  c.getContext("2d").drawImage(bmp, 0, 0, c.width, c.height);
  return c;
}
const toBlob = (c, mime, q) => new Promise((r) => c.toBlob(r, mime, q));

export async function start() {
  if (window.__bzAdmin) return;
  let client;
  if (DEMO) client = fakeClient();
  else {
    client = await getClient();
    const { data } = await client.auth.getSession();
    if (!data.session) return;
    const r = await client.rpc("is_admin");
    if (r.error || r.data !== true) return;
  }
  window.__bzAdmin = true;

  const put = async (blob, name) => {
    if (DEMO) return URL.createObjectURL(blob);
    const ext = blob.type.includes("webp") ? "webp" : blob.type.includes("png") ? "png" : "jpg";
    const path = `up/${Date.now()}-${name}.${ext}`;
    const { error } = await client.storage.from("site").upload(path, blob, { contentType: blob.type, cacheControl: "31536000" });
    if (error) throw error;
    return publicUrl(path);
  };

  document.head.append(h("style", { "data-admin-ui": "" }, CSS));
  const st = h("span", { class: "st" }, "");
  const status = (t, ms = 3500) => { st.textContent = t; if (ms) setTimeout(() => { if (st.textContent === t) st.textContent = ""; }, ms); };
  const hl = h("div", { class: "bzhl", "data-admin-ui": "" });
  let pop = null;
  let on = false;

  const toggle = h("button", { onclick: () => setOn(!on) }, "რედაქტირება");
  const bgBtn = h("button", { onclick: () => openBackgrounds() }, "ფონები");
  const outBtn = h("button", { onclick: async () => { await client.auth.signOut(); location.reload(); } }, "გასვლა");
  const bar = h("div", { class: "bzbar", "data-admin-ui": "" }, toggle, bgBtn, outBtn, st);
  document.body.append(bar, hl);

  const closePop = () => { if (pop) { pop.remove(); pop = null; } };
  const place = (rect) => {
    const w = pop.offsetWidth, ph = pop.offsetHeight;
    let top = rect ? rect.bottom + 10 : (innerHeight - ph) / 2;
    if (top + ph > innerHeight - 12) top = rect ? Math.max(12, rect.top - ph - 10) : 12;
    let left = rect ? rect.left : (innerWidth - w) / 2;
    left = Math.min(Math.max(12, left), innerWidth - w - 12);
    pop.style.top = top + "px";
    pop.style.left = left + "px";
  };
  const openPop = (rect, ...kids) => {
    closePop();
    pop = h("div", { class: "bzpop", "data-admin-ui": "", "data-lenis-prevent": "" }, ...kids);
    document.body.append(pop);
    place(rect);
  };

  const dbErr = (e) => status("შეცდომა: " + (e && e.message ? e.message : "ვერ შეინახა"), 7000);

  async function saveText(key, value, orig) {
    const same = value === norm(orig);
    const t = client.from("site_texts");
    const res = same ? await t.delete().eq("key", key) : await t.upsert({ key, value, updated_at: new Date().toISOString() });
    if (res.error) return dbErr(res.error);
    if (same) delete store.texts[key]; else store.texts[key] = value;
    persist(); applyAll(); status("შენახულია ✓");
  }

  function editText(node, rect) {
    const m = metaOf(node);
    const key = keyFor(node);
    if (!key) return;
    const ta = h("textarea", { rows: String(Math.min(7, Math.ceil(norm(node.nodeValue).length / 36) + 1)) });
    ta.value = norm(node.nodeValue);
    const save = async () => { const v = norm(ta.value); if (!v) return status("ტექსტი ცარიელი ვერ იქნება"); closePop(); await saveText(key, v, m.orig); };
    ta.addEventListener("keydown", (e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); save(); } if (e.key === "Escape") closePop(); });
    openPop(rect,
      h("h4", {}, "ტექსტის შეცვლა"),
      ta,
      h("div", { class: "row" },
        h("button", { class: "pri", onclick: save }, "შენახვა"),
        h("button", { onclick: async () => { closePop(); await saveText(key, norm(m.orig), m.orig); } }, "საწყისზე დაბრუნება"),
        h("button", { onclick: closePop }, "გაუქმება")));
    ta.focus(); ta.select();
  }

  async function uploadPlain(file, maxW, name) {
    const c = await toCanvas(file, maxW);
    let blob = await toBlob(c, "image/webp", 0.88);
    if (!blob) blob = file;
    return put(blob, name);
  }

  async function uploadHeroM(file) {
    const c = await toCanvas(file, 1170);
    const w = c.width, hh = c.height;
    const main = await put(await toBlob(c, "image/webp", 0.88), "hero-m");
    const small = document.createElement("canvas");
    small.width = Math.max(8, Math.round(w * 0.12)); small.height = Math.max(8, Math.round(hh * 0.12));
    const sx = small.getContext("2d"); sx.imageSmoothingQuality = "high"; sx.drawImage(c, 0, 0, small.width, small.height);
    const soft = (w2, h2) => {
      const o = document.createElement("canvas"); o.width = w2; o.height = h2;
      const x = o.getContext("2d"); x.imageSmoothingQuality = "high"; x.drawImage(small, 0, 0, w2, h2);
      x.fillStyle = "rgba(236,238,228,.12)"; x.fillRect(0, 0, w2, h2);
      return o;
    };
    const blur = await put(await toBlob(soft(Math.round(w / 2), Math.round(hh / 2)), "image/jpeg", 0.8), "hero-m-blur");
    const full = soft(w, hh);
    const tile = document.createElement("canvas"); tile.width = w; tile.height = hh * 2;
    const tx = tile.getContext("2d"); tx.drawImage(full, 0, 0);
    tx.save(); tx.translate(0, hh * 2); tx.scale(1, -1); tx.drawImage(full, 0, 0); tx.restore();
    const tl = await put(await toBlob(tile, "image/jpeg", 0.82), "hero-m-tile");
    return { "css:hero-m": main, "css:hero-m-blur": blur, "css:hero-m-tile": tl };
  }

  async function saveImgs(map) {
    const rows = Object.entries(map).map(([key, url]) => ({ key, url, updated_at: new Date().toISOString() }));
    const { error } = await client.from("site_images").upsert(rows);
    if (error) return dbErr(error);
    Object.assign(store.imgs, map);
    persist(); applyAll(); status("შენახულია ✓");
  }
  async function resetImgs(keys) {
    const { error } = await client.from("site_images").delete().in("key", keys);
    if (error) return dbErr(error);
    keys.forEach((k) => delete store.imgs[k]);
    persist(); applyAll(); status("საწყისი დაბრუნდა ✓");
  }

  const fileInput = (onFile) => {
    const i = h("input", { type: "file", accept: "image/*" });
    i.addEventListener("change", async () => {
      const f = i.files && i.files[0];
      if (!f) return;
      status("იტვირთება...", 0);
      try { await onFile(f); } catch (e) { dbErr(e); }
    });
    return i;
  };

  function editImg(img) {
    const orig = img.dataset.orig || img.getAttribute("src");
    const key = "img:" + orig;
    const inp = fileInput(async (f) => { const url = await uploadPlain(f, 1600, "img"); closePop(); await saveImgs({ [key]: url }); });
    openPop(img.getBoundingClientRect(),
      h("h4", {}, "ფოტოს შეცვლა"),
      h("img", { class: "th", src: img.currentSrc || img.src, alt: "" }),
      h("div", { class: "row" },
        h("label", { class: "btn pri" }, "აირჩიე ახალი ფოტო", inp),
        h("button", { onclick: async () => { closePop(); await resetImgs([key]); } }, "საწყისზე დაბრუნება"),
        h("button", { onclick: closePop }, "დახურვა")));
  }

  function openBackgrounds() {
    const rows = SLOTS.map((s) => {
      const cur = store.imgs[s.keys[0]] || s.def;
      const inp = fileInput(async (f) => {
        const map = s.id === "hero-m" ? await uploadHeroM(f) : { [s.keys[0]]: await uploadPlain(f, s.maxW, s.id) };
        await saveImgs(map); openBackgrounds();
      });
      return h("div", { class: "slot" },
        h("img", { src: cur, alt: "" }),
        h("div", {}, h("b", {}, s.label),
          h("div", { class: "row" },
            h("label", { class: "btn" }, "შეცვლა", inp),
            h("button", { onclick: async () => { await resetImgs(s.keys); openBackgrounds(); } }, "საწყისი"))));
    });
    openPop(null, h("h4", {}, "ფონის ფოტოები"), ...rows, h("div", { class: "row" }, h("button", { onclick: closePop }, "დახურვა")));
  }

  function hit(x, y) {
    for (const el of document.elementsFromPoint(x, y)) {
      if (el.closest("[data-admin-ui]")) continue;
      if (el.tagName === "IMG") return { type: "img", el, rect: el.getBoundingClientRect() };
      for (const n of el.childNodes) {
        if (n.nodeType !== 3 || !n.nodeValue.trim()) continue;
        const r = document.createRange();
        r.selectNodeContents(n);
        for (const rc of r.getClientRects()) {
          if (x >= rc.left - 3 && x <= rc.right + 3 && y >= rc.top - 3 && y <= rc.bottom + 3) return { type: "text", node: n, rect: r.getBoundingClientRect() };
        }
      }
    }
    return null;
  }

  let raf = 0, lx = 0, ly = 0;
  const onMove = (e) => {
    lx = e.clientX; ly = e.clientY;
    if (raf) return;
    raf = requestAnimationFrame(() => {
      raf = 0;
      const t = hit(lx, ly);
      if (!t) { hl.style.display = "none"; return; }
      hl.style.display = "block";
      hl.style.transform = `translate(${t.rect.left - 3}px,${t.rect.top - 3}px)`;
      hl.style.width = t.rect.width + 6 + "px";
      hl.style.height = t.rect.height + 6 + "px";
    });
  };
  const onScroll = () => { hl.style.display = "none"; };
  const onClick = (e) => {
    if (e.target.closest && e.target.closest("[data-admin-ui]")) return;
    e.preventDefault(); e.stopPropagation();
    const t = hit(e.clientX, e.clientY);
    if (!t) { closePop(); return; }
    if (t.type === "text") editText(t.node, t.rect); else editImg(t.el);
  };

  function setOn(v) {
    on = v;
    document.documentElement.classList.toggle("bz-on", v);
    toggle.classList.toggle("on", v);
    toggle.textContent = v ? "რედაქტირება ✓" : "რედაქტირება";
    if (v) {
      addEventListener("click", onClick, true);
      addEventListener("mousemove", onMove, { passive: true });
      addEventListener("scroll", onScroll, { passive: true });
      status("დააჭირე ნებისმიერ ტექსტს ან ფოტოს");
    } else {
      removeEventListener("click", onClick, true);
      removeEventListener("mousemove", onMove);
      removeEventListener("scroll", onScroll);
      hl.style.display = "none";
      closePop();
    }
  }
}

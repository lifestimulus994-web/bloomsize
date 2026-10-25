import { SUPA_URL, SUPA_KEY } from "./supabase";

const SKIP = new Set(["SCRIPT", "STYLE", "NOSCRIPT", "TEXTAREA", "INPUT", "SELECT"]);
const CSSVAR = {
  "css:hero": "--img-hero",
  "css:hero-m": "--img-hero-m",
  "css:hero-m-blur": "--img-hero-m-blur",
  "css:hero-m-tile": "--img-tile",
  "css:section": "--img-section",
  "css:banner": "--img-banner",
};
const meta = new WeakMap();
export const store = { texts: {}, imgs: {} };

export const norm = (s) => s.replace(/\s+/g, " ").trim();
function hash(s) {
  let h = 5381;
  for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) | 0;
  return (h >>> 0).toString(36);
}

function secOf(n) {
  const s = n.parentElement && n.parentElement.closest("section,header,footer,.mnav,.modal,.toast");
  if (!s) return "page";
  if (s.tagName === "SECTION") return s.id || s.className.trim().replace(/\s+/g, "-") || "section";
  if (s.tagName === "HEADER") return "hdr";
  if (s.tagName === "FOOTER") return "ftr";
  if (s.classList.contains("mnav")) return "menu";
  if (s.classList.contains("modal")) return "checkout";
  return "toast";
}

export function metaOf(n) {
  let m = meta.get(n);
  if (!m) { m = { orig: n.nodeValue, applied: n.nodeValue }; meta.set(n, m); }
  else if (n.nodeValue !== m.applied) { m.orig = n.nodeValue; m.applied = n.nodeValue; }
  return m;
}

function textNodes() {
  const out = [];
  const tw = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode(n) {
      const p = n.parentElement;
      if (!p || SKIP.has(p.tagName) || p.closest("[data-admin-ui]")) return NodeFilter.FILTER_REJECT;
      return n.nodeValue.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
    },
  });
  let n;
  while ((n = tw.nextNode())) out.push(n);
  return out;
}

function keyed() {
  const counts = {};
  return textNodes().map((n) => {
    const m = metaOf(n);
    const base = secOf(n) + "|" + hash(norm(m.orig));
    counts[base] = (counts[base] || 0) + 1;
    return { n, m, key: base + "|" + counts[base] };
  });
}

export function keyFor(node) {
  const f = keyed().find((x) => x.n === node);
  return f && f.key;
}

function applyImages() {
  const root = document.documentElement;
  for (const k in CSSVAR) {
    const u = store.imgs[k];
    if (u) root.style.setProperty(CSSVAR[k], `url("${u}")`);
    else root.style.removeProperty(CSSVAR[k]);
  }
  document.querySelectorAll("img").forEach((img) => {
    if (img.closest("[data-admin-ui]")) return;
    if (img.dataset.orig === undefined) img.dataset.orig = img.getAttribute("src") || "";
    const want = store.imgs["img:" + img.dataset.orig] || img.dataset.orig;
    if (want && img.getAttribute("src") !== want) img.setAttribute("src", want);
  });
}

export function applyAll() {
  for (const { n, m, key } of keyed()) {
    const v = store.texts[key];
    let target = m.orig;
    if (v != null) target = m.orig.match(/^\s*/)[0] + v + m.orig.match(/\s*$/)[0];
    if (n.nodeValue !== target) n.nodeValue = target;
    m.applied = target;
  }
  applyImages();
}

export function persist() {
  try {
    localStorage.setItem("bz:texts", JSON.stringify(store.texts));
    localStorage.setItem("bz:imgs", JSON.stringify(store.imgs));
  } catch {}
}

let started = false;
let timer;
const schedule = () => { clearTimeout(timer); timer = setTimeout(applyAll, 60); };

async function fetchAll() {
  try {
    const headers = { apikey: SUPA_KEY };
    const [a, b] = await Promise.all([
      fetch(`${SUPA_URL}/rest/v1/site_texts?select=key,value`, { headers }),
      fetch(`${SUPA_URL}/rest/v1/site_images?select=key,url`, { headers }),
    ]);
    if (!a.ok || !b.ok) return;
    const ta = await a.json();
    const tb = await b.json();
    store.texts = Object.fromEntries(ta.map((r) => [r.key, r.value]));
    store.imgs = Object.fromEntries(tb.map((r) => [r.key, r.url]));
    persist();
    applyAll();
  } catch {}
}

const hasSession = () => {
  try {
    if (process.env.NODE_ENV === "development" && /bzdemo=1/.test(location.search)) localStorage.setItem("bz:demo", "1");
    return Object.keys(localStorage).some((k) => /^sb-.*-auth-token$/.test(k)) ||
      (process.env.NODE_ENV === "development" && localStorage.getItem("bz:demo") === "1");
  } catch { return false; }
};

export function boot() {
  if (started) return;
  started = true;
  if (process.env.NODE_ENV === "development") window.__bz = { store, applyAll, keyFor };
  try {
    store.texts = JSON.parse(localStorage.getItem("bz:texts") || "{}");
    store.imgs = JSON.parse(localStorage.getItem("bz:imgs") || "{}");
  } catch {}
  applyAll();
  new MutationObserver(schedule).observe(document.body, { childList: true, subtree: true, characterData: true });
  fetchAll();
  if (hasSession()) import("./admin").then((m) => m.start());
}

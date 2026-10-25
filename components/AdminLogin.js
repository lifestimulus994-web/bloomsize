"use client";
import { useState } from "react";
import { getClient } from "../lib/supabase";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setErr(""); setBusy(true);
    try {
      const c = await getClient();
      const { error } = await c.auth.signInWithPassword({ email: email.trim(), password: pass });
      if (error) { setErr("მეილი ან პაროლი არასწორია"); setBusy(false); return; }
      const r = await c.rpc("is_admin");
      if (r.error || r.data !== true) { await c.auth.signOut(); setErr("ამ ანგარიშს ადმინის უფლება არ აქვს"); setBusy(false); return; }
      window.location.href = "/";
    } catch {
      setErr("კავშირის შეცდომა, სცადე თავიდან"); setBusy(false);
    }
  };

  return (
    <main className="adm-login">
      <form className="glass adm-card" onSubmit={submit} noValidate>
        <h1>ადმინ პანელი</h1>
        <div className="fld"><label htmlFor="ae">ელფოსტა</label><input id="ae" type="email" autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} /></div>
        <div className="fld"><label htmlFor="ap">პაროლი</label><input id="ap" type="password" autoComplete="current-password" value={pass} onChange={(e) => setPass(e.target.value)} /></div>
        {err && <p className="err" role="alert">{err}</p>}
        <button className="btn btn-forest" type="submit" disabled={busy}>{busy ? "ვამოწმებ..." : "შესვლა"}</button>
      </form>
    </main>
  );
}

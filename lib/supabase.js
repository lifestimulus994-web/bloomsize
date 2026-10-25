export const SUPA_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://uxfpawpwpfyzviyqhzuh.supabase.co";
export const SUPA_KEY = process.env.NEXT_PUBLIC_SUPABASE_KEY || "sb_publishable_kA3yU-TaPhVZIS9Mi8B5cA_IO_lrtnm";
export const publicUrl = (path) => `${SUPA_URL}/storage/v1/object/public/site/${path}`;

let client;
export async function getClient() {
  if (!client) {
    const { createClient } = await import("@supabase/supabase-js");
    client = createClient(SUPA_URL, SUPA_KEY, { auth: { persistSession: true, autoRefreshToken: true } });
  }
  return client;
}

// Deletes the signed-in user's account and all their data (Google Play requires in-app account deletion).
// The service role key never leaves the server: Supabase injects it into this function's environment.
// Only the caller can be deleted: the user id comes from their own verified access token, never from the request body.
import { createClient } from "npm:@supabase/supabase-js@2.45.4";

const ALLOWED = ["https://rababalhendy2-crypto.github.io", "http://localhost", "https://localhost", "capacitor://localhost"];

function cors(origin: string | null) {
  const allow = origin && ALLOWED.some(a => origin === a || origin.startsWith(a + ":")) ? origin : ALLOWED[0];
  return {
    "Access-Control-Allow-Origin": allow,
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Vary": "Origin",
  };
}

Deno.serve(async (req: Request) => {
  const headers = { ...cors(req.headers.get("Origin")), "Content-Type": "application/json" };
  const reply = (status: number, body: unknown) => new Response(JSON.stringify(body), { status, headers });
  if (req.method === "OPTIONS") return new Response(null, { status: 204, headers });
  if (req.method !== "POST") return reply(405, { error: "method not allowed" });

  const token = (req.headers.get("Authorization") || "").replace(/^Bearer\s+/i, "");
  if (!token) return reply(401, { error: "not signed in" });

  const url = Deno.env.get("SUPABASE_URL")!;
  const admin = createClient(url, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  // Verify the token with Supabase Auth and take the user id from it.
  const { data: who, error: whoErr } = await admin.auth.getUser(token);
  if (whoErr || !who?.user) return reply(401, { error: "not signed in" });
  const uid = who.user.id;

  // With two-step sign-in turned on, deleting needs a session that passed the code check.
  const hasMfa = (who.user.factors || []).some((f: { status: string }) => f.status === "verified");
  if (hasMfa) {
    let aal = "";
    try {
      const b64 = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
      aal = JSON.parse(atob(b64 + "=".repeat((4 - b64.length % 4) % 4))).aal || "";
    } catch (_) { /* bad token */ }
    if (aal !== "aal2") return reply(403, { error: "two-step check needed" });
  }

  const { error: rowsErr } = await admin.from("user_docs").delete().eq("user_id", uid);
  if (rowsErr) return reply(500, { error: "could not delete data" });

  const { error: userErr } = await admin.auth.admin.deleteUser(uid);
  if (userErr) return reply(500, { error: "could not delete account" });

  return reply(200, { deleted: true });
});

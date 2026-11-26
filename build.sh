#!/usr/bin/env bash
# Inlines CSS, lesson content and app code into one page (dist/index.html).
# The same page is what a Capacitor Android shell will load later.
set -euo pipefail
cd "$(dirname "$0")"
mkdir -p dist
node -e '
const fs = require("fs");
const read = f => fs.readFileSync(f, "utf8");
const content = fs.readdirSync("src/content").filter(f => f.endsWith(".js")).sort().map(f => read("src/content/" + f)).join("\n");
const out = read("src/shell.html")
  .replace("/*CSS*/", () => read("src/styles.css"))
  .replace("/*CONTENT*/", () => content)
  .replace("/*APP*/", () => read("src/app.js"));
fs.writeFileSync("dist/index.html", out);
console.log("dist/index.html", (out.length / 1024).toFixed(1) + " KB");
'
# Standalone copy for GitHub Pages (docs/) and Capacitor: same page with its own document skeleton.
# The CSP meta tag limits where scripts, frames and data requests may go. GitHub Pages cannot send security
# headers, so this tag is the only place to set it. 'unsafe-inline' stays because the whole app is inlined
# and the Android shell injects its bridge script into the page.
mkdir -p web
node -e '
const fs = require("fs");
const body = fs.readFileSync("dist/index.html", "utf8");
const head = `<!doctype html><html lang="ar"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><meta name="theme-color" content="#F2F8F7"><meta http-equiv="Content-Security-Policy" content="default-src &#39;self&#39;; script-src &#39;self&#39; &#39;unsafe-inline&#39; https://www.youtube.com https://s.ytimg.com; style-src &#39;self&#39; &#39;unsafe-inline&#39; https://fonts.googleapis.com; font-src &#39;self&#39; https://fonts.gstatic.com; img-src &#39;self&#39; data: blob: https://i.ytimg.com; media-src &#39;self&#39; blob: data: https://upload.wikimedia.org; connect-src &#39;self&#39; https://lcfacnmlmvekggginxyg.supabase.co wss://lcfacnmlmvekggginxyg.supabase.co https://translate.googleapis.com https://api.mymemory.translated.net; frame-src https://www.youtube.com https://www.youtube-nocookie.com; worker-src &#39;self&#39;; object-src &#39;none&#39;; base-uri &#39;self&#39;; form-action &#39;self&#39;"><meta name="referrer" content="strict-origin-when-cross-origin"><style>:root{padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}body{margin:0}img{max-width:100%}[hidden]{display:none!important}</style></head><body>`;
fs.copyFileSync("vendor/supabase.js", "web/supabase.js");
const vendor = "<script src=\"supabase.js\"></script>";
fs.writeFileSync("web/index.html", head + vendor + body + "</body></html>");
fs.copyFileSync("src/sw.js", "web/sw.js");
fs.writeFileSync("web/netlify.toml", "[build]\n  publish = \".\"\n  command = \"\"\n");
'
echo "web/index.html ready"
# Public privacy / account deletion / Impressum page (privacy.html). Google Play needs URLs that open without signing in.
# Built from the same texts the app shows, so the two never drift apart.
node -e '
const fs = require("fs");
const app = fs.readFileSync("src/app.js", "utf8");
const texts = [...app.matchAll(/lg_privacy_html: "((?:[^"\\]|\\.)*)"/g)].map(m => JSON.parse("\"" + m[1] + "\""));
const title = [...app.matchAll(/lg_title: "((?:[^"\\]|\\.)*)"/g)].map(m => JSON.parse("\"" + m[1] + "\""));
const asof = [...app.matchAll(/lg_asof: "((?:[^"\\]|\\.)*)"/g)].map(m => JSON.parse("\"" + m[1] + "\""));
if (texts.length !== 2) throw new Error("expected Arabic and German privacy texts, found " + texts.length);
const ob = app.match(/const OWNER = (\{[^\n]*\});/);
const OWNER = new Function("return " + ob[1])();
const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;" })[c]);
const ready = OWNER.name && OWNER.street && OWNER.city && OWNER.email;
const imp = ready ? `<section lang="de" dir="ltr" id="impressum"><h1>Impressum</h1><p>Angaben gemäß § 5 DDG<br>${esc(OWNER.name)}<br>${esc(OWNER.street)}<br>${esc(OWNER.city)}<br>${esc(OWNER.country)}</p><h2>Kontakt</h2><p>E-Mail: <a href="mailto:${esc(OWNER.email)}">${esc(OWNER.email)}</a></p><h2>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2><p>${esc(OWNER.name)}, Anschrift wie oben</p><p>Wir sind nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p></section>` : "";
const page = `<!doctype html><html lang="de"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>DeutschFlow: Datenschutz, Konto löschen, Impressum</title><meta name="referrer" content="strict-origin-when-cross-origin"><style>:root{color-scheme:light dark;--bg:#F2F8F7;--fg:#13302F;--mut:#4F6B69;--card:#fff;--acc:#0C6670}@media (prefers-color-scheme:dark){:root{--bg:#0F1A1A;--fg:#E6F1F0;--mut:#9DB5B3;--card:#162525;--acc:#5CC6CF}}body{margin:0;background:var(--bg);color:var(--fg);font:16px/1.6 system-ui,sans-serif}main{max-width:720px;margin:0 auto;padding:24px 16px 48px}section{background:var(--card);border-radius:16px;padding:16px 20px;margin:16px 0}h1{font-size:1.4rem;margin:.2em 0}h2{font-size:1.1rem;margin:1.2em 0 .3em}a{color:var(--acc)}.m{color:var(--mut);font-size:.9rem}nav a{margin-inline-end:16px}</style></head><body><main><p><strong>DeutschFlow</strong></p><nav><a href="#de">Deutsch</a><a href="#ar">العربية</a>${ready ? "<a href=\"#impressum\">Impressum</a>" : ""}<a href="./">App öffnen</a></nav>${imp}<section lang="de" dir="ltr" id="de"><h1>${esc(title[1])}</h1><p class="m">${esc(asof[1])}</p>${texts[1]}</section><section lang="ar" dir="rtl" id="ar"><h1>${esc(title[0])}</h1><p class="m">${esc(asof[0])}</p>${texts[0]}</section></main></body></html>`;
fs.writeFileSync("web/privacy.html", page);
console.log("web/privacy.html", ready ? "with Impressum" : "WITHOUT Impressum (fill OWNER in src/app.js)");
'

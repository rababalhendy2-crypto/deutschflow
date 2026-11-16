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
const head = `<!doctype html><html lang="ar"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><meta name="theme-color" content="#0C6670"><meta http-equiv="Content-Security-Policy" content="default-src &#39;self&#39;; script-src &#39;self&#39; &#39;unsafe-inline&#39; https://www.youtube.com https://s.ytimg.com; style-src &#39;self&#39; &#39;unsafe-inline&#39; https://fonts.googleapis.com; font-src &#39;self&#39; https://fonts.gstatic.com; img-src &#39;self&#39; data: blob: https://i.ytimg.com; media-src &#39;self&#39; blob: data:; connect-src &#39;self&#39; https://lcfacnmlmvekggginxyg.supabase.co wss://lcfacnmlmvekggginxyg.supabase.co; frame-src https://www.youtube.com https://www.youtube-nocookie.com; worker-src &#39;self&#39;; object-src &#39;none&#39;; base-uri &#39;self&#39;; form-action &#39;self&#39;"><meta name="referrer" content="strict-origin-when-cross-origin"><style>:root{padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}body{margin:0}img{max-width:100%}[hidden]{display:none!important}</style></head><body>`;
fs.copyFileSync("vendor/supabase.js", "web/supabase.js");
const vendor = "<script src=\"supabase.js\"></script>";
fs.writeFileSync("web/index.html", head + vendor + body + "</body></html>");
fs.copyFileSync("src/sw.js", "web/sw.js");
fs.writeFileSync("web/netlify.toml", "[build]\n  publish = \".\"\n  command = \"\"\n");
'
echo "web/index.html ready"

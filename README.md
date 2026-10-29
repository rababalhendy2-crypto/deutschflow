# DeutschFlow

A B2 → C1 German learning app for Arabic speakers. Plain JavaScript, no framework.

- `src/` – app code, styles and lesson content (`src/content/`).
- `bash build.sh` builds `dist/index.html` and `web/`; the published site is `docs/` (copy of `web/`).
- Video lessons embed official YouTube clips with the YouTube IFrame player. Nothing is downloaded or re-hosted.
- Accounts and progress: Supabase (email/password, row-level security, own rows only). The anon key in the app is public by design.

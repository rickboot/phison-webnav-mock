# Custom nav outline editor

## Summary

Author a custom top-nav hierarchy in the browser. **Apply** previews locally; **Save as…** publishes a named nav to the **shared live library** (Upstash Redis in production) so it appears in everyone’s dropdown. Create-only (no overwrite).

## Behavior

- Dropdown: **Current** → **Rick** → shared named navs → **Custom**
- **Edit Custom** opens the outline panel (local draft)
- **Apply** — parse + `localStorage` Custom preview
- **Save as…** — `POST /api/navs` with a display name; 409 if name taken
- **Copy share link** — optional one-off `#nav=` URL hash (still works)

## Production storage

Set on Vercel (Upstash Redis / Marketplace):

- `UPSTASH_REDIS_REST_URL`
- `UPSTASH_REDIS_REST_TOKEN`

Locally without Redis, shared navs persist under `.data/shared-navs.json` (dev only).

## Key files

- `lib/nav-outline.ts` — parse / encode / local storage
- `lib/shared-navs.ts` — Redis + file store
- `app/api/navs/` — list / create / get
- `components/NavEditorPanel.tsx` — editor + Save as…
- `components/NavVersionProvider.tsx` — schemes + shared load
- `docs/superpowers/specs/2026-08-13-shared-named-navs-design.md`

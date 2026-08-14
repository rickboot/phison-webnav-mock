# Shared named navigation library

**Date:** 2026-08-13  
**Status:** Approved for implementation

## Goal

Named custom nav outlines persist **live** (server) and appear in everyone’s nav dropdown. Create-only (no overwrite).

## Presets

Dropdown order:

1. **Current** — live phison.com
2. **Rick** — former Rick 2
3. **Shared named navs** — from Redis (all users)
4. **Custom** — local draft + editor

Removed: Rick 1, Web Team WIP.

## Storage

- Upstash Redis via `@upstash/redis` (`Redis.fromEnv()`)
- Keys: `nav:index` (list of `{ id, name, createdAt }`), `nav:outline:{id}` (outline text)
- `id` = slug from name; reserved: `current`, `rick`, `custom`

## API

- `GET /api/navs` → `{ navs: [{ id, name, createdAt }] }`
- `POST /api/navs` → `{ name, outline }` → validate outline → 201 or **409** if name/slug taken
- `GET /api/navs/[id]` → `{ id, name, outline, createdAt }`

## UI

- Editor: **Save as…** prompts for name, POSTs, refreshes shared list, selects new nav
- Selecting a shared nav loads outline from API into the active scheme (not local Custom unless editing)

## Non-goals (v1)

Overwrite, delete, auth, removing `#nav=` share hashes

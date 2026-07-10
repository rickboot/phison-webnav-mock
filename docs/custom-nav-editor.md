# Custom nav outline editor

## Summary

Web-team users can author a custom top-nav hierarchy in the browser using a simple indented outline. No backend; works on static Vercel hosting.

## Behavior

- Dropdown adds **Custom** after Rick 1; presets remain read-only.
- **Edit Custom** switches to Custom and opens a collapsible panel under the header.
- Outline format: Tab indent (spaces also OK if consistent), max 3 levels (section → group → item), `#` comments, top-level `Home` toggles Home link.
- First use seeds Custom from **Rick 1** (editable).
- **Apply** parses into the existing mega-menu model (`href: "#"`), selects Custom, saves to `localStorage`.
- **Copy share link** encodes the outline in the URL hash (`#nav=…`); opening the link loads Custom for that visitor.

## Key files

- `lib/nav-outline.ts` — parse / encode / storage helpers
- `components/NavEditorPanel.tsx` — editor UI
- `components/NavVersionProvider.tsx` — Custom scheme + persistence
- `data/nav-versions.ts` — `custom` version id

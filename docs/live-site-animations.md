# Live-site animations

Branch: `feature/live-site-animations`

Motions matched from `original/PHISON Electronics Corp. - Home_files/`:

| Motion | Source | Implementation |
|--------|--------|----------------|
| Nav underline / color | `_nav_142.css` `transition: all 0.4s` | `.nav-link` + `::after` 0.4s |
| Mega menu open | `hydrogen_142.css` `g-dropdown-fade-in-up` | 0.3s fade + translateY(30px) |
| Hero caption | `_v2023_home_banner_142.css` `fadeBottom` | 0.7s ease-in-out on active slide |
| Hero CTA hover | banner button `transition: all 0.3s` → `#FFCC40` | `.hero-btn:hover` |
| Foundation panels | home width expand | existing 0.4s width + content fade |

Still approximate (needs video/JS if refining further): carousel crossfade timing, exact caption delay (live uses ~0.9s on some slides).

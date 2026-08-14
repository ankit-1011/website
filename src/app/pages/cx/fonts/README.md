# CX web fonts

Self-hosted **woff2** subsets (latin; Devanagari for Noto only), weights **400 / 500 / 600 / 800** where the family provides them. Instrument Sans and IBM Plex Mono map **800 → 700** files (no 800 cut in Fontsource).

| Role | Family | Utility class |
|------|--------|----------------|
| Display | Bricolage Grotesque | `.cx-font-display` |
| Body | Instrument Sans | default on `.cx-page` |
| Labels / trace / numbers | IBM Plex Mono | `.cx-font-mono` |
| Hindi hero trace | Noto Sans Devanagari | `.cx-font-devanagari` |

## Sync

```bash
npm run sync:cx-fonts
```

Copies files to `src/assets/cx/fonts/` and regenerates `src/assets/cx/cx-font-faces-deferred.css`. Runs automatically before `npm run build`.

## Loading

- **Critical** (`_cx-font-faces-critical.scss`): Bricolage 600 + Instrument Sans 400, bundled with the CX component.
- **Preload** (in `CxFontLoaderService`): same two woff2 URLs.
- **Deferred**: remaining `@font-face` rules via `/assets/cx/cx-font-faces-deferred.css` (non-blocking `media=print` swap).

All faces use `font-display: swap`.

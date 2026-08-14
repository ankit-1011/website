# CX design tokens

Hex literals are allowed **only** in `_cx-primitives.scss`. All section stylesheets must use `var(--…)` references.

## Prototype palette

| Token | Role |
|--------|------|
| `--petrol-900` … `--petrol-600` | Dark petrol scale |
| `--sage` | Secondary / supportive green |
| `--chalk-1` … `--chalk-3` | Light surfaces |
| `--ink` | Primary text on light |
| `--slate` | Muted text |
| `--marigold`, `--marigold-soft` | Accent |

## Layout (prototype names)

| Token | Role |
|--------|------|
| `--wrap` | Max content width |
| `--gut` | Horizontal gutter |
| `--sec-y` | Section vertical padding |

## Section usage

```html
<section class="cx-section cx-section--dark">
  <div class="cx-section__inner">…</div>
</section>
```

Use semantic tokens (`--cx-section-bg`, `--cx-section-accent`, etc.) in section SCSS when possible.

## Layout primitives

| Class | Role |
|--------|------|
| `.sec` | Section shell; vertical padding via `--sec-y` (padding, not margin — adjacent sections do not collapse spacing) |
| `.wrap` | Centered content column (`--wrap`, `--gut`) |
| `.sec--dark` / `.sec--light` | Theme tokens for background and text |
| `.sec--tight` | Reduced vertical padding (`--sec-y-tight`) |

Verify rhythm: `npm run verify:cx-layout`

## Placeholder markers (`.ph`)

Wrap unverified stats/copy:

```html
<span class="ph" data-ph-note="Pending legal / source">75% faster</span>
```

- Dotted marigold underline + hover note from `data-ph-note`
- Audit UI: `/cx?cx-ph=1` (or `audit` / `true`)
- Launch gate: `npm run verify:cx-placeholders` (runs on `npm run build`). Fails when `.ph` remains and `cxAllowPlaceholders` is false in `environment.prod.ts`. WIP override: `CX_ALLOW_PLACEHOLDERS=true npm run build`

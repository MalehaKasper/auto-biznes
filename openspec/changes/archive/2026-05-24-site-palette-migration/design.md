## Context

The site uses Tailwind v4 with a custom `@theme inline` block in `globals.css` that maps `zinc-*` variable names to hex values. All components reference these via Tailwind utility classes (`bg-zinc-950`, `text-zinc-400`, etc.). This means the entire token cascade can be updated by changing hex values in one file — no component changes required for already-migrated pages.

Eight pages were created before the Junkyard redesign and still use Tailwind's built-in `slate-*` colors and semantic light-mode patterns (`bg-white`, `rounded-xl`, `border-slate-200`). These are not affected by the `@theme` token change and must be migrated manually.

## Goals / Non-Goals

**Goals:**
- Every pixel on the site renders within the "Темний метал" palette
- Text contrast meets WCAG AA (≥4.5:1) at all text levels
- No `bg-white`, `slate-*`, or `bg-gray-*` classes anywhere in `apps/site/src`

**Non-Goals:**
- CRM visual changes
- Typography or spacing changes
- New UI patterns or components
- Mobile layout changes

## Decisions

### D1: New token values ("Темний метал" — Variant C)

```
Token            Old value    New value    Role
──────────────────────────────────────────────────────────
zinc-950         #09090b      #1a1c21      page background
zinc-900         #18181b      #21242b      surface / cards
zinc-800         #27272a      #2c303a      border
zinc-700         #3f3f46      #363b47      border strong
zinc-600         #52525b      #505565      muted / placeholder
zinc-400         #a1a1aa      #8c93a8      secondary text
zinc-200         #e4e4e7      #c8cdd9      light text
foreground       #f4f4f5      #e4e8f0      primary text (cool white)
accent           #eab308      #eab308      yellow (unchanged)
accent-hover     #ca8a04      #ca8a04      yellow hover (unchanged)
accent-alt       #f97316      #f97316      orange (unchanged)
```

Rationale: `#1a1c21` base has a perceptible cool-graphite undertone without looking "navy". The entire scale is shifted to maintain relative contrast relationships between layers. Accent yellow `#eab308` on new base gives 9.2:1 contrast.

### D2: Migration pattern for unmigrated pages

Each unmigrated page follows the same substitution table:

```
Light class                   →   Dark equivalent
────────────────────────────────────────────────────────
bg-white                      →   bg-zinc-900
bg-slate-50 / bg-slate-100    →   bg-zinc-800
bg-slate-200                  →   bg-zinc-700
border-slate-100              →   border-zinc-800
border-slate-200              →   border-zinc-800
border-slate-300              →   border-zinc-700
text-slate-900 / text-gray-900→   text-zinc-100
text-slate-800                →   text-zinc-100
text-slate-700                →   text-zinc-200
text-slate-500 / text-gray-500→   text-zinc-400
text-slate-400                →   text-zinc-500
rounded-xl / rounded-2xl      →   (remove — sharp corners)
rounded-lg                    →   (remove — sharp corners)
rounded-full (badge/pill)      →   (keep or replace with px-based border)
focus:border-blue-500         →   focus:border-accent
hover:text-slate-800          →   hover:text-zinc-100
shadow-md / shadow-lg         →   (remove — no shadows in Junkyard)
```

### D3: Input / form elements

Inputs on unmigrated pages use `border-slate-300 rounded-lg`. Replace with:
```
bg-zinc-800 border border-zinc-700 text-zinc-100 placeholder-zinc-500
focus:outline-none focus:border-accent transition-colors
```
No `rounded-*` — sharp corners only.

### D4: Status / badge colors on unmigrated pages

Light-mode status badges (`bg-green-100 text-green-800`, `bg-blue-100 text-blue-800`) → dark border-only variants:
```
success  →  border border-emerald-700 text-emerald-400
info     →  border border-blue-700 text-blue-400
warning  →  border border-accent text-accent
error    →  border border-red-700 text-red-400
```

## Risks / Trade-offs

- **Token shift affects every component** → Risk is low since all components use the same variable names; the shift is proportional and tested visually. Worst case is a component that hardcodes a hex value — grep confirms none do.
- **Sharp corners on inputs** → Some users expect rounded inputs. Junkyard spec mandates sharp corners for industrial aesthetic; this is intentional.
- **`rounded-full` on some pill badges** → Evaluate case by case. Small pill text labels (`px-2 py-0.5`) can keep `rounded-full`; large block elements must go sharp.

## MODIFIED Requirements

### Requirement: Dark-mode design tokens defined in global CSS
The site SHALL use a dark-mode-only CSS design system defined in `globals.css` using Tailwind v4 `@theme` blocks. Tokens SHALL use the "Темний метал" palette: background `#1a1c21` (zinc-950), surface `#21242b` (zinc-900), border `#2c303a` (zinc-800), secondary text `#8c93a8` (zinc-400), primary text `#e4e8f0` (foreground). Accent colors remain unchanged: industrial yellow `#EAB308`, orange `#F97316`. Font families unchanged: `--font-heading` → Oswald, `--font-body` → Inter. No page, component, or element on the site SHALL use `bg-white`, `slate-*`, `gray-*` (Tailwind built-in), or light-mode `rounded-xl/2xl` classes.

#### Scenario: Design tokens resolve in Tailwind utilities
- **WHEN** a component uses `bg-zinc-950`, `text-accent`, or `font-heading` Tailwind classes
- **THEN** those classes resolve to the "Темний метал" hex values from the `@theme` block with no build errors

#### Scenario: No light-mode classes exist anywhere on the site
- **WHEN** the site source is scanned for `bg-white`, `bg-slate-`, `text-slate-`, `border-slate-`
- **THEN** zero matches are found in `apps/site/src/`

#### Scenario: Primary text is readable on all backgrounds
- **WHEN** any page renders primary content text (headings, body, labels)
- **THEN** that text uses `text-zinc-100` or `text-foreground` on `bg-zinc-950` or `bg-zinc-900` — achieving ≥7:1 contrast ratio

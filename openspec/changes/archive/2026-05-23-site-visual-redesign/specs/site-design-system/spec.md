## ADDED Requirements

### Requirement: Dark-mode design tokens defined in global CSS
The site SHALL use a dark-mode-only CSS design system defined in `globals.css` using Tailwind v4 `@theme` blocks. Tokens SHALL include background colors (`zinc-950`, `zinc-900`, `zinc-800`), accent colors (industrial yellow `#EAB308`, orange `#F97316`), and semantic font families (`--font-heading` → Oswald, `--font-body` → Inter).

#### Scenario: Design tokens resolve in Tailwind utilities
- **WHEN** a component uses `bg-zinc-950`, `text-accent`, or `font-heading` Tailwind classes
- **THEN** those classes resolve to the correct CSS values from the `@theme` block with no build errors

### Requirement: Typography scale follows Junkyard design spec
Heading elements (h1–h3) and any element with `.font-heading` SHALL render in Oswald, uppercase, with tight letter-spacing. Body text SHALL use Inter. Both fonts SHALL be loaded via `next/font/google` with display swap.

#### Scenario: Heading renders in Oswald
- **WHEN** a page renders an `<h1>` or element with `font-heading` class
- **THEN** the computed font-family is Oswald, text-transform is uppercase, letter-spacing is tight

#### Scenario: Body text renders in Inter
- **WHEN** a page renders a paragraph or element with `font-body` class
- **THEN** the computed font-family is Inter

### Requirement: Noise texture utility available
The design system SHALL provide a `.noise` CSS utility class that applies a subtle grain overlay (opacity 0.04 or less) using a repeating SVG background pattern. It SHALL be composable with any background-color class.

#### Scenario: Noise class applies overlay
- **WHEN** a container has class `noise bg-zinc-950`
- **THEN** a grain texture is visually present over the dark background without significantly affecting readability

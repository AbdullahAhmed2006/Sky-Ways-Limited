---
name: Cyber-Fleet Velocity
colors:
  surface: '#0c1420'
  surface-dim: '#0c1420'
  surface-bright: '#323947'
  surface-container-lowest: '#070e1a'
  surface-container-low: '#141c28'
  surface-container: '#18202c'
  surface-container-high: '#232a37'
  surface-container-highest: '#2d3542'
  on-surface: '#dbe3f4'
  on-surface-variant: '#bcc9cd'
  inverse-surface: '#dbe3f4'
  inverse-on-surface: '#29313e'
  outline: '#869397'
  outline-variant: '#3d494c'
  surface-tint: '#4cd7f6'
  primary: '#4cd7f6'
  on-primary: '#003640'
  primary-container: '#06b6d4'
  on-primary-container: '#00424f'
  inverse-primary: '#00687a'
  secondary: '#4edea3'
  on-secondary: '#003824'
  secondary-container: '#00a572'
  on-secondary-container: '#00311f'
  tertiary: '#ffb95f'
  on-tertiary: '#472a00'
  tertiary-container: '#e79400'
  on-tertiary-container: '#563400'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#acedff'
  primary-fixed-dim: '#4cd7f6'
  on-primary-fixed: '#001f26'
  on-primary-fixed-variant: '#004e5c'
  secondary-fixed: '#6ffbbe'
  secondary-fixed-dim: '#4edea3'
  on-secondary-fixed: '#002113'
  on-secondary-fixed-variant: '#005236'
  tertiary-fixed: '#ffddb8'
  tertiary-fixed-dim: '#ffb95f'
  on-tertiary-fixed: '#2a1700'
  on-tertiary-fixed-variant: '#653e00'
  background: '#0c1420'
  on-background: '#dbe3f4'
  surface-variant: '#2d3542'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.08em
  metric-value:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 34px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  container-margin: 2rem
  gutter: 1.5rem
  card-padding: 1.25rem
  stack-sm: 0.5rem
  stack-md: 1rem
  sidebar-width: 280px
---

## Brand & Style

This design system is engineered for high-performance dashboard environments where real-time data and clarity are paramount. The brand personality is **futuristic, technical, and precise**, evoking the feeling of a sophisticated command center. It targets professional operators who require a "glanceable" UI that balances dense information with deep visual hierarchy.

The design style is **Advanced Glassmorphism**. This approach moves beyond simple transparency by utilizing multi-layered frosted glass effects, 1px high-precision inner borders for structural definition, and significant backdrop-blurs (20px+) to maintain legibility over complex background assets. It incorporates **Cyber-Modern** elements such as neon-tinted glows and high-tech skeletal strokes to signify importance and status.

## Colors

The palette is anchored in a **Deep Slate Dark Mode** to reduce eye strain during long shifts. 

- **Primary (Cyber Teal):** Used for primary actions, active navigation states, and focus indicators. It provides a sharp contrast against the dark background.
- **Secondary (Emerald Green):** Dedicated to success states, active fleet status, and positive growth metrics.
- **Transit (Soft Gold):** Reserved for "in-transit" status, warnings, and pending actions that require attention but not immediate intervention.
- **Alert (Crimson Red):** High-intensity color for critical failures, breakdowns, and urgent notifications.

The "Glass" effect is achieved through a combination of `surface_glass_rgba` for the fill and a crisp `border_glass_rgba` for the inner-stroke, ensuring elements feel like physical panes of digital glass.

## Typography

The system utilizes **Inter** as the primary typeface for its exceptional legibility and neutral, modern aesthetic. To reinforce the "Technical/Futuristic" narrative, **JetBrains Mono** is used for small labels, status indicators, and ID numbers, providing a monospaced contrast that feels like code or machine output.

Hierarchy is established through weight and color (using 100% white for headings and 70% opacity white for secondary body text). Avoid using serif fonts in this system as they conflict with the mechanical, high-tech theme.

## Layout & Spacing

This design system uses a **Fluid Command Grid** model. Content is organized into modular glass containers that reflow based on screen real estate.

- **Desktop:** 12-column layout with a fixed-width sidebar (280px). Standard margin of 32px (2rem) around the main viewport.
- **Tablet:** 8-column layout. Sidebar collapses into an icon-only rail or a drawer.
- **Mobile:** Single-column stack. Horizontal padding reduces to 16px. 

Spacing follows a strict 4px/8px baseline grid to maintain alignment. Elements within glass cards should prioritize "breathing room" to prevent the interface from feeling cluttered, despite the high density of data.

## Elevation & Depth

Hierarchy is achieved through **Backdrop Blur Levels** and **Glow Tiers** rather than traditional shadows.

1.  **Level 0 (Base):** Deep Slate background (#0B131F). No blur.
2.  **Level 1 (Cards):** 3% white fill, 20px backdrop-blur. 1px inner border (rgba 255, 255, 255, 0.05).
3.  **Level 2 (Modals/Popovers):** 6% white fill, 40px backdrop-blur. Subtle outer glow matching the component's context (e.g., a faint teal glow for primary modals).
4.  **Level 3 (Interactive Elements):** Buttons and active chips utilize a 0px 0px 15px glow effect when hovered or active to simulate light emission.

Shadows should be avoided unless they are "Ambient Tints"—soft, low-opacity shadows that take on the color of the primary or secondary accent to create a "bloom" effect.

## Shapes

The design system utilizes **Rounded** (0.5rem base) geometry. While the theme is futuristic, sharp corners are avoided to keep the interface approachable and modern. 

- **Cards/Containers:** 1rem (rounded-lg) for main dashboard panels.
- **Inputs/Buttons:** 0.5rem (base) for a sleek, uniform appearance.
- **Status Chips:** Full pill-shape (rounded-xl) to distinguish them from interactive buttons.
- **Visual Dividers:** Use 1px lines with a gradient fade-out (alpha 0.05 to 0) rather than solid strokes.

## Components

### Buttons
- **Primary:** Gradient fill (Cyber Teal to Deep Teal), 1px white top-border, white text. Add a 10px teal "bloom" glow on hover.
- **Ghost:** Transparent fill, 1px Teal border, Teal text.

### Glass Cards
- All cards must have a `backdrop-filter: blur(20px)` and a subtle `linear-gradient` fill from top-left to bottom-right to simulate light hitting glass.

### Inputs
- **Translucent Fields:** 5% white fill, 1px border. On focus, the border transitions to Cyber Teal with a 4px soft glow.

### Sidebar Navigation
- Vertical stack with icon + label. 
- **Active State:** A vertical glow bar on the left edge and a subtle teal-tinted background gradient behind the menu item.

### Chips & Badges
- Use a semi-transparent version of the status color (e.g., 10% Emerald Green) with high-contrast text and a 4px circular "live" indicator dot for active statuses.

### Data Visualization
- Charts should use neon-line styles (2px stroke) with a vertical gradient fill (Area charts) that fades to 0% opacity at the baseline. Use the accent palette (Teal, Green, Gold, Red) for series differentiation.
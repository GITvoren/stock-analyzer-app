# DESIGN.md

# Foundational Design System

## 1. Color Palette

The interface uses a restrained white/neutral foundation with a soft emerald-green brand accent. Supporting colors are intentionally subtle, allowing data visualization and status indicators to provide controlled moments of color.

### Core Colors

| Token | HEX | Usage |
|---|---|---|
| Primary | `#349474` | Primary brand color, active states, charts, positive accents |
| Primary Dark | `#287A60` | Hover states, emphasized green text, stronger accents |
| Primary Soft | `#E7F0EE` | Soft selected states, subtle green surfaces |
| Secondary | `#6B7280` | Secondary UI elements and supporting information |
| Background | `#FEFEFE` | Main application background |
| Surface | `#FFFFFF` | Cards, panels, inputs, navigation surfaces |
| Surface Soft | `#F5F9F8` | Subtle tinted surfaces and supporting panels |
| Surface Muted | `#F8FAFA` | Low-emphasis UI backgrounds |
| Border | `#E3E9E7` | Cards, inputs, separators, navigation boundaries |
| Border Strong | `#CFD9D6` | More defined control boundaries |
| Text Primary | `#222222` | Headings, primary labels, important values |
| Text Secondary | `#4A4D52` | Supporting text and descriptions |
| Text Muted | `#7E8187` | Metadata, helper text, timestamps |
| Text Disabled | `#A8ADB0` | Disabled or low-contrast interface content |

### Accent Colors

| Token | HEX | Usage |
|---|---|---|
| Accent Green | `#349474` | Primary visual accent |
| Accent Green Bright | `#52A98A` | Chart highlights and positive indicators |
| Accent Green Pale | `#DDEFE9` | Highlight backgrounds |
| Accent Mint | `#EAF5F1` | Insight panels and positive information surfaces |
| Accent Blue | `#4387C9` | Neutral analytical/chart indicator |
| Accent Blue Soft | `#EAF2FB` | Blue indicator backgrounds |
| Accent Purple | `#8D76E8` | Secondary analytical indicator |
| Accent Purple Soft | `#F0EDFC` | Purple indicator backgrounds |

### Status / Feedback Colors

| Token | HEX | Usage |
|---|---|---|
| Success | `#349474` | Positive states, stable indicators, confirmations |
| Success Soft | `#E7F3EF` | Success backgrounds |
| Warning | `#E9B52E` | Warning icons and caution states |
| Warning Soft | `#FFF0C6` | Informational warning banner background |
| Error | `#D93A32` | Errors and destructive states |
| Error Soft | `#FCEAE8` | Error backgrounds |
| Info | `#4387C9` | Informational states |
| Info Soft | `#EAF2FB` | Informational backgrounds |

### Color Philosophy

- White dominates the interface.
- Green establishes brand identity without becoming visually aggressive.
- Gray provides hierarchy instead of heavy contrast.
- Borders are pale and low-contrast.
- Saturated colors are reserved for analytical meaning, status, and small visual accents.
- Large areas should remain neutral.
- Avoid large dark surfaces or highly saturated backgrounds.

---

## 2. Typography

### Font Family

Primary recommendation:

- `Inter`
- `-apple-system`
- `BlinkMacSystemFont`
- `Segoe UI`
- `Roboto`
- `Helvetica Neue`
- `Arial`
- `sans-serif`

The visual language is clearly modern sans-serif rather than serif, monospace, or decorative typography.

### Typography Hierarchy

| Role | Size | Weight | Line Height | Letter Spacing |
|---|---:|---:|---:|---:|
| Page Title | `24px` | `600–700` | `1.25` | `-0.02em` |
| Section Heading | `16–18px` | `600` | `1.35` | `-0.01em` |
| Card Heading | `15–16px` | `600` | `1.35` | `-0.01em` |
| Subheading | `13–14px` | `500–600` | `1.4` | `0` |
| Body | `13–14px` | `400` | `1.5` | `0` |
| Body Emphasis | `13–14px` | `500` | `1.5` | `0` |
| Label | `11–12px` | `500–600` | `1.35` | `0.01em` |
| Metadata | `10–12px` | `400` | `1.4` | `0` |
| Caption | `10–11px` | `400` | `1.4` | `0` |
| Metric Value | `21–24px` | `600–700` | `1.15` | `-0.02em` |
| Large Metric | `26–32px` | `600–700` | `1.1` | `-0.025em` |

### Typography Characteristics

- Use medium-to-semibold weights for headings rather than extremely bold weights.
- Primary text uses near-black rather than pure black.
- Secondary information uses cool neutral gray.
- Numeric financial/analytical values receive stronger visual weight.
- Labels and metadata are deliberately compact.
- Body copy remains highly readable with comfortable line-height.
- Heading typography is slightly tightened.
- Small labels may use subtle positive tracking.
- Avoid decorative typography, all-caps-heavy interfaces, or excessive typographic contrast.

### Overall Hierarchy

`Page Title → Section Heading → Card Heading → Metric → Body → Metadata`

The hierarchy is created primarily through size, weight, and contrast rather than color or ornamentation.

---

## 3. Visual Accents & Shape

### Border Radius

The system uses soft, modern rounded geometry.

| Element | Radius |
|---|---:|
| Large Cards | `12px` |
| Standard Cards | `10px` |
| Inputs | `9–10px` |
| Buttons | `9–10px` |
| Navigation Items | `9px` |
| Badges | `999px` |
| Metric Containers | `10px` |
| Small Controls | `8px` |

The overall visual language is rounded but not excessively pill-shaped.

### Borders

- Standard border: `1px solid #E3E9E7`
- Strong border: `1px solid #CFD9D6`
- Borders should remain subtle.
- Avoid thick outlines.
- Use borders primarily to establish component boundaries rather than decoration.
- Green borders are reserved for selected/active states.

### Elevation

The design relies more heavily on borders and whitespace than on shadows.

#### Level 0 — Flat

Used for:
- Main page surfaces
- Navigation background
- Simple content regions

Shadow:

`none`

#### Level 1 — Subtle

Used for:
- Cards
- Inputs
- Small controls

Approximation:

`0 1px 3px rgba(20, 35, 30, 0.04)`

#### Level 2 — Floating

Used for:
- Floating controls
- Elevated panels
- Popovers

Approximation:

`0 4px 12px rgba(20, 35, 30, 0.07)`

#### Level 3 — Modal

Reserved for:
- Dialogs
- Large overlays
- High-priority floating surfaces

Approximation:

`0 10px 30px rgba(20, 35, 30, 0.10)`

### Shadow Philosophy

Shadows should remain soft, diffuse, and low contrast.

The interface should never feel heavily layered or skeuomorphic.

---

## 4. Spacing System

Use an approximately 4px-based spacing scale.

| Token | Value | Character |
|---|---:|---|
| `space-1` | `4px` | Micro |
| `space-2` | `8px` | Compact |
| `space-3` | `12px` | Tight |
| `space-4` | `16px` | Standard |
| `space-5` | `20px` | Comfortable |
| `space-6` | `24px` | Section |
| `space-7` | `32px` | Relaxed |
| `space-8` | `40px` | Large |
| `space-9` | `48px` | Major |
| `space-10` | `64px` | Structural |

### Spacing Characteristics

#### Compact

Use `4–8px` for:
- Icon/text relationships
- Labels
- Metadata
- Small control internals

#### Comfortable

Use `12–20px` for:
- Card content
- Form controls
- Related information groups
- Navigation items

#### Relaxed

Use `24–40px` for:
- Major content separation
- Section boundaries
- Large visual groups

The interface favors generous whitespace around major content while keeping individual controls compact.

### Typical Internal Padding

- Small controls: `8–12px`
- Inputs: `10–12px`
- Standard cards: `16px`
- Large analytical panels: `16–20px`
- Major sections: `24px+`

---

## 5. Global Design Character

### Personality

**Professional · Minimal · Analytical · Modern · Calm · Trustworthy · Technical**

The interface resembles a contemporary financial analytics dashboard designed for clarity rather than visual spectacle.

### Visual Density

Overall density is **medium-low**.

Information is plentiful, but generous whitespace prevents the interface from feeling crowded. Data-heavy areas are organized into clearly separated surfaces rather than compressed into dense tables.

### Surface Language

The visual hierarchy is built from:

1. White surfaces
2. Very pale gray/green backgrounds
3. Thin neutral borders
4. Restrained shadows
5. Green analytical accents
6. Strong but controlled typography

Cards should feel like clean containers rather than floating objects.

### Color Behavior

Green acts as the visual identity and primary action/analytical color.

Supporting blue and purple accents appear in small analytical indicators, while yellow is reserved for warnings and informational notices.

Color should communicate meaning rather than decoration.

### Whitespace

Whitespace is a core part of the identity.

Large empty areas around content create:
- clarity
- perceived quality
- visual calm
- easier scanning
- stronger separation between analytical groups

### Borders & Elevation

The interface prefers:

**border + whitespace > shadow**

Cards should remain visually grounded and lightweight. Shadows are supporting elements rather than the primary mechanism for separating content.

### Overall Aesthetic

The design can be summarized as:

> **A clean, premium SaaS analytics interface with a soft financial-dashboard aesthetic, restrained emerald branding, generous whitespace, subtle borders, rounded surfaces, and highly legible data typography.**

Avoid:
- heavy gradients
- glassmorphism
- excessive shadows
- dark-mode-first styling
- excessive neon
- decorative illustrations
- oversized typography
- overly rounded cartoon-like components
- dense dashboard layouts
- unnecessary visual ornamentation
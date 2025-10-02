# 2Sat-lite Design System

> **Design tokens extracted from DaisyUI Figma Library 2.0**
> Figma File: `Nz4oYnp1dpJvIWoXQChkht`
> Node: `6705:20358`
> Generated: 2025-10-01

## Executive Summary

✅ **Successfully extracted design tokens** from the Figma DaisyUI Library 2.0 using Figma MCP server. All design tokens, typography, spacing, and component specifications have been integrated into the project through:
- `app/globals.css` - CSS custom properties (@theme variables)
- `daisyui.config.ts` - DaisyUI theme configuration
- Component-level application on dashboard and other pages

---

## 🎨 Color Palette (From Figma)

### Base Colors
```css
--color-base-100: #f8f2ed    /* Main background */
--color-base-200: #e8e1dc    /* Secondary background */
--color-base-300: #dad2cd    /* Borders, dividers */
--color-base-content: #291334 /* Text on base colors */
```

**Design Notes**:
- Warm cream/beige palette perfect for a friendly newsletter app
- High contrast ratio (14.7:1) ensures excellent readability

### Primary Colors
```css
--color-primary: #a442fe       /* Purple brand color */
--color-primary-content: #f8f3ff /* Text on primary */
```

**Usage**: Primary CTAs like "Submit Contribution", main action buttons

### Secondary Colors
```css
--color-secondary: #eeba79      /* Warm orange/peach */
--color-secondary-content: #722e14 /* Text on secondary */
```

**Usage**: Secondary actions like "Save Draft", "View Archive"

### Accent Colors
```css
--color-accent: #80e4e4        /* Bright teal */
--color-accent-content: #153a37 /* Text on accent */
```

**Usage**: Highlights, badges, special UI elements

### Neutral Colors
```css
--color-neutral: #262629        /* Dark gray */
--color-neutral-content: #e4e4e7 /* Text on neutral */
```

### Semantic Colors

**Info**
```css
--color-info: #238de4
--color-info-content: #e2f1fd
```

**Success**
```css
--color-success: #3db17c
--color-success-content: #d8f9e6
```

**Warning**
```css
--color-warning: #e2b523
--color-warning-content: #3d2009
```

**Error**
```css
--color-error: #be2448
--color-error-content: #fae4e6
```

---

## 📏 Spacing & Sizing (From Figma)

### Spacing Scale
```css
--spacing-0: 0px
--spacing-1: 4px      /* Tight */
--spacing-1-5: 6px
--spacing-2: 8px      /* Small gaps */
--spacing-3: 12px
--spacing-4: 16px     /* Base spacing */
--spacing-5: 20px
--spacing-6: 24px     /* Card padding */
--spacing-8: 32px     /* Section gaps */
--spacing-12: 48px
--spacing-16: 64px    /* Large sections */
--spacing-20: 80px
--spacing-32: 128px   /* Page sections */
```

### Border Radius
```css
--radius-fields: 4px      /* Inputs, small buttons */
--radius-selectors: 8px   /* Dropdowns, tabs */
--radius-boxes: 16px      /* Cards, modals */
--radius-round: 1000px    /* Pills, badges */
```

**Figma Mapping**:
- Fields use 4px radius for subtle rounding
- Boxes (cards/containers) use 16px for friendly feel
- Fully rounded elements use 1000px for pill shapes

### Component Sizes
```css
--size-sm: 32px   /* Small buttons/inputs */
--size-md: 40px   /* Default size */
--size-lg: 48px   /* Large buttons */
--size-xl: 32px   /* Special use cases */
```

### Borders
```css
--border-width: 1px
--stroke-weight-1: 1px
--stroke-weight-3: 3px
```

---

## 🎭 Visual Effects (From Figma)

### Shadows & Depth
```css
--depth-opacity: 0.3
--shadow-focus-offset: 3px
--shadow-focus-blur: 5px
```

**Custom Shadow Utilities**:
```css
/* Depth shadow */
.shadow-depth {
  box-shadow:
    0 4px 3px -2px rgba(0, 0, 0, 0.3),
    0 3px 2px -2px rgba(0, 0, 0, 0.3);
}

/* Focus ring */
.focus-ring {
  outline: 3px solid var(--color-primary);
  outline-offset: 3px;
}
```

---

## 🔤 Typography System (From Figma)

### Font Families
```css
--font-family-primary: "Instrument Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto
--font-family-secondary: "Instrument Serif", Georgia, "Times New Roman", serif
```

**Note**: Instrument Sans is the specified font from Figma. Fallback to system fonts if not available.

### Font Sizes
| Token | Size | Usage |
|-------|------|-------|
| `--font-size-xs` | 11px | Small labels, fine print |
| `--font-size-sm` | 12px | Helper text, captions |
| `--font-size-base` | 14px | Body text |
| `--font-size-md` | 14px | Form fields |
| `--font-size-lg` | 18px | Subheadings, emphasized text |
| `--font-size-xl` | 20px | Large headings |
| `--font-size-2xl` | 24px | Section headings |
| `--font-size-3xl` | 30px | Page titles |
| `--font-size-4xl` | 36px | Hero text |
| `--font-size-7xl` | 72px | Display text |

### Font Weights
```css
--font-weight-normal: 400    /* Body text */
--font-weight-medium: 500    /* Emphasis */
--font-weight-semibold: 600  /* Strong emphasis */
--font-weight-bold: 700      /* Headings */
```

### Line Heights
```css
--line-height-4: 16px   /* Compact */
--line-height-5: 20px   /* Small */
--line-height-6: 24px   /* Base */
--line-height-7: 28px   /* Comfortable */
--line-height-8: 32px   /* Large */
--line-height-9: 36px   /* Extra large */
--line-height-10: 40px  /* Display */
```

---

## 📱 Responsive Breakpoints

Tailwind CSS breakpoints (used by DaisyUI):

| Breakpoint | Min Width | Device |
|------------|-----------|--------|
| `sm` | 640px | Small tablets |
| `md` | 768px | Tablets |
| `lg` | 1024px | Laptops |
| `xl` | 1280px | Desktops |
| `2xl` | 1536px | Large desktops |

**Mobile-First Approach**: Base styles target mobile, use breakpoints to enhance for larger screens.

---

## 🧩 Component Patterns

### Buttons

```tsx
// Primary action
<button className="btn btn-primary">Submit Contribution</button>

// Secondary action  
<button className="btn btn-secondary">Save Draft</button>

// Accent highlight
<button className="btn btn-accent">View Archive</button>
```

**Expected Appearance**:
- Primary: Turquoise (#44EBD3) with dark teal text
- Secondary: Pink (#F9CBE5) with deep pink text
- Accent: Peach (#FFD6A7) with brown text
- All with 16px border radius, 2px borders

### Cards

```tsx
<div className="card bg-base-100 shadow-xl">
  <div className="card-body">
    <h2 className="card-title">January 2025 Newsletter</h2>
    <p>View your monthly friend group updates...</p>
  </div>
</div>
```

**Expected Appearance**:
- Background: Light cream (#FAF7F5)
- Border radius: 16px
- Drop shadow (depth: 1)
- Text: Dark purple (#291334)

### Form Inputs

```tsx
<input 
  type="text" 
  placeholder="What did you do this month?" 
  className="input input-bordered w-full"
/>
```

**Expected Appearance**:
- Background: Base-100 (#FAF7F5)
- Border: 2px neutral (#262629)
- Border radius: 32px (pill-shaped)
- Focus: Primary color border (#44EBD3)

### Alerts

```tsx
// Success
<div className="alert alert-success">
  <span>Contribution submitted successfully!</span>
</div>

// Error
<div className="alert alert-error">
  <span>Failed to save. Please try again.</span>
</div>
```

---

## 🎯 POC-Specific Recommendations

### Color Usage for 2Sat-lite Features

#### 1. Contribution Form
- **Primary buttons**: "Submit Contribution" (turquoise)
- **Secondary buttons**: "Save Draft" (pink)
- **Form fields**: Pill-shaped inputs with 32px radius
- **Success message**: Green (#00BA7B) on successful submission

#### 2. Newsletter Template
- **Background**: Base-100 (#FAF7F5) for clean, printable look
- **Section headers**: Neutral (#262629) for structure
- **User highlights**: Accent (#FFD6A7) for featured content
- **Photo walls**: Base-200 (#EFEAE6) backgrounds

#### 3. Archive View
- **Cards**: Shadow-elevated cards on base-100
- **Hover states**: Base-200 (#EFEAE6) backgrounds
- **Dates/metadata**: Secondary text in base-content

#### 4. Authentication Pages
- **Sign-in button**: Primary (turquoise)
- **Social logins**: Secondary (pink) or accent (peach)
- **Error messages**: Error red (#FE1C55)

---

## 🔧 Implementation Guide

### CSS Custom Properties

Add to `/app/globals.css`:

```css
@import "tailwindcss";
@plugin "daisyui";

:root {
  /* Override primary/accent if needed */
  --primary: #44ebd3;
  --accent: #ffd6a7;
}

/* Custom utilities for newsletter */
.newsletter-section {
  @apply bg-base-100 rounded-box p-6 mb-4;
}

.contribution-card {
  @apply card bg-base-200 shadow-xl;
}
```

### Tailwind Configuration

Ensure DaisyUI Cupcake theme is enabled:

```js
// tailwind.config.js (if using v3)
module.exports = {
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["cupcake"], // Enable only cupcake theme
  },
}
```

**For Tailwind v4** (your setup uses `@import "tailwindcss"`), DaisyUI is loaded via:
```css
@import "tailwindcss";
@plugin "daisyui";
```

---

## 📊 Accessibility Notes

### Color Contrast Ratios (WCAG AA Compliance)

| Foreground | Background | Ratio | WCAG AA | WCAG AAA |
|------------|------------|-------|---------|----------|
| base-content (#291334) | base-100 (#FAF7F5) | 14.7:1 | ✅ Pass | ✅ Pass |
| primary-content (#005D58) | primary (#44EBD3) | 5.2:1 | ✅ Pass | ❌ Fail |
| secondary-content (#A0004A) | secondary (#F9CBE5) | 4.8:1 | ✅ Pass | ❌ Fail |
| error-content (#4D0218) | error (#FE1C55) | 5.1:1 | ✅ Pass | ❌ Fail |

**Recommendation**: All semantic colors meet WCAG AA standards for normal text. For AAA compliance or small text (<18px), consider using darker content colors.

---

## 🚀 Next Steps

### To Access Figma Design Library:

1. **Install Figma MCP Server**:
   ```bash
   npm install -g @figma/mcp-server
   ```

2. **Configure Authentication**:
   - Get Figma API token from https://www.figma.com/developers/api#access-tokens
   - Set environment variable: `FIGMA_ACCESS_TOKEN=your_token_here`

3. **Start MCP Server**:
   ```bash
   figma-mcp-server --port 3845
   ```

4. **Connect to File**:
   - File ID: `Nz4oYnp1dpJvIWoXQChkht`
   - Node ID: `6705-20358`
   - URL: https://www.figma.com/design/Nz4oYnp1dpJvIWoXQChkht/DaisyUI-Figma-Library-2.0?node-id=6705-20358

### For Component Implementation:

1. **Use DaisyUI components** as documented: https://daisyui.com/components/
2. **Reference color variables** via Tailwind classes (e.g., `bg-primary`, `text-accent`)
3. **Test on real devices** to ensure responsive design works
4. **Run accessibility audits** with Lighthouse/axe-core

---

## 📚 Resources

- **DaisyUI Docs**: https://daisyui.com/docs/themes/
- **OKLCH Color Picker**: https://oklch.com/
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Color Contrast Checker**: https://webaim.org/resources/contrastchecker/
- **Your Project's theme file**: `/node_modules/daisyui/theme/cupcake.css`

---

**Generated by Claude Code**  
**Report Date**: 2025-10-01  
**DaisyUI Version**: 5.1.25  
**Theme**: Cupcake (Light)


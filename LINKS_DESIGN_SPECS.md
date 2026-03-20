# Links Page - Detailed Design Specifications

## VISUAL COMPARISON: Current vs. New

### Current Design (Pre-Blueprint)
```
┌─────────────────────────────────────┐
│                                     │
│          Available for work         │  ← Badge
│                                     │
│          Pedro Felipe               │  ← H1 (3xl sm:4xl)
│        Backend Engineer             │  ← P (muted)
│                                     │
├──────────────────────────────────────┤
│                                      │
│ ┌─────────────────────────────────┐  │
│ │ 🏠 Portfolio          →         │  │ ← LinkItem 1
│ │    View my projects              │  │
│ └─────────────────────────────────┘  │
│                                      │
│ ┌─────────────────────────────────┐  │
│ │ ⚙️  GitHub            →         │  │ ← LinkItem 2
│ │    @pedrfelip                    │  │
│ └─────────────────────────────────┘  │
│                                      │
│ [3 more links...]                    │
│                                      │
├──────────────────────────────────────┤
│      © 2026 Pedro Felipe             │
│                                      │
└─────────────────────────────────────┘

Simple centered container (max-w-md)
No structural grid
Linktree aesthetic
```

### New Design (With Structural Grid)
```
┌────┐                          ┌────┐
│    │                          │    │
│    │                          │    │ ← Vertical rail lines
│    │  ───────────────────────  │    │ ← Section divider
│    │                          │    │
│    │   Available for work     │    │
│    │                          │    │
│    │   Pedro Felipe           │    │
│    │   Backend Engineer       │    │
│    │                          │    │
│    │  ───────────────────────  │    │
│    │                          │    │
│    │  ┌──────────┐ ┌──────────┐   │
│    │  │●●●●●●●●●│ │●●●●●●●●●│   │
│    │  │●●●●●●●●●│ │●●●●●●●●●│   │  ← DotPattern overlay
│    │  │● Portfolio │ │● GitHub  │   │
│    │  │  View...   │ │ @pedrf.. │   │
│    │  │         → │ │      → │   │
│    │  └──────────┘ └──────────┘   │
│    │                          │    │
│    │  ┌──────────┐ ┌──────────┐   │
│    │  │● LinkedIn  │ │● X      │   │
│    │  │  /in/...   │ │ @pedro.. │   │
│    │  │         → │ │      → │   │
│    │  └──────────┘ └──────────┘   │
│    │                          │    │
│    │  ┌──────────┐            │    │
│    │  │● Email      │            │    │
│    │  │  pfsilva@.. │            │    │
│    │  │         → │            │    │
│    │  └──────────┘            │    │
│    │                          │    │
│    │  ───────────────────────  │    │
│    │                          │    │
│    │  © 2026 Pedro Felipe     │    │
│    │                          │    │
└────┘                          └────┘

Structural grid with:
- Vertical rails on left/right
- Horizontal section dividers
- Dot pattern backgrounds in cards
- Corner bracket decorations
- Multi-column responsive grid
```

---

## RESPONSIVE GRID LAYOUT

### Mobile (< 640px)
```
┌────────────────────┐
│                    │
│ [Single Column]    │
│                    │
│ ┌────────────────┐ │
│ │ Link Item 1    │ │
│ └────────────────┘ │
│ ┌────────────────┐ │
│ │ Link Item 2    │ │
│ └────────────────┘ │
│ ┌────────────────┐ │
│ │ Link Item 3    │ │
│ └────────────────┘ │
│ ┌────────────────┐ │
│ │ Link Item 4    │ │
│ └────────────────┘ │
│ ┌────────────────┐ │
│ │ Link Item 5    │ │
│ └────────────────┘ │
│                    │
└────────────────────┘

Grid: grid-cols-1
Gap: gap-3 (12px)
```

### Tablet (640px - 1024px)
```
┌────────────────────────────────────────┐
│                                        │
│ [Two Column Layout]                    │
│                                        │
│ ┌──────────────┐  ┌──────────────┐    │
│ │ Link Item 1  │  │ Link Item 2  │    │
│ └──────────────┘  └──────────────┘    │
│ ┌──────────────┐  ┌──────────────┐    │
│ │ Link Item 3  │  │ Link Item 4  │    │
│ └──────────────┘  └──────────────┘    │
│ ┌──────────────┐                       │
│ │ Link Item 5  │                       │
│ └──────────────┘                       │
│                                        │
└────────────────────────────────────────┘

Grid: sm:grid-cols-2
Gap: gap-4 (16px)
```

### Desktop (1024px+)
```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│ [Three Column Layout]                                   │
│                                                         │
│ ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│ │ Link Item 1  │  │ Link Item 2  │  │ Link Item 3  │  │
│ └──────────────┘  └──────────────┘  └──────────────┘  │
│ ┌──────────────┐  ┌──────────────┐                     │
│ │ Link Item 4  │  │ Link Item 5  │                     │
│ └──────────────┘  └──────────────┘                     │
│                                                         │
└─────────────────────────────────────────────────────────┘

Grid: lg:grid-cols-3
Gap: gap-4 (16px)
```

---

## COMPONENT SPECIFICATIONS

### LinkItem Card
```
┌─────────────────────────────────────┐
│ [L-bracket]                [L-bracket]
│
│ ●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●
│ ●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●
│ ●
│ ● 🔗  Portfolio                   →
│ ●     View my projects
│ ●
│ ●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●
│ ●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●
│
│ [L-bracket]                [L-bracket]
└─────────────────────────────────────┘

Dimensions:
- Width: full width of grid cell
- Height: auto
- Padding: p-4 sm:p-6 lg:p-8 (consistent with 4px grid)
- Min height: ~72px (enough for label + description + icon)

Border:
- Type: solid 0.5px
- Color: var(--border) [10% opacity]
- Radius: rounded-lg (8px)

Hover Effects (150ms, cubic-bezier(0.25,1,0.5,1)):
- Scale: scale-105 (5% enlargement, conservative)
- Background: subtle tint (platform color @ 8-12% opacity)
- Border: increased opacity (10% → 30-40%)
- Icon: color shift to platform color (400-500 range)
- Arrow: translate 4px right + scale 110%

Background:
- Default: bg-card (oklch(0.205 0 0) in dark mode)
- DotPattern overlay: opacity-20 default, opacity-40 on hover
- Transition: opacity 200ms ease

Interior Layout:
┌─────────────────────────────────────┐
│ ┌─────┐  ┌──────────────┐       ┌──┐│
│ │ 🔗  │  │ Portfolio    │  ...  │→││
│ │     │  │ View proj    │       │  ││
│ └─────┘  └──────────────┘       └──┘│
└─────────────────────────────────────┘
  icon     content (flex-col)     arrow
  40px     flex-1                 32px
  gap: 12px
```

### Corner Brackets
```
Position specification: absolute, 0 inset from corners
Size: 12px × 12px
Border width: 1px
Border color: var(--border) @ 20-40% opacity
Corner positions:
  - top-left:     border-t border-l
  - top-right:    border-t border-r
  - bottom-left:  border-b border-l
  - bottom-right: border-b border-r

Hover behavior:
  Opacity increases: 20% → 50%
  Transition: 200ms ease-[cubic-bezier(0.25,1,0.5,1)]
```

### Dot Pattern
```
Type: radial-gradient background
Size: 24px × 24px grid spacing
Dot radius: 1px
Dot color: rgba(255, 255, 255, 0.04) [subtle white dots]
Default opacity: 20%
Hover opacity: 40%
Transition: 300ms ease

CSS:
background-image: radial-gradient(
  rgba(255, 255, 255, 0.04) 1px,
  transparent 1px
);
background-size: 24px 24px;
```

### Section Dividers
```
Position: Between header and links, between links and footer
Type: horizontal line spanning between vertical rails
Height: 1px
Color: var(--border) [10% opacity]
Spacing:
  - From rail-offset to rail-offset
  - Above: padding-top from section
  - Below: padding-bottom to section

Example spacing:
├─────────────────────────────── ← section-divider
│ (padding-top: 32px)
│ [Links Grid]
│ (padding-bottom: 32px)
└─────────────────────────────── ← section-divider
```

---

## SPACING & SIZING

### 4px Grid System Application
```
Micro spacing (4px):
  - Between icon and label text
  - Between elements within card padding
  - Corner bracket corner insets

Tight spacing (8px):
  - Between icon and content area
  - Card padding on mobile
  - Button padding

Standard spacing (12px):
  - Gap between cards (gap-3)
  - Card padding on tablet (p-3)
  - Vertical spacing in content

Comfortable spacing (16px):
  - Gap between cards desktop (gap-4)
  - Card padding on desktop (p-4, p-6)
  - Section padding

Generous spacing (24px):
  - Between major sections
  - Header to links gap
  - Links to footer gap

Major separation (32px):
  - Top/bottom padding of page
  - Between major layout sections
```

### Padding & Margins (Responsive)
```
Card Padding:
  Mobile: p-3 (12px)
  Tablet: p-4 (16px)
  Desktop: p-6-p-8 (24-32px)

Section Spacing:
  Header margin-bottom: mb-16 (64px)
  Links gap: gap-3 sm:gap-4 (12-16px)
  Footer margin-top: mt-16 (64px)

Container Padding:
  Outer: p-6 sm:p-8 lg:p-12
  Rail-bounded: margin-left/right: var(--rail-offset)
```

---

## COLORS & OPACITY

### Border Colors
```
Default:     var(--border) @ 100% = oklch(1 0 0 / 10%) [dark mode]
Subtle:      var(--border) @ 50%  = oklch(1 0 0 / 5%)
Active:      var(--border) @ 100% + opacity increase on hover
Platform:    [color] @ 70% on hover (increased from 50%)
```

### Background Colors
```
Card:        var(--card) = oklch(0.205 0 0) [dark gray]
Muted:       var(--muted) = oklch(0.269 0 0) [lighter gray]
Platform BG: [color] @ 12% opacity on hover

Examples:
  GitHub:    bg-purple-500/12  (purple tint at 12%)
  LinkedIn:  bg-blue-600/12    (blue tint at 12%)
  X:         bg-slate-400/12   (slate tint at 12%)
  Email:     bg-red-500/12     (red tint at 12%)
```

### Text Colors
```
Primary:        var(--foreground) = oklch(0.985 0 0) [near white]
Secondary:      var(--muted-foreground) = oklch(0.708 0 0) [mid gray]
Accent:         var(--accent) = oklch(0.79 0.115 247) [blue]
Platform text:  [color]-400 on hover

Transitions:
  All text color changes: duration-150 ease-[cubic-bezier(0.25,1,0.5,1)]
```

---

## ANIMATION SPECIFICATIONS

### Timing
```
Standard:       150ms (micro-interactions, hover effects)
Card transitions: 200ms (corner brackets, dot pattern opacity)
Lazy animations: 300ms (background patterns)
Duration variable: --animation-duration

Standard easing: cubic-bezier(0.25, 1, 0.5, 1) [Vercel curve]
```

### Effects
```
Hover Scale:     scale-105 (card) or scale-110 (icon)
Translate:       translate-x-1 (arrow → 4px right)
Opacity:         dot-pattern (20% → 40%), brackets (20% → 50%)
Shadow:          optional, subtle (0_2px_8px max at 8% opacity)
```

### Mobile Considerations
```
Reduced motion:  motion-reduce:transition-none
Touch states:    active:scale-[0.98] (press feedback)
Hover:           disabled on touch devices (use @media hover)
```

---

## ACCESSIBILITY SPECIFICATIONS

### ARIA Attributes
```
Links:
  aria-label="Visit {platform}"
  role="link" (implicit from <a> or Link)

Icons:
  aria-hidden="true" (purely decorative)

Dot pattern & brackets:
  aria-hidden="true"

Focus states:
  outline-none
  ring-2 ring-accent/50
  ring-offset-2 ring-offset-card
```

### Keyboard Navigation
```
Tab order: Natural DOM order (portfolio → github → linkedin → x → email)
Enter: Activate link
Space: Activate link
Visual indicators: Ring styling on focus
Focus visible: Always visible
```

### Semantic HTML
```
Header sections:     <header> or <div role="region">
Links:              <a href> with proper rel attributes
External links:     rel="noopener noreferrer"
Icons:              <svg aria-hidden="true">
Decorative elements: aria-hidden="true"
```

---

## RESPONSIVE BREAKPOINTS

### Tailwind Breakpoints Used
```
Base (mobile first): All default styles
sm (640px):  Tablet & larger
  - Grid changes to 2 columns
  - Padding increases (p-3 → p-4)
  - Gap increases (gap-2 → gap-3)
  - Font sizes increase if needed

lg (1024px): Desktop
  - Grid changes to 3 columns (optional)
  - Padding increases to p-6-p-8
  - Gap increases to gap-4

xl (1280px): Large desktop
  - Max width enforcement
  - Full-width reserve for rails
```

### Rail Offset Calculation
```
CSS: --rail-offset: max(1rem, calc(50% - 36rem))

Explanation:
  50% - 36rem = center minus half of max-w-6xl (72rem)
  max(1rem, ...) = minimum 16px margin on mobile

Results:
  Mobile (< 640px):  ~16px rails margin
  Tablet (640-1024): scales with viewport
  Desktop (1024+):   max-width constraint
```

---

## TESTING CHECKLIST

### Responsive Testing
- [ ] Mobile (375px - 425px): Single column, proper spacing
- [ ] Tablet (640px - 768px): Two column, medium spacing
- [ ] Desktop (1024px+): Three column (or 2x2+1), full spacing
- [ ] Ultra-wide (1400px+): Proper centering with rails

### Interaction Testing
- [ ] Hover effects work on all cards
- [ ] Scale animations are smooth (150ms)
- [ ] Icon animations trigger correctly
- [ ] Arrow translates properly on hover
- [ ] Color transitions match platform specs
- [ ] Dot patterns appear/disappear on hover
- [ ] Corner brackets become more visible on hover

### Language Testing
- [ ] English content displays correctly
- [ ] Portuguese content displays correctly
- [ ] Long text doesn't break layout
- [ ] Monospace text aligns properly

### Accessibility Testing
- [ ] All links keyboard navigable
- [ ] Focus ring visible on all elements
- [ ] aria-labels present on all links
- [ ] Icons marked aria-hidden
- [ ] Color contrast meets WCAG AA
- [ ] No keyboard traps
- [ ] Screen reader announces links correctly
- [ ] No motion issues with reduced-motion preference

### Performance Testing
- [ ] No layout shifts on hover
- [ ] Animations smooth at 60fps
- [ ] Bundle size < 50KB for page code
- [ ] First paint < 2s on 4G
- [ ] Cumulative Layout Shift < 0.1
```


# Animation Troubleshooting Guide

This guide helps diagnose and fix animation issues in the portfolio application.

## Table of Contents

1. [Quick Diagnostics](#quick-diagnostics)
2. [Common Issues](#common-issues)
3. [Browser Compatibility](#browser-compatibility)
4. [Component-Specific Troubleshooting](#component-specific-troubleshooting)
5. [CSS Conflicts](#css-conflicts)
6. [Testing Animations](#testing-animations)

---

## Quick Diagnostics

### Test Page

Visit `/animation-test` to run comprehensive diagnostics:

- Browser support detection
- Live component testing
- Debug logs in console
- Troubleshooting tips

### Manual Checks

1. **Check Dependencies**

   ```bash
   npm list svelte-motion
   # Should show: svelte-motion@0.12.2
   ```

2. **Verify Build**

   ```bash
   npm run build
   # Should complete without errors
   ```

3. **Check Console**
   - Open Browser DevTools (F12)
   - Look for animation debug logs
   - Check for errors

---

## Common Issues

### Issue 1: Animations Not Working

**Symptoms:**

- Elements don't fade in
- No blur effect on scroll
- Theme toggle has no animation

**Solutions:**

1. **Check Browser Support**
   - View Transitions API requires:
     - Chrome 111+
     - Edge 111+
     - Safari 18+
     - Firefox: Not yet supported (uses fallback)
2. **Check Reduced Motion Settings**
   - Windows: Settings → Accessibility → Visual effects → Animation effects
   - macOS: System Preferences → Accessibility → Display → Reduce motion
   - Linux: Varies by desktop environment

3. **Verify svelte-motion Installation**

   ```bash
   npm install svelte-motion@^0.12.2
   ```

4. **Clear Browser Cache**
   - Hard refresh: Ctrl+Shift+R (Windows/Linux) or Cmd+Shift+R (macOS)

### Issue 2: BlurFade Not Animating

**Symptoms:**

- Elements appear instantly without animation
- No blur or fade effect

**Debug Steps:**

1. **Enable Debug Mode**

   ```svelte
   <BlurFade debug={true} delay={0.15}>
   	<div>Your content</div>
   </BlurFade>
   ```

2. **Check Console Logs**
   - Should see: `[BlurFade xyz] Initialized with config:`
   - Should see: `[BlurFade xyz] View state changed:` when scrolling

3. **Verify IntersectionObserver Support**
   - Open console and run:
     ```javascript
     console.log('IntersectionObserver' in window);
     // Should return: true
     ```

4. **Check CSS Conflicts**
   - Look for `animation: none` or `transition: none` in computed styles
   - Verify element is not inside a parent with `display: none`

### Issue 3: Theme Toggle Animation Not Working

**Symptoms:**

- Theme changes instantly
- No circular ripple effect
- No transition animation

**Debug Steps:**

1. **Enable Debug Mode**

   ```svelte
   <ModeToggle debug={true} />
   ```

2. **Check Console Logs**
   - Should see: `[ModeToggle] Browser support check:`
   - Should see animation logs when clicking

3. **Verify View Transitions API**
   - Open console and run:
     ```javascript
     console.log('startViewTransition' in document);
     // true = supported, false = fallback mode
     ```

4. **Check for Errors**
   - Look for "Transition interrupted" messages
   - Check if `toggleMode()` is being called

---

## Browser Compatibility

### Supported Browsers

| Feature              | Chrome | Edge | Safari | Firefox       |
| -------------------- | ------ | ---- | ------ | ------------- |
| View Transitions API | 111+   | 111+ | 18+    | ❌ (fallback) |
| CSS Animations       | ✅     | ✅   | ✅     | ✅            |
| Web Animations API   | ✅     | ✅   | ✅     | ✅            |
| IntersectionObserver | ✅     | ✅   | ✅     | ✅            |

### Fallback Behavior

When View Transitions API is not supported:

- **ModeToggle**: Uses CSS fade animation
- **BlurFade**: Uses svelte-motion (always works)

---

## Component-Specific Troubleshooting

### BlurFade Component

**Configuration Options:**

```svelte
<BlurFade
  duration={0.4}        // Animation duration in seconds
  delay={0}             // Delay before animation starts
  yOffset={8}           // Vertical offset in pixels
  inViewMargin="100px"  // Trigger margin before element is visible
  blur="2px"            // Initial blur amount
  once={true}           // Animate only once
  debug={false}         // Enable console logging
>
  <div>Content</div>
</BlurFade>
```

**Common Problems:**

1. **Animation triggers too early/late**
   - Adjust `inViewMargin` (e.g., "200px" for earlier, "50px" for later)

2. **Animation repeats on scroll**
   - Set `once={true}` (default)

3. **Animation too fast/slow**
   - Adjust `duration` (e.g., 0.6 for slower, 0.2 for faster)

### ModeToggle Component

**Configuration:**

```svelte
<ModeToggle debug={false} />
```

**Common Problems:**

1. **Click position not detected**
   - Ensure button receives click events
   - Check z-index of parent elements

2. **Circular animation incorrect**
   - clipPath calculation depends on window size
   - Verify browser supports clipPath animation

3. **Animation interrupted**
   - User switching themes too quickly
   - Check console for "Transition interrupted" message

---

## CSS Conflicts

### Check for Conflicts

1. **Inspect Element**
   - Right-click → Inspect
   - Check Computed tab
   - Look for overridden styles

2. **Common Conflicts**

   ```css
   /* These can break animations */
   * {
   	animation: none !important;
   	transition: none !important;
   }

   /* Check for conflicting classes */
   .no-animation {
   	animation: none;
   }
   ```

3. **View Transition Styles**
   - Check if `view-transition-name: root` is set on `<html>`
   - Verify pseudo-elements `::view-transition-new(root)` exist

### Required CSS (in app.css)

```css
/* Essential for theme transitions */
html {
	view-transition-name: root;
}

::view-transition-old(root),
::view-transition-new(root) {
	animation: none;
	mix-blend-mode: normal;
}

.theme-transitioning {
	animation: theme-fade 0.5s ease-in-out;
}

@keyframes theme-fade {
	0%,
	100% {
		opacity: 1;
	}
	50% {
		opacity: 0.85;
	}
}
```

---

## Testing Animations

### Manual Testing

1. **BlurFade Test**
   - Visit `/animation-test`
   - Scroll down slowly
   - Elements should fade in with blur as they enter viewport

2. **ModeToggle Test**
   - Click theme toggle button
   - Watch for circular ripple (if supported) or fade effect
   - Check console for debug messages

### Automated Testing

```bash
# Run type checking
npm run check

# Build to verify no errors
npm run build

# Preview production build
npm run preview
```

### Debug Mode Testing

```svelte
<!-- Enable debug on specific components -->
<BlurFade debug={true}>
	<div>Test content</div>
</BlurFade>

<ModeToggle debug={true} />
```

Then check browser console for:

- Initialization messages
- State changes
- Animation events
- Error messages

---

## Advanced Debugging

### Run Diagnostics Programmatically

```javascript
import { runAnimationDiagnostics } from '$lib/utils';

// In browser console or onMount
runAnimationDiagnostics();
```

### Check Animation Support

```javascript
import { checkAnimationSupport } from '$lib/utils';

const support = checkAnimationSupport();
console.log(support);
// {
//   viewTransitions: true/false,
//   cssAnimations: true/false,
//   cssTransitions: true/false,
//   webAnimationsAPI: true/false,
//   prefersReducedMotion: true/false,
//   browserInfo: "Mozilla/5.0..."
// }
```

### Validate CSS Classes

```javascript
import { validateAnimationClasses } from '$lib/utils';

const result = validateAnimationClasses(['theme-transitioning']);
console.log(result);
// { valid: true, missing: [] }
```

---

## Performance Optimization

### If Animations Are Laggy

1. **Reduce Animation Complexity**

   ```svelte
   <!-- Simpler blur -->
   <BlurFade blur="1px" duration={0.3}>
   ```

2. **Optimize Large Lists**

   ```svelte
   <!-- Stagger delays to prevent simultaneous animations -->
   {#each items as item, i}
   	<BlurFade delay={i * 0.05}>
   		<div>{item}</div>
   	</BlurFade>
   {/each}
   ```

3. **Use `will-change` CSS Property**
   ```css
   .animated-element {
   	will-change: opacity, transform;
   }
   ```

---

## Getting Help

If animations still don't work after following this guide:

1. Visit `/animation-test` and screenshot the results
2. Check browser console and copy any errors
3. Note your:
   - Browser name and version
   - Operating system
   - Whether you have reduced motion enabled
4. Check package.json for svelte-motion version
5. Run `npm run build` and note any warnings/errors

---

## Version Information

- **svelte-motion**: ^0.12.2
- **svelte**: ^4.2.7
- **@sveltejs/kit**: ^2.0.0

Last updated: 2025-11-17

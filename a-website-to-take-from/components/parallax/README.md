# Parallax Components

This project includes custom parallax components that provide smooth scrolling effects for images and content sections.

## Components

### useParallax Hook

A custom React hook that provides parallax functionality using the Intersection Observer API.

**Options:**

- `speed` (number, default: 0.5): Controls the parallax speed. Lower values = slower movement
- `direction` ('up' | 'down', default: 'up'): Direction of the parallax movement
- `scale` (number, default: 1.2): Scale factor for the element during parallax
- `disabled` (boolean, default: false): Disables the parallax effect

### ParallaxImage

A component for creating parallax effects on images.

**Props:**

- All standard Image props from Next.js
- `speed` (number): Parallax speed
- `direction` ('up' | 'down'): Movement direction
- `scale` (number): Scale factor
- `disabled` (boolean): Disable effect
- `containerClassName` (string): CSS classes for container
- `imageClassName` (string): CSS classes for image wrapper
- `overlay` (boolean): Enable overlay
- `overlayClassName` (string): CSS classes for overlay

**Example:**

```tsx
<ParallaxImage
  src="/path/to/image.jpg"
  alt="Hero image"
  fill
  priority
  speed={0.5}
  direction="down"
  scale={1.2}
  overlay
  overlayClassName="bg-black/50"
/>
```

### ParallaxSection

A component for adding subtle parallax effects to content sections.

**Props:**

- `children` (ReactNode): Content to apply parallax to
- `speed` (number): Parallax speed
- `direction` ('up' | 'down'): Movement direction
- `scale` (number): Scale factor
- `disabled` (boolean): Disable effect
- `offset` (number): Additional Y offset

**Example:**

```tsx
<ParallaxSection speed={0.2} direction="up">
  <div className="content">Your content here</div>
</ParallaxSection>
```

## Performance Notes

- Uses Intersection Observer for efficient visibility detection
- RequestAnimationFrame for smooth animations
- Automatically cleans up event listeners
- Only applies effects when elements are visible
- Supports disabling for mobile or reduced motion preferences

## Browser Support

- Modern browsers with Intersection Observer support
- Graceful fallback (no effect) for unsupported browsers
- Respects `prefers-reduced-motion` when `disabled` prop is set accordingly

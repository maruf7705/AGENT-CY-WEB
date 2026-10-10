# MILADICODE — Portfolio Hero Section

A full-screen (100vh) portfolio hero section for a **Digital Artist / Creative Technologist**, built with **Next.js 14**, **React**, **Tailwind CSS**, **TypeScript**, and **Framer Motion**.

---

## Key Features & Design Architecture

1. **Preserved Reference Background**
   - The original background artwork (`hero-bg.jpg`) is preserved in its exact character, flowers, glowing hills, rainbow halo portal, lighting, and chromatic cinematic atmosphere.
   - Positioned as a full-screen background with responsive object framing (`object-cover`).

2. **Atmospheric Feathered Shadow**
   - Implemented via `components/AtmosphericShadow.tsx` using a large radial feathered shadow (`radial-gradient`) fading gently toward the center.
   - Eliminates harsh rectangular overlay boxes, maintaining full artwork vibrancy while providing contrast for typography.

3. **Typography & Layout Hierarchy**
   - **Top-Left**: Minimal `MILADICODE` logo with accent indicator.
   - **Top-Right**: `Home / Work / About / Contact` navigation bar with interactive underline indicators and mobile menu.
   - **Main Content (Left)**:
     - Badge: `DIGITAL ARTIST / CREATIVE TECHNOLOGIST`
     - Heading: `Where Creativity Meets Technology` with "Technology" styled in a luminous lavender accent (`text-violet-300`).
     - Supporting copy reflecting generative AI, 3D speculative environments, and kinetic systems.
     - Interactive circular-arrow `"View My Work"` CTA capsule.
   - **Right Side**: Small vertical `AI / 3D / MOTION / WEB` discipline indicator with active state styling.
   - **Bottom-Left**: `"SCROLL TO EXPLORE"` indicator with animated hairline pulse.
   - **Bottom-Right**: Ambient sound status toggle.
   - **Interactive Showcase Modals**: Clicking "View My Work", "About", or "Contact" opens modal views.

---

## Getting Started

```bash
# Navigate to the folder
cd "Web Four"

# Install dependencies (already installed)
pnpm install

# Run the development server
pnpm dev -p 3004

# Build for production
pnpm build
```

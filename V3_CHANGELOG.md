# TezdaSotdim V3 — AI Concierge

## Product direction
- Buyer-only discovery funnel: problem → clarification → AI search → matching listings → original @tezdasotdim Telegram post.
- Black/white editorial visual system with no heavy 3D/WebGL dependencies.
- Mobile-first bottom dock and thumb-friendly interaction surfaces.

## Frontend
- Rebuilt homepage hero and conversion flow.
- Added `AiConcierge.tsx` progressive intent discovery.
- Rebuilt bot cards and catalog in monochrome design.
- Added responsive typography, reduced-motion support, lightweight CSS transitions.
- Preserved `/api/search`, `/api/ads`, `/api/stats` integration contracts.

## Performance intent
- No new runtime dependencies.
- No video/WebGL/Three.js assets.
- Animations use CSS transform/opacity/borders only.

## Verification note
`npm install` could not complete in the execution environment because package download timed out, so a full Next.js production build could not be run here. The project keeps the same package dependencies as V2 and adds no third-party packages.

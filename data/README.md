# `data/`

Single source of truth for all seed content (EN + DE) and shared types.

## Files

- `data.ts` — All seed data as typed arrays. Seed components import from here instead of hardcoding inline.
- `types.ts` — Shared TypeScript types (`Maybe`, `WithId`, `ImageConfig`, `CTA`, etc.).
- `index.ts` — Barrel export for both `types` and `data`.

## Usage

Seed components import data directly:

```typescript
import { benefitsSectionsData, ctasData, imageSeedData } from "../../data";
```

## Maintenance

- Edit `data.ts` to update seed content
- Edit `types.ts` to add/modify shared types
- Never edit `generated/` files directly

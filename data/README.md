# `data/`

This directory has two different roles:

- `data.ts` is legacy, reference-only website content. It is not an active seed source and should not be edited as part of content updates.
- `types.ts` contains active shared types used by seed modules.
- `icons/remixicon-map.ts` is an active icon mapping used by seed modules.
- `index.ts` re-exports the active shared types from `types.ts`.

Maintain actual seed content under `seed/`. See the [seed CLI guide](../seed/README.md) for usage.

# DiMaac Clothes Rack

An interactive 3D clothes rack built with Next.js, React, Three.js, and Tailwind CSS v4. The rack is rendered on the home page and supports pointer, keyboard, touch, and reduced-motion interactions.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Component

The reusable component and its supporting simulation files are in [`src/components/dimaac/`](./src/components/dimaac/). Import it with:

```tsx
import { ClothesRack } from "@/components/dimaac/clothes-rack";

<ClothesRack />;
```

See [`install.md`](./install.md) for the full component documentation, props, and source.

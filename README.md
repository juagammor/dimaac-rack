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

Each garment can use transparent cutout photos as its front and back; the photo becomes the garment rather than a print on generated cloth. Put tightly cropped images in `public/` and use their public URLs:

```tsx
const items: ClothesRackItem[] = [
  {
    name: "Sevilla FC Jersey — Vargas #11",
    kind: "tee",
    colour: "#f2f1ed",
    image: "/products/vargas-front.png",
    backImage: "/products/vargas-back.png",
    details: [
      { label: "Player", value: "Rubén Vargas" },
      { label: "Club", value: "Sevilla FC" },
      { label: "Competition", value: "LaLiga" },
      { label: "Season", value: "2025–2026" },
    ],
  },
];

<ClothesRack items={items} />;
```

See [`install.md`](./install.md) for the full component documentation, props, and source.

The optional `details` array accepts `{ label, value }` rows and appears beside the image in the product card. The card provides front/back carousel controls when both images are supplied.

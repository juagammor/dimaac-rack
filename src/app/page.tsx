import { Suspense } from "react";
import { ClothesRack, type ClothesRackItem } from "@/components/dimaac/clothes-rack";
import catalogData from "@/data/products.json";

type SeasonalClothesRackItem = ClothesRackItem & { season: string };

function isGarmentKind(kind: string): kind is ClothesRackItem["kind"] {
  return kind === "tee" || kind === "crewneck" || kind === "shirt";
}

const catalog: SeasonalClothesRackItem[] = catalogData.map((item) => {
  if (!isGarmentKind(item.kind)) {
    throw new Error(`Unknown garment kind "${item.kind}" in the product catalog.`);
  }

  return { ...item, kind: item.kind };
});

async function SeasonalHome({
  searchParams,
}: {
  searchParams: Promise<{ season?: string | string[] }>;
}) {
  const { season: seasonParam } = await searchParams;
  const season = Array.isArray(seasonParam) ? seasonParam[0] : seasonParam;
  const items = season ? catalog.filter((item) => item.season === season) : catalog;

  return (
    <main className="relative h-dvh min-h-[36rem] overflow-hidden bg-[#FAFAFA] text-[#0A0A0A] dark:bg-[#0B0B0C] dark:text-[#F5F5F5]">
      <header className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-center justify-between px-6 pt-6 text-[13px] text-[#6B7280] sm:px-[4%] dark:text-[#8B8F98]">
        <span className="font-medium tracking-[0.08em]">DIMAAC / OBJECTS</span>
        <span>Collection 01 — Motion studies</span>
      </header>

      <ClothesRack items={items} className="absolute! inset-0" />

      <footer className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex items-end justify-between px-6 pb-6 text-[12px] text-[#6B7280] sm:px-[4%] dark:text-[#8B8F98]">
        <p className="max-w-56 leading-relaxed sm:max-w-xs">
          {items.length > 0
            ? `${items.length} ${items.length === 1 ? "piece" : "pieces"} on the rail.`
            : `No pieces found${season ? ` for season ${season}` : ""}.`}
          <br />
          Move through the collection.
        </p>
        <p className="hidden text-right sm:block">
          Hover to turn · Click to explore
          <br />
          Arrow keys to browse
        </p>
      </footer>
    </main>
  );
}

export default function Home({
  searchParams,
}: {
  searchParams: Promise<{ season?: string | string[] }>;
}) {
  return (
    <Suspense
      fallback={
        <main className="flex h-dvh min-h-[36rem] items-center justify-center bg-[#FAFAFA] text-[#6B7280] dark:bg-[#0B0B0C] dark:text-[#8B8F98]">
          Loading collection…
        </main>
      }
    >
      <SeasonalHome searchParams={searchParams} />
    </Suspense>
  );
}

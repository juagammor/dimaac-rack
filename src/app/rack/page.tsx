import { Suspense } from "react";
import Link from "next/link";
import { ClothesRack, type ClothesRackItem } from "@/components/dimaac/clothes-rack";
import catalogData from "@/data/products.json";

type SeasonalClothesRackItem = ClothesRackItem & { season: string };

function isGarmentKind(kind: string): kind is ClothesRackItem["kind"] {
  return kind === "tee" || kind === "crewneck" || kind === "shirt";
}

const catalog: SeasonalClothesRackItem[] = catalogData.map((item): SeasonalClothesRackItem => {
  if (!isGarmentKind(item.kind)) {
    throw new Error(`Unknown garment kind "${item.kind}" in the product catalog.`);
  }

  return { ...item, kind: item.kind } as SeasonalClothesRackItem;
});

async function SeasonalRack({
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
        <div className="flex items-center gap-6">
          <span>{season ? `Season ${season.replace("-", "–")}` : "All seasons"}</span>
          <Link
            href="/"
            className="pointer-events-auto flex items-center gap-2 rounded-full border-0 bg-transparent px-2 py-1 text-[13px] text-[#0A0A0A] transition-opacity duration-150 hover:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current dark:text-[#F5F5F5]"
          >
            Close
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
              <path d="M2 2L10 10M10 2L2 10" />
            </svg>
          </Link>
        </div>
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

export default function RackPage({
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
      <SeasonalRack searchParams={searchParams} />
    </Suspense>
  );
}

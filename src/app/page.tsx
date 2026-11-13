import Link from "next/link";
import catalogData from "@/data/products.json";

const seasons = [...new Set(catalogData.map((item) => item.season))]
  .filter((season): season is string => Boolean(season))
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

export default function Home() {
  return (
    <main className="flex min-h-dvh flex-col bg-[#FAFAFA] text-[#0A0A0A] dark:bg-[#0B0B0C] dark:text-[#F5F5F5]">
      <header className="flex items-center justify-between px-6 pt-6 text-[13px] text-[#6B7280] sm:px-[4%] dark:text-[#8B8F98]">
        <span className="font-medium tracking-[0.08em]">DIMAAC / OBJECTS</span>
        <span>Football shirts archive</span>
      </header>

      <section className="mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center px-6 py-20 sm:px-12">
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.16em] text-[#8B8F98]">
          Explore the collection
        </p>
        <h1 className="mb-12 text-4xl font-medium tracking-[-0.04em] sm:text-6xl">
          Select a season
        </h1>

        {seasons.length > 0 ? (
          <ul className="grid grid-cols-3 border-y border-black/10 dark:border-white/15">
            {seasons.map((season) => (
              <li
                key={season}
                className="border-b border-r border-black/10 [&:nth-child(3n)]:border-r-0 [&:nth-last-child(-n+3)]:border-b-0 dark:border-white/15"
              >
                <Link
                  href={`/rack?season=${encodeURIComponent(season)}`}
                  className="group flex items-center justify-between gap-1 px-2 py-5 text-base transition-colors hover:text-[#777] sm:px-5 sm:py-8 sm:text-2xl dark:hover:text-[#B8BBC2]"
                >
                  <span>{season.replace("-", "–")}</span>
                  <span
                    className="text-base transition-transform group-hover:translate-x-1 sm:text-2xl"
                    aria-hidden="true"
                  >
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-[#6B7280] dark:text-[#8B8F98]">
            No seasons are available in the catalog.
          </p>
        )}
      </section>

      <footer className="px-6 pb-6 text-[12px] text-[#6B7280] sm:px-[4%] dark:text-[#8B8F98]">
        {seasons.length} {seasons.length === 1 ? "season" : "seasons"} in the collection.
      </footer>
    </main>
  );
}

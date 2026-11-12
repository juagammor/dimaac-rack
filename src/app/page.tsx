import { ClothesRack } from "@/components/dimaac/clothes-rack";

export default function Home() {
  return (
    <main className="relative h-dvh min-h-[36rem] overflow-hidden bg-[#FAFAFA] text-[#0A0A0A] dark:bg-[#0B0B0C] dark:text-[#F5F5F5]">
      <header className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-center justify-between px-6 pt-6 text-[13px] text-[#6B7280] sm:px-[4%] dark:text-[#8B8F98]">
        <span className="font-medium tracking-[0.08em]">DIMAAC / OBJECTS</span>
        <span>Collection 01 — Motion studies</span>
      </header>

      <ClothesRack className="absolute! inset-0" />

      <footer className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex items-end justify-between px-6 pb-6 text-[12px] text-[#6B7280] sm:px-[4%] dark:text-[#8B8F98]">
        <p className="max-w-56 leading-relaxed sm:max-w-xs">
          Ten pieces on a rail.
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

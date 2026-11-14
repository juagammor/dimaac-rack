import Link from "next/link";
import Image from "next/image";
import catalogData from "@/data/products.json";
import presentation from "@/config/presentation.json";

type ContactSettings = Partial<
  Record<"description" | "instagram" | "twitter" | "email", string>
>;
type PresentationWithOptionalContact = Omit<typeof presentation, "section"> & {
  section: Omit<typeof presentation.section, "contacto"> & {
    contacto?: ContactSettings;
  };
};

const contactSettings = (presentation as PresentationWithOptionalContact).section
  .contacto;
const instagram = contactSettings?.instagram?.trim();
const twitter = contactSettings?.twitter?.trim();
const email = contactSettings?.email?.trim();
const aboutDescription = contactSettings?.description?.trim();

const seasons = [...new Set(catalogData.map((item) => item.season))]
  .filter((season): season is string => Boolean(season))
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

const countByType = (type: string) =>
  catalogData.filter((item) =>
    item.details.some(
      (detail) => detail.label === "Tipo" && detail.value === type,
    ),
  ).length;

const matchWornCount = countByType("MW");
const preparedCount = countByType("Preparada");

const sectionNavigation = [
  { href: "#temporadas", label: "Temporadas" },
  { href: "#resumen", label: "Resumen" },
  { href: "#contacto", label: "About Us" },
];

export default function Home() {
  return (
    <main
      className="text-[#0A0A0A]"
      style={{ backgroundColor: presentation.section.temporadas.bg.color }}
    >
      <header
        className="sticky top-0 z-20 border-b border-white/10 text-[#F5F5F5]"
        style={{ backgroundColor: presentation.section.inicio.bg.color }}
      >
        <nav
          aria-label="Navegación principal"
          className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-3 px-6 sm:gap-6 sm:px-12"
        >
          <a
            href="#inicio"
            className="shrink-0 text-xs font-medium tracking-[0.12em] sm:text-sm"
          >
            {presentation.sitename}
          </a>
          <ul className="flex items-center gap-2 text-xs text-white/70 sm:gap-8 sm:text-sm">
            {sectionNavigation.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="transition-colors hover:text-white"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <section
        id="inicio"
        aria-labelledby="welcome-title"
        className="flex h-[1207px] scroll-mt-16 items-center bg-no-repeat px-6 text-[#F5F5F5] sm:px-12"
        style={{
          backgroundColor: presentation.section.inicio.bg.color,
          backgroundImage: `url("${presentation.section.inicio.bg.image}")`,
          backgroundPosition: "right 250px top",
          backgroundSize: "auto 1207px",
        }}
      >
        <div className="mx-auto w-full max-w-7xl">
          <p className="mb-5 text-xs font-medium uppercase tracking-[0.2em] text-white/60 sm:text-sm">
            {presentation.section.inicio.subtitle}
          </p>
          <h1
            id="welcome-title"
            className="max-w-2xl text-5xl font-medium leading-[0.98] tracking-[-0.06em] sm:text-7xl lg:text-8xl"
          >
            {presentation.section.inicio.title}
          </h1>
          <a
            href="#temporadas"
            className="mt-10 inline-flex items-center gap-3 border-b border-white/50 pb-2 text-sm transition-colors hover:border-white"
          >
            Explorar temporadas
            <span aria-hidden="true">↓</span>
          </a>
        </div>
      </section>

      <section
        id="temporadas"
        aria-labelledby="seasons-title"
        className="mx-auto flex w-full max-w-5xl scroll-mt-16 flex-col justify-center px-6 py-24 sm:px-12 sm:py-32"
      >
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.16em] text-[#8B8F98]">
          Explora la colección
        </p>
        <h2
          id="seasons-title"
          className="mb-12 text-4xl font-medium tracking-[-0.04em] sm:text-6xl"
        >
          Temporadas
        </h2>

        {seasons.length > 0 ? (
          <ul className="grid grid-cols-3 border-y border-black/10">
            {seasons.map((season) => (
              <li
                key={season}
                className="border-b border-r border-black/10 [&:nth-child(3n)]:border-r-0 [&:nth-last-child(-n+3)]:border-b-0"
              >
                <Link
                  href={`/rack?season=${encodeURIComponent(season)}`}
                  className="group flex items-center justify-between gap-1 px-2 py-5 text-sm transition-colors hover:text-[#777] sm:px-5 sm:py-8 sm:text-xl"
                >
                  <span>{season.replace("-", "–")}</span>
                  <span
                    className="text-sm transition-transform group-hover:translate-x-1 sm:text-xl"
                    aria-hidden="true"
                  >
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-[#6B7280]">
            No hay temporadas disponibles en el catálogo.
          </p>
        )}
      </section>

      <section
        id="resumen"
        aria-labelledby="summary-title"
        className="scroll-mt-16 px-6 py-24 text-[#F5F5F5] sm:px-12 sm:py-32"
        style={{ backgroundColor: presentation.section.inicio.bg.color }}
      >
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.16em] text-white/50">
            La colección en cifras
          </p>
          <h2
            id="summary-title"
            className="mb-14 text-4xl font-medium tracking-[-0.04em] sm:mb-20 sm:text-6xl"
          >
            Un archivo vivo.
          </h2>
          <dl className="grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-6">
            {[
              { value: catalogData.length, label: "Camisetas en la colección" },
              { value: matchWornCount, label: "MatchWorn" },
              { value: preparedCount, label: "Preparadas para juego" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col border-t border-white/20 pt-5"
              >
                <dt className="order-2 mt-3 text-sm text-white/60">
                  {stat.label}
                </dt>
                <dd className="order-1 text-6xl font-medium tracking-[-0.06em] sm:text-7xl lg:text-8xl">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <footer
        id="contacto"
        aria-labelledby="contact-title"
        className="scroll-mt-16 px-6 py-20 sm:px-12 sm:py-28"
        style={{ backgroundColor: presentation.section.temporadas.bg.color }}
      >
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-2 md:items-center">
          <div>
            <h2
              id="contact-title"
              className="text-4xl font-medium tracking-[-0.04em] sm:text-6xl"
            >
              About us
            </h2>
            {aboutDescription && (
              <p className="mt-6 max-w-xl text-base leading-relaxed text-[#6B7280]">
                {aboutDescription}
              </p>
            )}
          </div>
          <nav
            aria-label="Canales de contacto"
            className="flex items-center justify-center gap-6 md:justify-end"
          >
            {instagram && (
              <a
                href={instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Abrir Instagram"
                className="transition-opacity hover:opacity-60"
              >
                <Image
                  src="/instagram.png"
                  alt=""
                  width={40}
                  height={40}
                  className="h-8 w-8 object-contain"
                />
              </a>
            )}
            {twitter && (
              <a
                href={twitter}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Abrir X"
                className="transition-opacity hover:opacity-60"
              >
                <Image
                  src="/x.png"
                  alt=""
                  width={40}
                  height={40}
                  className="h-8 w-8 object-contain"
                />
              </a>
            )}
            {email && (
              <a
                href={`mailto:${email}`}
                aria-label="Enviar correo"
                className="transition-opacity hover:opacity-60"
              >
                <Image
                  src="/gmail.png"
                  alt=""
                  width={40}
                  height={40}
                  className="h-8 w-8 object-contain"
                />
              </a>
            )}
          </nav>
        </div>
      </footer>
    </main>
  );
}

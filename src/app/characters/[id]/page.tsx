import Link from "next/link";
import { notFound } from "next/navigation";
import { getCharacterById, toBirthYear } from "@/data/swapi";
import CharacterImage from "@/app/components/CharacterImage";

type CharacterDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function CharacterDetailPage({ params }: CharacterDetailPageProps) {
  const { id } = await params;
  const character = await getCharacterById(id);

  if (!character) {
    notFound();
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#05070d] px-4 py-10 text-[#f5d000] sm:px-6 sm:py-12 lg:px-10 lg:py-14">
      <div className="pointer-events-none absolute -left-20 top-16 h-64 w-64 rounded-full bg-[radial-gradient(circle,_rgba(0,132,255,0.45),_transparent_70%)]" />
      <div className="pointer-events-none absolute -right-24 bottom-12 h-72 w-72 rounded-full bg-[radial-gradient(circle,_rgba(255,36,36,0.45),_transparent_70%)]" />

      <section className="relative mx-auto flex w-full max-w-3xl flex-col gap-6 sm:gap-8">
        <div className="flex justify-start">
          <Link
            href="/"
            className="inline-flex w-full justify-center rounded-xl border border-[#1f8dff]/70 bg-transparent px-4 py-2 text-sm font-semibold uppercase tracking-[0.12em] text-[#dbeafe] transition hover:border-[#ff3b3b] hover:text-[#f5d000] sm:w-fit"
          >
            Volver al inicio
          </Link>
        </div>

        <header className="space-y-3 text-center sm:space-y-4">
          <h1 className="text-3xl font-extrabold uppercase tracking-[0.14em] text-[#f5d000] sm:text-4xl sm:tracking-[0.16em] md:text-5xl md:tracking-[0.18em]">
            {character.name}
          </h1>
        </header>

        <section className="mx-auto flex w-full max-w-md flex-col items-center justify-center">
          <CharacterImage
            src={character.image}
            alt={character.name}
            name={character.name}
            containerClassName="overflow-hidden rounded-2xl border border-[#1f8dff]/50 w-full aspect-square max-w-md flex items-center justify-center"
            imageClassName="h-full w-full object-contain object-top p-2 sm:object-cover sm:p-0"
            fallbackClassName="w-full h-full flex flex-col items-center justify-center gap-2 bg-gradient-to-b from-[#10213f] to-[#070d1f] text-[#94a3b8]"
            loading="eager"
          />
        </section>

        <article className="w-full min-w-0 rounded-3xl border border-[#f5d000]/45 bg-[#0a0f1c]/85 p-4 sm:p-6">
          <dl className="grid gap-x-6 gap-y-1 sm:grid-cols-2">
            <div className="border-b border-[#1f8dff]/25 py-2.5">
              <dt className="text-xs uppercase tracking-[0.12em] text-[#93c5fd]">ID</dt>
              <dd className="mt-1 text-base text-[#f8fafc]">{id}</dd>
            </div>
            <div className="border-b border-[#1f8dff]/25 py-2.5">
              <dt className="text-xs uppercase tracking-[0.12em] text-[#93c5fd]">Genero</dt>
              <dd className="mt-1 text-base text-[#f8fafc]">{character.gender ?? "unknown"}</dd>
            </div>
            <div className="border-b border-[#1f8dff]/25 py-2.5">
              <dt className="text-xs uppercase tracking-[0.12em] text-[#93c5fd]">Nacimiento</dt>
              <dd className="mt-1 text-base text-[#f8fafc]">{toBirthYear(character.born)}</dd>
            </div>
            <div className="border-b border-[#1f8dff]/25 py-2.5">
              <dt className="text-xs uppercase tracking-[0.12em] text-[#93c5fd]">Especie</dt>
              <dd className="mt-1 text-base text-[#f8fafc]">{character.species ?? "unknown"}</dd>
            </div>
            <div className="border-b border-[#1f8dff]/25 py-2.5">
              <dt className="text-xs uppercase tracking-[0.12em] text-[#93c5fd]">Planeta</dt>
              <dd className="mt-1 text-base text-[#f8fafc]">{character.homeworld ?? "unknown"}</dd>
            </div>
            <div className="border-b border-[#1f8dff]/25 py-2.5">
              <dt className="text-xs uppercase tracking-[0.12em] text-[#93c5fd]">Altura</dt>
              <dd className="mt-1 text-base text-[#f8fafc]">{typeof character.height === "number" ? `${character.height} cm` : "unknown"}</dd>
            </div>
            <div className="border-b border-[#1f8dff]/25 py-2.5">
              <dt className="text-xs uppercase tracking-[0.12em] text-[#93c5fd]">Peso</dt>
              <dd className="mt-1 text-base text-[#f8fafc]">{typeof character.mass === "number" ? `${character.mass} kg` : "unknown"}</dd>
            </div>
            <div className="border-b border-[#1f8dff]/25 py-2.5">
              <dt className="text-xs uppercase tracking-[0.12em] text-[#93c5fd]">Ojos</dt>
              <dd className="mt-1 text-base text-[#f8fafc]">{character.eyeColor ?? "unknown"}</dd>
            </div>
            <div className="border-b border-[#1f8dff]/25 py-2.5">
              <dt className="text-xs uppercase tracking-[0.12em] text-[#93c5fd]">Cabello</dt>
              <dd className="mt-1 text-base text-[#f8fafc]">{character.hairColor ?? "unknown"}</dd>
            </div>
            <div className="border-b border-[#1f8dff]/25 py-2.5">
              <dt className="text-xs uppercase tracking-[0.12em] text-[#93c5fd]">Afiliaciones</dt>
              <dd className="mt-1 text-base text-[#f8fafc]">{character.affiliations && character.affiliations.length > 0 ? character.affiliations.join(", ") : "unknown"}</dd>
            </div>
            <div className="border-b border-[#1f8dff]/25 py-2.5">
              <dt className="text-xs uppercase tracking-[0.12em] text-[#93c5fd]">Piel</dt>
              <dd className="mt-1 text-base text-[#f8fafc]">{character.skinColor ?? "unknown"}</dd>
            </div>
          </dl>
          {character.wiki && (
            <div className="mt-4 flex justify-center sm:justify-end">
              <a
                href={character.wiki}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#1f8dff] bg-[#0b1226] px-4 py-2 text-sm font-semibold uppercase tracking-[0.12em] text-[#dbeafe] shadow-[0_0_20px_rgba(31,141,255,0.35)] transition hover:border-[#ff3b3b] hover:bg-[#121a35] sm:w-auto"
              >
                Ver en Wiki
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75h-10.5m10.5 0v10.5m0-10.5L6.75 17.25" />
                </svg>
              </a>
            </div>
          )}
        </article>

        <div className="flex flex-col gap-3 pt-2 sm:flex-row">
          <Link
            href="/characters"
            className="inline-flex w-full justify-center rounded-xl border border-[#1f8dff] bg-[#0b1226] px-4 py-2 text-sm font-medium text-[#dbeafe] transition hover:border-[#ff3b3b] hover:bg-[#121a35] sm:w-fit"
          >
            Ver todos los personajes
          </Link>
          <Link
            href="/"
            className="inline-flex w-full justify-center rounded-xl bg-[#f5d000] px-4 py-2 text-sm font-medium text-[#05070d] transition hover:bg-[#ffe066] sm:w-fit"
          >
            Volver al inicio
          </Link>
        </div>
      </section>
    </main>
  );
}

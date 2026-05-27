import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getCharacterById, toBirthYear } from "@/data/swapi";

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
    <main className="relative min-h-screen overflow-hidden bg-[#05070d] px-6 py-14 text-[#f5d000] md:px-10">
      <div className="pointer-events-none absolute -left-20 top-16 h-64 w-64 rounded-full bg-[radial-gradient(circle,_rgba(0,132,255,0.45),_transparent_70%)]" />
      <div className="pointer-events-none absolute -right-24 bottom-12 h-72 w-72 rounded-full bg-[radial-gradient(circle,_rgba(255,36,36,0.45),_transparent_70%)]" />

      <section className="relative mx-auto flex w-full max-w-3xl flex-col gap-8">
        <header className="space-y-4 text-center">
          <p className="inline-flex rounded-full border border-[#f5d000]/70 bg-[#0a0d18] px-4 py-1 text-sm tracking-[0.2em] text-[#f5d000]">
            STAR WARS DATABASE
          </p>
          <h1 className="text-4xl font-extrabold uppercase tracking-[0.18em] text-[#f5d000] sm:text-5xl">
            {character.name}
          </h1>
        </header>

        {character.image ? (
          <section className="mx-auto flex w-full max-w-md flex-col items-center justify-center">
            <div className="overflow-hidden rounded-2xl border-4 border-[#1f8dff]/70 bg-[#0a0f1f] w-full aspect-square max-w-md flex items-center justify-center shadow-[0_0_28px_rgba(31,141,255,0.35)]">
              <Image
                src={character.image}
                alt={character.name}
                width={320}
                height={320}
                className="object-cover object-top w-full h-full"
                style={{ objectPosition: "top center" }}
                priority
              />
            </div>
          </section>
        ) : null}

        <article className="w-full min-w-0 rounded-3xl border border-[#f5d000]/60 bg-gradient-to-br from-[#090d19] via-[#070a13] to-[#101727] p-5 shadow-[0_0_35px_rgba(0,0,0,0.45)] sm:p-6">
          <dl className="grid gap-2.5 sm:grid-cols-2">
            <div className="rounded-xl border border-[#ff3b3b]/45 bg-[#0a1020] p-2.5">
              <p className="text-xs uppercase tracking-[0.12em] text-[#93c5fd]">ID</p>
              <p className="mt-1 text-base text-[#f8fafc]">{id}</p>
            </div>
            <div className="rounded-xl border border-[#ff3b3b]/45 bg-[#0a1020] p-2.5">
              <p className="text-xs uppercase tracking-[0.12em] text-[#93c5fd]">Genero</p>
              <p className="mt-1 text-base text-[#f8fafc]">{character.gender ?? "unknown"}</p>
            </div>
            <div className="rounded-xl border border-[#ff3b3b]/45 bg-[#0a1020] p-2.5">
              <p className="text-xs uppercase tracking-[0.12em] text-[#93c5fd]">Nacimiento</p>
              <p className="mt-1 text-base text-[#f8fafc]">{toBirthYear(character.born)}</p>
            </div>
            <div className="rounded-xl border border-[#ff3b3b]/45 bg-[#0a1020] p-2.5">
              <p className="text-xs uppercase tracking-[0.12em] text-[#93c5fd]">Especie</p>
              <p className="mt-1 text-base text-[#f8fafc]">{character.species ?? "unknown"}</p>
            </div>
            <div className="rounded-xl border border-[#ff3b3b]/45 bg-[#0a1020] p-2.5">
              <p className="text-xs uppercase tracking-[0.12em] text-[#93c5fd]">Planeta</p>
              <p className="mt-1 text-base text-[#f8fafc]">{character.homeworld ?? "unknown"}</p>
            </div>
            <div className="rounded-xl border border-[#ff3b3b]/45 bg-[#0a1020] p-2.5">
              <p className="text-xs uppercase tracking-[0.12em] text-[#93c5fd]">Altura</p>
              <p className="mt-1 text-base text-[#f8fafc]">{typeof character.height === "number" ? `${character.height} cm` : "unknown"}</p>
            </div>
            <div className="rounded-xl border border-[#ff3b3b]/45 bg-[#0a1020] p-2.5">
              <p className="text-xs uppercase tracking-[0.12em] text-[#93c5fd]">Peso</p>
              <p className="mt-1 text-base text-[#f8fafc]">{typeof character.mass === "number" ? `${character.mass} kg` : "unknown"}</p>
            </div>
            <div className="rounded-xl border border-[#ff3b3b]/45 bg-[#0a1020] p-2.5">
              <p className="text-xs uppercase tracking-[0.12em] text-[#93c5fd]">Ojos</p>
              <p className="mt-1 text-base text-[#f8fafc]">{character.eyeColor ?? "unknown"}</p>
            </div>
            <div className="rounded-xl border border-[#ff3b3b]/45 bg-[#0a1020] p-2.5">
              <p className="text-xs uppercase tracking-[0.12em] text-[#93c5fd]">Cabello</p>
              <p className="mt-1 text-base text-[#f8fafc]">{character.hairColor ?? "unknown"}</p>
            </div>
            <div className="rounded-xl border border-[#ff3b3b]/45 bg-[#0a1020] p-2.5">
              <p className="text-xs uppercase tracking-[0.12em] text-[#93c5fd]">Afiliaciones</p>
              <p className="mt-1 text-base text-[#f8fafc]">{character.affiliations && character.affiliations.length > 0 ? character.affiliations.join(", ") : "unknown"}</p>
            </div>
            <div className="rounded-xl border border-[#ff3b3b]/45 bg-[#0a1020] p-2.5">
              <p className="text-xs uppercase tracking-[0.12em] text-[#93c5fd]">Piel</p>
              <p className="mt-1 text-base text-[#f8fafc]">{character.skinColor ?? "unknown"}</p>
            </div>
          </dl>
          {character.wiki && (
            <div className="flex justify-end mt-4">
              <a
                href={character.wiki}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-[#1f8dff] bg-[#0b1226] px-4 py-2 text-sm font-semibold uppercase tracking-[0.12em] text-[#dbeafe] shadow-[0_0_20px_rgba(31,141,255,0.35)] transition hover:border-[#ff3b3b] hover:bg-[#121a35]"
              >
                Ver en Wiki
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75h-10.5m10.5 0v10.5m0-10.5L6.75 17.25" />
                </svg>
              </a>
            </div>
          )}
        </article>

        <div className="flex gap-3 pt-2">
          <Link
            href="/characters"
            className="inline-flex w-fit rounded-xl border border-[#1f8dff] bg-[#0b1226] px-4 py-2 text-sm font-medium text-[#dbeafe] transition hover:border-[#ff3b3b] hover:bg-[#121a35]"
          >
            Ver todos los personajes
          </Link>
          <Link
            href="/"
            className="inline-flex w-fit rounded-xl bg-[#f5d000] px-4 py-2 text-sm font-medium text-[#05070d] transition hover:bg-[#ffe066]"
          >
            Inicio
          </Link>
        </div>
      </section>
    </main>
  );
}

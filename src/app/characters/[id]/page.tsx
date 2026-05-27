import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getCharacterById, toBirthYear } from "@/data/swapi";

type CharacterDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function CharacterDetailPage({
  params,
}: CharacterDetailPageProps) {
  const { id } = await params;
  const character = await getCharacterById(id);

  if (!character) {
    notFound();
  }

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-6 px-6 py-16 md:px-10">
      <header className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm uppercase tracking-wide text-slate-500">Character</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight">{character.name}</h1>
      </header>

      {character.image ? (
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <Image
            src={character.image}
            alt={character.name}
            width={1200}
            height={800}
            className="h-64 w-full object-cover object-top"
          />
        </section>
      ) : null}

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <dl className="grid grid-cols-1 gap-4 text-slate-700 sm:grid-cols-2">
          <div>
            <dt className="text-sm text-slate-500">ID</dt>
            <dd className="font-medium">{id}</dd>
          </div>
          <div>
            <dt className="text-sm text-slate-500">Genero</dt>
              <dd className="font-medium">{character.gender ?? "unknown"}</dd>
          </div>
          <div>
            <dt className="text-sm text-slate-500">Nacimiento</dt>
              <dd className="font-medium">{toBirthYear(character.born)}</dd>
          </div>
          <div>
            <dt className="text-sm text-slate-500">Especie</dt>
              <dd className="font-medium">{character.species ?? "unknown"}</dd>
          </div>
          <div>
            <dt className="text-sm text-slate-500">Planeta</dt>
              <dd className="font-medium">{character.homeworld ?? "unknown"}</dd>
          </div>
          <div>
            <dt className="text-sm text-slate-500">Altura</dt>
              <dd className="font-medium">
                {typeof character.height === "number" ? `${character.height} m` : "unknown"}
              </dd>
          </div>
          <div>
            <dt className="text-sm text-slate-500">Peso</dt>
              <dd className="font-medium">
                {typeof character.mass === "number" ? `${character.mass} kg` : "unknown"}
              </dd>
          </div>
          <div>
            <dt className="text-sm text-slate-500">Color de ojos</dt>
              <dd className="font-medium">{character.eyeColor ?? "unknown"}</dd>
          </div>
          <div>
            <dt className="text-sm text-slate-500">Color de cabello</dt>
              <dd className="font-medium">{character.hairColor ?? "unknown"}</dd>
          </div>
          <div>
            <dt className="text-sm text-slate-500">Afiliaciones</dt>
              <dd className="font-medium">
                {character.affiliations && character.affiliations.length > 0
                  ? character.affiliations.join(", ")
                  : "unknown"}
              </dd>
          </div>
          <div>
            <dt className="text-sm text-slate-500">Color de piel</dt>
              <dd className="font-medium">{character.skinColor ?? "unknown"}</dd>
          </div>
        </dl>
      </section>

      <div className="flex gap-3">
        <Link
          href="/characters"
          className="inline-flex w-fit rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
        >
          Ver todos los personajes
        </Link>
        <Link
          href="/"
          className="inline-flex w-fit rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
        >
          Inicio
        </Link>
      </div>
    </main>
  );
}

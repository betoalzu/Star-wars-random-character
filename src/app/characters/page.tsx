import Link from "next/link";
import { getCharacters, toBirthYear } from "@/data/swapi";

export default async function CharactersPage() {
  const characters = await getCharacters();

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-8 px-6 py-16 md:px-10">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">Characters</h1>
        <p className="mt-2 text-slate-700">
          Listado consumido desde Star Wars API: https://akabab.github.io/starwars-api/api/all.json
        </p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {characters.map((character) => {
          return (
            <article
              key={character.id}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <h2 className="text-lg font-semibold text-slate-900">{character.name}</h2>
              <p className="mt-2 text-sm text-slate-700">Genero: {character.gender ?? "unknown"}</p>
              <p className="text-sm text-slate-700">Nacimiento: {toBirthYear(character.born)}</p>
              <p className="text-sm text-slate-700">Especie: {character.species ?? "unknown"}</p>

              <Link
                href={`/characters/${character.id}`}
                className="mt-4 inline-flex w-fit rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
              >
                Ver detalle
              </Link>
            </article>
          );
        })}
      </section>

      <Link
        href="/"
        className="inline-flex w-fit rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
      >
        Volver al inicio
      </Link>
    </main>
  );
}

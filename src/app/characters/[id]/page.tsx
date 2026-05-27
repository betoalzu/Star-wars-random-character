import Link from "next/link";
import { notFound } from "next/navigation";
import { getCharacterById } from "@/data/swapi";

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

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <dl className="grid grid-cols-1 gap-4 text-slate-700 sm:grid-cols-2">
          <div>
            <dt className="text-sm text-slate-500">ID</dt>
            <dd className="font-medium">{id}</dd>
          </div>
          <div>
            <dt className="text-sm text-slate-500">Genero</dt>
            <dd className="font-medium">{character.gender}</dd>
          </div>
          <div>
            <dt className="text-sm text-slate-500">Nacimiento</dt>
            <dd className="font-medium">{character.birth_year}</dd>
          </div>
          <div>
            <dt className="text-sm text-slate-500">Altura</dt>
            <dd className="font-medium">{character.height}</dd>
          </div>
          <div>
            <dt className="text-sm text-slate-500">Peso</dt>
            <dd className="font-medium">{character.mass}</dd>
          </div>
          <div>
            <dt className="text-sm text-slate-500">Color de ojos</dt>
            <dd className="font-medium">{character.eye_color}</dd>
          </div>
          <div>
            <dt className="text-sm text-slate-500">Color de cabello</dt>
            <dd className="font-medium">{character.hair_color}</dd>
          </div>
          <div>
            <dt className="text-sm text-slate-500">Films</dt>
            <dd className="font-medium">{character.films.length}</dd>
          </div>
          <div>
            <dt className="text-sm text-slate-500">Vehiculos</dt>
            <dd className="font-medium">{character.vehicles.length}</dd>
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

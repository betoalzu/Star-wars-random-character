import Link from "next/link";

export default function CharactersPage() {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-8 px-6 py-16 md:px-10">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">Characters</h1>
        <p className="mt-2 text-slate-700">
          Esta ruta ya no usa data local. Aqui puedes conectar tu API para
          listar personajes de forma real.
        </p>
      </header>

      <section className="rounded-2xl border border-dashed border-slate-300 bg-white p-6 text-slate-700 shadow-sm">
        <p>
          Ejemplo de endpoint esperado:
          <span className="ml-2 rounded bg-slate-100 px-2 py-1 font-mono text-sm text-slate-800">
            GET /api/characters
          </span>
        </p>
        <p className="mt-3">
          Mientras conectas la API, puedes probar la ruta dinamica directamente.
        </p>
        <Link
          href="/characters/demo-id"
          className="mt-4 inline-flex w-fit rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
        >
          Probar /characters/demo-id
        </Link>
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

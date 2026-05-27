import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-8 px-6 py-16 md:px-10">
      <header className="space-y-3">
        <p className="inline-flex rounded-full border border-cyan-700/30 bg-cyan-950/10 px-3 py-1 text-sm text-cyan-700">
          Next.js + TypeScript + Tailwind
        </p>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Enrutamiento con App Router listo para escalar
        </h1>
        <p className="max-w-2xl text-lg text-slate-700">
          Esta base incluye rutas estaticas y dinamicas para que puedas
          conectarlas a tu API cuando lo necesites.
        </p>
      </header>

      <section className="grid gap-4 sm:grid-cols-1">
        <Link
          href="/characters"
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
        >
          <h2 className="text-xl font-semibold">Characters</h2>
          <p className="mt-2 text-slate-600">
            Ruta de listado: /characters. Desde ahi navegas a /characters/[id]
            para el detalle.
          </p>
        </Link>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold">Mapa de rutas</h3>
        <pre className="mt-3 overflow-x-auto rounded-xl bg-slate-950 p-4 text-sm text-slate-100">
{`/
├─ /characters
│  └─ /characters/[id]
└─ /not-found`}
        </pre>
      </section>
    </main>
  );
}

import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col items-start gap-4 px-6 py-16 md:px-10">
      <p className="rounded-full border border-amber-300 bg-amber-50 px-3 py-1 text-sm text-amber-800">
        404
      </p>
      <h1 className="text-3xl font-bold tracking-tight">Ruta no encontrada</h1>
      <p className="text-slate-700">
        El recurso solicitado no existe o fue movido.
      </p>
      <Link
        href="/"
        className="inline-flex rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
      >
        Volver al inicio
      </Link>
    </main>
  );
}

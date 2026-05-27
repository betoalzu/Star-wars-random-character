export default function Footer() {
  return (
    <footer className="relative border-t border-[#1f8dff]/45 bg-gradient-to-b from-[#060a16] to-[#05070d] px-4 py-6 text-[#dbeafe] sm:px-6 lg:px-10">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#f5d000]/70 to-transparent" />

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <p className="text-xs uppercase tracking-[0.18em] text-[#93c5fd]">Proyecto fan de Star Wars</p>
          <p className="text-sm text-[#dbeafe]">
            Creado por{" "}
            <a
              href="https://github.com/betoalzu"
              target="_blank"
              rel="noreferrer"
              aria-label="Ir al perfil de GitHub de betoalzu"
              className="font-semibold text-[#f5d000] underline decoration-[#f5d000]/60 underline-offset-4 transition hover:text-[#fff19a]"
            >
              betoalzu
            </a>
          </p>
        </div>

        <a
          href="https://github.com/betoalzu/Star-wars-random-character"
          target="_blank"
          rel="noreferrer"
          aria-label="Ir al repositorio en GitHub"
          className="inline-flex items-center justify-center gap-2 self-start rounded-xl border border-[#1f8dff] bg-[#0b1226] px-4 py-2.5 text-sm font-semibold text-[#dbeafe] transition hover:border-[#f5d000] hover:bg-[#101a36] hover:text-[#f5d000] sm:self-auto"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-5 w-5"
            aria-hidden="true"
          >
            <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.866-.013-1.699-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.909-.62.069-.608.069-.608 1.004.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.091-.647.349-1.088.635-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.269 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.026 2.748-1.026.546 1.378.203 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.944.359.31.678.92.678 1.855 0 1.338-.012 2.419-.012 2.749 0 .268.18.58.688.481A10.018 10.018 0 0022 12.017C22 6.484 17.523 2 12 2z" />
          </svg>
          Ver repositorio
        </a>
      </div>
    </footer>
  );
}

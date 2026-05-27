
"use client";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { getCharacters } from "@/data/swapi";
import type { Character } from "@/data/swapi";

const PAGE_SIZE = 12;

export default function CharactersPage() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [search, setSearch] = useState("");
  const [species, setSpecies] = useState("");
  const [affiliation, setAffiliation] = useState("");
  const [page, setPage] = useState(1);

  const hasActiveFilters = search !== "" || species !== "" || affiliation !== "";

  const clearFilters = () => {
    setSearch("");
    setSpecies("");
    setAffiliation("");
    setPage(1);
  };

  const changePage = (nextPage: number) => {
    if (nextPage === page) {
      return;
    }

    setPage(nextPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    getCharacters().then(setCharacters);
  }, []);

  const speciesOptions = useMemo(() => {
    const set = new Set<string>();
    characters.forEach((c) => c.species && set.add(c.species));
    return Array.from(set).sort();
  }, [characters]);

  const affiliationOptions = useMemo(() => {
    const set = new Set<string>();
    characters.forEach((c) => {
      if (Array.isArray(c.affiliations)) {
        c.affiliations.forEach((a) => set.add(a));
      }
    });
    return Array.from(set).sort();
  }, [characters]);

  const filtered = useMemo(() => {
    return characters.filter((c) => {
      const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase());
      const matchesSpecies = !species || c.species === species;
      const matchesAffiliation = !affiliation || (c.affiliations && c.affiliations.includes(affiliation));
      return matchesSearch && matchesSpecies && matchesAffiliation;
    });
  }, [characters, search, species, affiliation]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  useEffect(() => { setPage(1); }, [search, species, affiliation]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#05070d] px-6 py-14 text-[#f5d000] md:px-10">
      <div className="pointer-events-none absolute -left-20 top-16 h-64 w-64 rounded-full bg-[radial-gradient(circle,_rgba(0,132,255,0.45),_transparent_70%)]" />
      <div className="pointer-events-none absolute -right-24 bottom-12 h-72 w-72 rounded-full bg-[radial-gradient(circle,_rgba(255,36,36,0.45),_transparent_70%)]" />

      <section className="relative mx-auto flex w-full max-w-6xl flex-col gap-8">
        <div className="flex justify-start">
          <Link
            href="/"
            className="inline-flex w-fit rounded-xl border-2 border-[#1f8dff] bg-[#0b1226] px-4 py-2 text-sm font-semibold uppercase tracking-wider text-[#dbeafe] shadow-[0_0_20px_rgba(31,141,255,0.15)] transition hover:border-[#ff3b3b] hover:bg-[#121a35] hover:text-[#f5d000]"
          >
            Volver al inicio
          </Link>
        </div>

        <header className="space-y-4 text-center">
          <p className="inline-flex rounded-full border border-[#f5d000]/70 bg-[#0a0d18] px-4 py-1 text-sm tracking-[0.2em] text-[#f5d000]">
            STAR WARS DATABASE
          </p>
          <h1 className="text-4xl font-extrabold uppercase tracking-[0.18em] text-[#f5d000] sm:text-5xl">
            Buscador de Personajes
          </h1>
          <p className="mx-auto max-w-2xl text-base text-[#e5e7eb] sm:text-lg">
            Filtra y explora personajes de la galaxia.
          </p>
        </header>

        {/* Barra de búsqueda y filtros */}
        <div className="flex flex-col items-center gap-4">
          <input
            type="text"
            placeholder="Buscar personaje..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-md rounded-xl border-2 border-[#1f8dff] bg-[#0b1226] px-4 py-2 text-lg text-[#dbeafe] shadow-[0_0_20px_rgba(31,141,255,0.15)] focus:border-[#f5d000] focus:outline-none"
          />
          <div className="flex flex-wrap gap-4 justify-center w-full">
            <select
              value={species}
              onChange={(e) => setSpecies(e.target.value)}
              className="rounded-xl border-2 border-[#1f8dff] bg-[#0b1226] px-4 py-2 text-base text-[#dbeafe] shadow-[0_0_20px_rgba(31,141,255,0.15)] focus:border-[#f5d000] focus:outline-none"
            >
              <option value="">Todas las especies</option>
              {speciesOptions.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <select
              value={affiliation}
              onChange={(e) => setAffiliation(e.target.value)}
              className="rounded-xl border-2 border-[#1f8dff] bg-[#0b1226] px-4 py-2 text-base text-[#dbeafe] shadow-[0_0_20px_rgba(31,141,255,0.15)] focus:border-[#f5d000] focus:outline-none"
            >
              <option value="">Todas las afiliaciones</option>
              {affiliationOptions.map((a) => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>
            <button
              type="button"
              onClick={clearFilters}
              disabled={!hasActiveFilters}
              className="rounded-xl border-2 border-[#ff3b3b] bg-[#2a1010] px-4 py-2 text-base font-semibold uppercase tracking-wider text-[#fecaca] transition hover:bg-[#3a1515] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Borrar filtros
            </button>
          </div>
        </div>

        {/* Resultados */}
        <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {paginated.map((character) => (
            <article
              key={character.id}
              className="character-reveal rounded-2xl border-2 border-[#1f8dff]/60 bg-gradient-to-br from-[#090d19] via-[#070a13] to-[#101727] p-3 shadow-[0_0_35px_rgba(0,0,0,0.45)] flex h-[430px] flex-col"
            >
              <div className="mb-3 h-[320px] overflow-hidden rounded-xl border border-[#f5d000]/50 bg-[#0a0f1f]">
                {character.image ? (
                  <img
                    src={character.image}
                    alt={character.name}
                    className="h-full w-full object-cover object-top"
                    loading="lazy"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-sm font-semibold uppercase tracking-wider text-[#94a3b8]">
                    Sin imagen
                  </div>
                )}
              </div>
              <h2 className="text-lg font-bold text-[#f5d000] text-center uppercase tracking-wide">{character.name}</h2>
              <Link
                href={`/characters/${character.id}`}
                className="mt-2 inline-flex w-full justify-center rounded-xl border-2 border-[#1f8dff] bg-[#0b1226] px-4 py-2 text-sm font-semibold uppercase tracking-wider text-[#dbeafe] shadow-[0_0_20px_rgba(31,141,255,0.15)] transition hover:border-[#ff3b3b] hover:bg-[#121a35] hover:text-[#f5d000]"
              >
                Ver detalle
              </Link>
            </article>
          ))}
        </section>

        {/* Paginación */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-4">
            <button
              onClick={() => changePage(Math.max(1, page - 1))}
              disabled={page === 1}
              className="px-3 py-1 rounded-lg border-2 border-[#f5d000] bg-[#0b1226] text-[#f5d000] font-semibold uppercase tracking-wider disabled:opacity-50"
            >
              Anterior
            </button>
            <span className="px-2 text-[#e5e7eb]">Página {page} de {totalPages}</span>
            <button
              onClick={() => changePage(Math.min(totalPages, page + 1))}
              disabled={page === totalPages}
              className="px-3 py-1 rounded-lg border-2 border-[#f5d000] bg-[#0b1226] text-[#f5d000] font-semibold uppercase tracking-wider disabled:opacity-50"
            >
              Siguiente
            </button>
          </div>
        )}
      </section>
    </main>
  );
}

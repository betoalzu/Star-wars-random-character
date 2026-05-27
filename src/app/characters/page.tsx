
"use client";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { getCharacters } from "@/data/swapi";
import type { Character } from "@/data/swapi";
import CharacterImage from "@/app/components/CharacterImage";

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

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#05070d] px-4 py-10 text-[#f5d000] sm:px-6 sm:py-12 lg:px-10 lg:py-14">
      <div className="pointer-events-none absolute -left-20 top-16 h-64 w-64 rounded-full bg-[radial-gradient(circle,_rgba(0,132,255,0.45),_transparent_70%)]" />
      <div className="pointer-events-none absolute -right-24 bottom-12 h-72 w-72 rounded-full bg-[radial-gradient(circle,_rgba(255,36,36,0.45),_transparent_70%)]" />

      <section className="relative mx-auto flex w-full max-w-6xl flex-col gap-6 sm:gap-8">
        <div className="flex justify-start">
          <Link
            href="/"
            className="inline-flex w-full justify-center rounded-xl border-2 border-[#1f8dff] bg-[#0b1226] px-4 py-2 text-sm font-semibold uppercase tracking-wider text-[#dbeafe] shadow-[0_0_20px_rgba(31,141,255,0.15)] transition hover:border-[#ff3b3b] hover:bg-[#121a35] hover:text-[#f5d000] sm:w-fit"
          >
            Volver al inicio
          </Link>
        </div>

        <header className="space-y-3 text-center sm:space-y-4">
          <h1 className="text-3xl font-extrabold uppercase tracking-[0.14em] text-[#f5d000] sm:text-4xl sm:tracking-[0.16em] md:text-5xl md:tracking-[0.18em]">
            Buscador de Personajes
          </h1>
          <p className="mx-auto max-w-2xl text-sm text-[#e5e7eb] sm:text-base md:text-lg">
            Filtra y explora personajes de la galaxia.
          </p>
        </header>

        <div className="flex flex-col items-center gap-4">
          <input
            type="text"
            placeholder="Buscar personaje..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full max-w-md rounded-xl border border-[#1f8dff]/70 bg-[#0b1226]/70 px-4 py-2 text-base text-[#dbeafe] focus:border-[#f5d000] focus:outline-none sm:text-lg"
          />
          <div className="flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-4">
            <select
              value={species}
              onChange={(e) => {
                setSpecies(e.target.value);
                setPage(1);
              }}
              className="w-full rounded-xl border border-[#1f8dff]/70 bg-[#0b1226]/70 px-4 py-2 text-base text-[#dbeafe] focus:border-[#f5d000] focus:outline-none sm:w-auto"
            >
              <option value="">Todas las especies</option>
              {speciesOptions.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <select
              value={affiliation}
              onChange={(e) => {
                setAffiliation(e.target.value);
                setPage(1);
              }}
              className="w-full rounded-xl border border-[#1f8dff]/70 bg-[#0b1226]/70 px-4 py-2 text-base text-[#dbeafe] focus:border-[#f5d000] focus:outline-none sm:w-auto"
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
              className="w-full rounded-xl border border-[#ff3b3b]/70 bg-[#2a1010]/70 px-4 py-2 text-base font-semibold uppercase tracking-wider text-[#fecaca] transition hover:bg-[#3a1515] disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
            >
              Borrar filtros
            </button>
          </div>
        </div>

        <section className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {paginated.map((character) => (
            <article
              key={character.id}
              className="character-reveal flex h-[390px] flex-col rounded-2xl border border-[#1f8dff]/45 bg-[#0a0f1c]/85 p-3 sm:h-[430px]"
            >
              <CharacterImage
                src={character.image}
                alt={character.name}
                name={character.name}
                containerClassName="mb-3 h-[280px] overflow-hidden rounded-xl sm:h-[320px]"
                imageClassName="h-full w-full object-contain object-top p-2 sm:object-cover sm:p-0"
                fallbackClassName="flex h-full flex-col items-center justify-center gap-2 bg-gradient-to-b from-[#10213f] to-[#070d1f] text-[#94a3b8]"
              />
              <h2 className="text-lg font-bold text-[#f5d000] text-center uppercase tracking-wide">{character.name}</h2>
              <Link
                href={`/characters/${character.id}`}
                className="mt-2 inline-flex self-center border-b border-[#1f8dff]/60 px-1 py-1 text-sm font-semibold uppercase tracking-wider text-[#dbeafe] transition hover:border-[#ff3b3b] hover:text-[#f5d000]"
              >
                Ver detalle
              </Link>
            </article>
          ))}
        </section>

        {totalPages > 1 && (
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={() => changePage(Math.max(1, page - 1))}
              disabled={page === 1}
              className="cursor-pointer rounded-lg border-2 border-[#f5d000] bg-[#0b1226] px-3 py-1 font-semibold uppercase tracking-wider text-[#f5d000] transition duration-200 ease-out hover:-translate-y-0.5 hover:bg-[#121a35] hover:shadow-[0_8px_18px_rgba(245,208,0,0.25)] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:bg-[#0b1226] disabled:hover:shadow-none"
            >
              Anterior
            </button>
            <span className="px-2 text-[#e5e7eb]">Página {page} de {totalPages}</span>
            <button
              onClick={() => changePage(Math.min(totalPages, page + 1))}
              disabled={page === totalPages}
              className="cursor-pointer rounded-lg border-2 border-[#f5d000] bg-[#0b1226] px-3 py-1 font-semibold uppercase tracking-wider text-[#f5d000] transition duration-200 ease-out hover:-translate-y-0.5 hover:bg-[#121a35] hover:shadow-[0_8px_18px_rgba(245,208,0,0.25)] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:bg-[#0b1226] disabled:hover:shadow-none"
            >
              Siguiente
            </button>
          </div>
        )}
      </section>
    </main>
  );
}

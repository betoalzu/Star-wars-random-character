"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { Character } from "@/data/swapi";
import CharacterImage from "./components/CharacterImage";

const STAR_WARS_API_URL = "https://akabab.github.io/starwars-api/api/all.json";

function toBirthYear(value?: number): string {
  if (typeof value !== "number") {
    return "unknown";
  }

  if (value < 0) {
    return `${Math.abs(value)} BBY`;
  }

  return `${value} ABY`;
}

function getRandomCharacter(characters: Character[]): Character | null {
  if (characters.length === 0) {
    return null;
  }

  const randomIndex = Math.floor(Math.random() * characters.length);
  return characters[randomIndex] ?? null;
}

export default function Home() {
  const router = useRouter();
  const [characters, setCharacters] = useState<Character[]>([]);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadCharacters() {
      setIsLoading(true);
      setErrorMessage(null);

      try {
        const response = await fetch(STAR_WARS_API_URL);

        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = (await response.json()) as Character[];

        if (!cancelled) {
          setCharacters(data);
          setSelectedCharacter(getRandomCharacter(data));
        }
      } catch {
        if (!cancelled) {
          setErrorMessage("No se pudieron cargar los personajes de Star Wars.");
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    loadCharacters();

    return () => {
      cancelled = true;
    };
  }, []);

  const handleGenerateCharacter = () => {
    setSelectedCharacter(getRandomCharacter(characters));
  };

  const characterStats = useMemo(() => {
    if (!selectedCharacter) {
      return [];
    }

    return [
      { label: "Genero", value: selectedCharacter.gender ?? "unknown" },
      { label: "Especie", value: selectedCharacter.species ?? "unknown" },
      {
        label: "Afiliaciones",
        value:
          selectedCharacter.affiliations && selectedCharacter.affiliations.length > 0
            ? selectedCharacter.affiliations.join(", ")
            : "unknown",
      },
      { label: "Planeta", value: selectedCharacter.homeworld ?? "unknown" },
      { label: "Altura", value: selectedCharacter.height ? `${selectedCharacter.height} cm` : "unknown" },
      { label: "Peso", value: selectedCharacter.mass ? `${selectedCharacter.mass} kg` : "unknown" },
      { label: "Ojos", value: selectedCharacter.eyeColor ?? "unknown" },
      { label: "Cabello", value: selectedCharacter.hairColor ?? "unknown" },
      { label: "Piel", value: selectedCharacter.skinColor ?? "unknown" },
      { label: "Nacimiento", value: toBirthYear(selectedCharacter.born) },
    ];
  }, [selectedCharacter]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#05070d] px-4 py-10 text-[#f5d000] sm:px-6 sm:py-12 lg:px-10 lg:py-14">
      <div className="pointer-events-none absolute -left-20 top-16 h-64 w-64 rounded-full bg-[radial-gradient(circle,_rgba(0,132,255,0.45),_transparent_70%)]" />
      <div className="pointer-events-none absolute -right-24 bottom-12 h-72 w-72 rounded-full bg-[radial-gradient(circle,_rgba(255,36,36,0.45),_transparent_70%)]" />

      <section className="relative mx-auto flex w-full max-w-6xl flex-col gap-6 sm:gap-8">
        <header className="space-y-3 text-center sm:space-y-4">
          <p className="inline-flex rounded-full border border-[#f5d000]/70 bg-[#0a0d18] px-3 py-1 text-xs tracking-[0.2em] text-[#f5d000] sm:px-4 sm:text-sm">
            STAR WARS DATABASE
          </p>
          <h1 className="text-3xl font-extrabold uppercase tracking-[0.14em] text-[#f5d000] sm:text-4xl sm:tracking-[0.16em] md:text-5xl md:tracking-[0.18em]">
            Generador Aleatorio de Personajes
          </h1>
          <p className="mx-auto max-w-2xl text-sm text-[#e5e7eb] sm:text-base md:text-lg">
            Presiona el boton para revelar un personaje al azar de la galaxia.
          </p>
        </header>

        <div className="w-full min-w-0 space-y-4">
          <div className="rounded-2xl border border-[#1f2937]/90 bg-[#05070d]/90 p-2.5 sm:p-3">
            <button
              type="button"
              onClick={() => router.push("/characters")}
              className="w-full rounded-2xl border border-[#1f8dff] bg-[#0b1226] px-4 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-[#dbeafe] shadow-[0_0_20px_rgba(31,141,255,0.35)] transition hover:border-[#ff3b3b] hover:bg-[#121a35] hover:shadow-[0_0_28px_rgba(31,141,255,0.55)] disabled:cursor-not-allowed disabled:opacity-55 sm:px-6 sm:text-base"
            >
              Buscar Personaje Manualmente
            </button>
          </div>

          <div className="flex flex-col items-center gap-3 pt-1">
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-[#cbd5e1]">o</span>
            <button
              type="button"
              onClick={handleGenerateCharacter}
              disabled={isLoading || characters.length === 0}
              className="w-full rounded-2xl border-2 border-[#f5d000] bg-[#090b14] px-4 py-3 text-base font-bold uppercase tracking-[0.14em] text-[#f5d000] shadow-[0_0_20px_rgba(245,208,0,0.35)] transition hover:scale-[1.02] hover:shadow-[0_0_28px_rgba(245,208,0,0.55)] disabled:cursor-not-allowed disabled:opacity-55 sm:px-6 sm:py-4 sm:text-lg"
            >
              Generar Personaje
            </button>
          </div>

          <article className="w-full min-w-0 rounded-3xl border border-[#f5d000]/60 bg-gradient-to-br from-[#090d19] via-[#070a13] to-[#101727] p-4 shadow-[0_0_35px_rgba(0,0,0,0.45)] sm:p-6">
          {isLoading ? (
            <p className="text-center text-lg text-[#f8fafc]">Cargando personajes...</p>
          ) : null}

          {!isLoading && errorMessage ? (
            <p className="text-center text-lg text-[#fca5a5]">{errorMessage}</p>
          ) : null}

          {!isLoading && !errorMessage && !selectedCharacter ? (
            <p className="text-center text-lg text-[#f8fafc]">
              No hay personaje disponible en este momento.
            </p>
          ) : null}

          {!isLoading && !errorMessage && selectedCharacter ? (
            <div
              key={selectedCharacter.id}
              className="character-reveal grid items-start gap-5 md:grid-cols-[190px_1fr]"
            >
              <CharacterImage
                src={selectedCharacter.image}
                alt={selectedCharacter.name}
                name={selectedCharacter.name}
                containerClassName="overflow-hidden rounded-2xl border border-[#1f8dff]/70 bg-[#0a0f1f]"
                imageClassName="block h-56 w-full object-contain object-top p-2 sm:h-64 sm:object-cover sm:p-0 md:h-72"
                fallbackClassName="flex h-56 flex-col items-center justify-center gap-2 bg-gradient-to-b from-[#10213f] to-[#070d1f] text-[#94a3b8] sm:h-64 md:h-72"
              />

              <div>
                <h2 className="mb-3 text-center text-2xl font-bold text-[#f5d000] sm:text-left sm:text-3xl">{selectedCharacter.name}</h2>
                <div className="grid gap-2.5 sm:grid-cols-2">
                  {characterStats.map((item) => (
                    <div
                      key={item.label}
                      className="rounded-xl border border-[#ff3b3b]/45 bg-[#0a1020] p-2.5"
                    >
                      <p className="text-xs uppercase tracking-[0.12em] text-[#93c5fd]">{item.label}</p>
                      <p className="mt-1 text-base text-[#f8fafc]">{item.value}</p>
                    </div>
                  ))}
                </div>
                {selectedCharacter?.wiki && (
                  <div className="mt-4 flex justify-center sm:justify-end">
                    <a
                      href={selectedCharacter.wiki}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#1f8dff] bg-[#0b1226] px-4 py-2 text-sm font-semibold uppercase tracking-[0.12em] text-[#dbeafe] shadow-[0_0_20px_rgba(31,141,255,0.35)] transition hover:border-[#ff3b3b] hover:bg-[#121a35] sm:w-auto"
                    >
                      Ver en Wiki
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75h-10.5m10.5 0v10.5m0-10.5L6.75 17.25" />
                      </svg>
                    </a>
                  </div>
                )}
              </div>
            </div>
          ) : null}
            </article>
        </div>
      </section>

    </main>
  );
}

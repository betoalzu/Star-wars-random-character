const SWAPI_BASE_URL = "https://swapi.info/api";

export type SwapiCharacter = {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string;
  url: string;
};

function buildUrl(path: string) {
  return `${SWAPI_BASE_URL}${path}`;
}

async function swapiFetch<T>(path: string): Promise<T> {
  const response = await fetch(buildUrl(path), {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error(`SWAPI request failed: ${response.status} ${response.statusText}`);
  }

  return (await response.json()) as T;
}

export function getCharacterIdFromUrl(url: string): string | null {
  const match = url.match(/\/people\/(\d+)$/);
  return match?.[1] ?? null;
}

export async function getCharacters(): Promise<SwapiCharacter[]> {
  return swapiFetch<SwapiCharacter[]>("/people");
}

export async function getCharacterById(id: string): Promise<SwapiCharacter | null> {
  const response = await fetch(buildUrl(`/people/${id}`), {
    next: { revalidate: 3600 },
  });

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(`SWAPI request failed: ${response.status} ${response.statusText}`);
  }

  return (await response.json()) as SwapiCharacter;
}
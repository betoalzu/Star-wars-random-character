const STAR_WARS_API_URL = "https://akabab.github.io/starwars-api/api/all.json";

export type Character = {
  id: number;
  name: string;
  height?: number;
  mass?: number;
  hairColor?: string;
  skinColor?: string;
  eyeColor?: string;
  born?: number;
  gender?: string;
  homeworld?: string;
  species?: string;
  image?: string;
  affiliations?: string[];
  wiki?: string;
};

export function toBirthYear(value?: number): string {
  if (typeof value !== "number") {
    return "unknown";
  }

  if (value < 0) {
    return `${Math.abs(value)} BBY`;
  }

  return `${value} ABY`;
}

async function starWarsFetch(): Promise<Character[]> {
  const response = await fetch(STAR_WARS_API_URL, {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error(`Star Wars API request failed: ${response.status} ${response.statusText}`);
  }

  return (await response.json()) as Character[];
}

export async function getCharacters(): Promise<Character[]> {
  return starWarsFetch();
}

export async function getCharacterById(id: string): Promise<Character | null> {
  const parsedId = Number.parseInt(id, 10);

  if (Number.isNaN(parsedId)) {
    return null;
  }

  const characters = await starWarsFetch();
  const character = characters.find((item) => item.id === parsedId);

  return character ?? null;
}
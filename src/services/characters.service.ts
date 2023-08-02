const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface Location {
  name: string;
}

export interface Character {
  id: number;
  name: string;
  gender: string;
  origin: Location
  image: string;
}

export interface CharacterResponse {
  info: {
    count: number;
    pages: number;
    next: string;
    prev: string;
  };
  results: Character[];
}

export async function getCharacters(page: number = 1): Promise<CharacterResponse> {
  const response = await fetch(`${API_URL}/characters?page=${page}`);
  const data = await response.json();
  return data;
}
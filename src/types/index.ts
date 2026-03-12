export interface Movie {
  filmId?: number;
  kinopoiskId?: number;
  nameRu?: string;
  nameEn?: string;
  year: number;
  posterUrl?: string;
  posterUrlPreview?: string;
  rating?: number | { kinopoisk?: number; imdb?: number };
  genres?: Array<{ genre: string }>;
}

export interface AuthState {
  isAuthenticated: boolean;
  error: string | null;
}

export interface LoginFormData {
  username: string;
  password: string;
}
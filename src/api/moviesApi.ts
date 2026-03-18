import { Movie } from '../types';

const API_KEY = 'a413fb35-0c16-4cbe-84a3-1ce93aa5b5ce'; // Замените на свой API ключ
const BASE_URL = 'https://kinopoiskapiunofficial.tech/api';

export const getPopularMovies = async (): Promise<Movie[]> => {
  try {
    const response = await fetch(`${BASE_URL}/v2.2/films/top`, {
      headers: {
        'X-API-KEY': API_KEY,
        'Content-Type': 'application/json',
      }
    });
    
    if (!response.ok) {
      throw new Error(`Ошибка: ${response.status}`);
    }
    
    const data = await response.json();
    return data.films || [];
  } catch (error) {
    console.error('Ошибка загрузки:', error);
    throw error;
  }
};

export const searchMovies = async (query: string): Promise<Movie[]> => {
  try {
    const response = await fetch(
      `${BASE_URL}/v2.1/films/search-by-keyword?keyword=${encodeURIComponent(query)}`,
      {
        headers: {
          'X-API-KEY': API_KEY,
          'Content-Type': 'application/json',
        }
      }
    );
    
    if (!response.ok) {
      throw new Error(`Ошибка: ${response.status}`);
    }
    
    const data = await response.json();
    return data.films || [];
  } catch (error) {
    console.error('Ошибка поиска:', error);
    throw error;
  }
};

export const getMoviesByGenre = async (genreId: number): Promise<Movie[]> => {
  try {
    const response = await fetch(
      `${BASE_URL}/v2.2/films?genres=${genreId}`,
      {
        headers: {
          'X-API-KEY': API_KEY,
          'Content-Type': 'application/json',
        }
      }
    );
    
    if (!response.ok) {
      throw new Error(`Ошибка: ${response.status}`);
    }
    
    const data = await response.json();
    return data.items || [];
  } catch (error) {
    console.error('Ошибка загрузки по жанру:', error);
    throw error;
  }
};
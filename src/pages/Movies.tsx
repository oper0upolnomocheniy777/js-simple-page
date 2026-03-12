import React, { useState, useEffect } from 'react';
import { getPopularMovies, searchMovies } from '../api/moviesApi';
import { Movie } from '../types';
import './Movies.scss';

const Movies: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    loadPopularMovies();
  }, []);

  const loadPopularMovies = async (): Promise<void> => {
    try {
      setLoading(true);
      const data = await getPopularMovies();
      setMovies(data);
      setError(null);
    } catch (err) {
      setError('Не удалось загрузить фильмы. Проверь API ключ.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      loadPopularMovies();
      return;
    }

    try {
      setLoading(true);
      const data = await searchMovies(searchQuery);
      setMovies(data);
      setError(null);
    } catch (err) {
      setError('Ошибка при поиске');
    } finally {
      setLoading(false);
    }
  };

  const getPosterUrl = (posterUrl?: string): string => {
    if (!posterUrl) return 'https://via.placeholder.com/300x450?text=Нет+постера';
    return posterUrl.startsWith('http') ? posterUrl : `https:${posterUrl}`;
  };

  if (loading) {
    return <div className="loading">Загрузка фильмов...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="movies-page">
      <h1 id="movies-main-title">Популярные фильмы</h1>
      
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Поиск фильмов..."
          value={searchQuery}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="search-btn">
          Поиск
        </button>
      </form>

      {movies.length === 0 ? (
        <p className="no-results">Фильмы не найдены</p>
      ) : (
        <div className="movies-grid">
          {movies.map(movie => (
            <div key={movie.filmId || movie.kinopoiskId} className="movie-card">
              <img
                src={getPosterUrl(movie.posterUrl || movie.posterUrlPreview)}
                alt={movie.nameRu || movie.nameEn || 'Постер фильма'}
                className="movie-poster"
                onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = 'https://via.placeholder.com/300x450?text=Ошибка+загрузки';
                }}
              />
              <div className="movie-info">
                <h3 className="movie-title">{movie.nameRu || movie.nameEn || 'Без названия'}</h3>
                <p className="movie-year">{movie.year || 'Год не указан'}</p>
                {movie.rating && (
                  <p className="movie-rating">
                    ⭐ {typeof movie.rating === 'object' ? movie.rating.kinopoisk || movie.rating.imdb : movie.rating}
                  </p>
                )}
                {movie.genres && (
                  <p className="movie-genres">
                    {movie.genres.map(g => g.genre).join(', ')}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Movies;
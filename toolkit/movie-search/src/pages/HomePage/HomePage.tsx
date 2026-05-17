import React, { useState, useEffect, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { searchMoviesAsync, setSearchTerm, clearError } from '../../features/movies/moviesSlice';
import MovieCard from '../../components/MovieCard/MovieCard';
import SkeletonCard from '../../components/Skeleton/SkeletonCard';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { debounce } from '../../utils/debounce';
import styles from './HomePage.module.css';

const HomePage: React.FC = () => {
    const dispatch = useAppDispatch();
    const { searchResults, loading, error, searchTerm } = useAppSelector((state) => state.movies);
    const [inputValue, setInputValue] = useState(searchTerm);

    const performSearch = useCallback(
        (term: string) => {
            if (term.trim()) {
                dispatch(searchMoviesAsync(term));
            }
        },
        [dispatch]
    );

    const debouncedSearch = useCallback(
        debounce((term: string) => performSearch(term), 500),
        [performSearch]
    );

    useEffect(() => {
        if (searchTerm) {
            setInputValue(searchTerm);
            performSearch(searchTerm);
        }
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputValue(value);
        dispatch(setSearchTerm(value));

        if (value.trim()) {
            debouncedSearch(value);
        }
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (inputValue.trim()) {
            performSearch(inputValue);
        }
    };

    const handleRetry = () => {
        dispatch(clearError());
        if (searchTerm) {
            performSearch(searchTerm);
        }
    };

    return (
        <div className={styles.homePage}>
            <div className={styles.hero}>
                <h1 className={styles.title}>Movie Search</h1>
                <form onSubmit={handleSearch} className={styles.searchForm}>
                    <input
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                        placeholder="Search for movies..."
                        className={styles.searchInput}
                    />
                    <button type="submit" className={styles.searchBtn}>
                        Search
                    </button>
                </form>
            </div>

            <div className={styles.results}>
                {error && <ErrorMessage message={error} onRetry={handleRetry} />}

                {loading && searchResults.length === 0 && (
                    <div className={styles.skeletonGrid}>
                        {[...Array(8)].map((_, i) => (
                            <SkeletonCard key={i} />
                        ))}
                    </div>
                )}

                {!loading && !error && searchResults.length > 0 && (
                    <>
                        <div className={styles.resultsInfo}>
                            Found {searchResults.length} movies
                        </div>
                        <div className={styles.moviesGrid}>
                            {searchResults.map((movie) => (
                                <MovieCard key={movie.imdbID} movie={movie} />
                            ))}
                        </div>
                    </>
                )}

                {!loading && !error && searchTerm && searchResults.length === 0 && (
                    <div className={styles.noResults}>
                        <p>No movies found for "{searchTerm}"</p>
                        <p>Try searching with different keywords</p>
                    </div>
                )}

                {!loading && !error && !searchTerm && (
                    <div className={styles.welcome}>
                        <p>Start searching for your favorite movies!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HomePage;
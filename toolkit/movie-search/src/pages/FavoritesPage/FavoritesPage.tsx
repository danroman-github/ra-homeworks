import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { clearFavorites } from '../../features/favorites/favoritesSlice';
import MovieCard from '../../components/MovieCard/MovieCard';
import styles from './FavoritesPage.module.css';

const FavoritesPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const favorites = useAppSelector((state) => state.favorites.items);

    const handleClearAll = () => {
        if (window.confirm('Are you sure you want to remove all movies from favorites?')) {
            dispatch(clearFavorites());
        }
    };

    return (
        <div className={styles.favoritesPage}>
            <div className={styles.header}>
                <h1 className={styles.title}>My Favorite Movies</h1>
                {favorites.length > 0 && (
                    <button onClick={handleClearAll} className={styles.clearBtn}>
                        Clear All
                    </button>
                )}
            </div>

            {favorites.length === 0 ? (
                <div className={styles.emptyState}>
                    <div className={styles.emptyIcon}>🎬</div>
                    <p className={styles.emptyText}>No favorite movies yet</p>
                    <p className={styles.emptySubtext}>Start adding movies to your favorites!</p>
                </div>
            ) : (
                <>
                    <div className={styles.stats}>
                        You have {favorites.length} movie{favorites.length !== 1 ? 's' : ''} in your favorites
                    </div>
                    <div className={styles.moviesGrid}>
                        {favorites.map((movie) => (
                            <MovieCard key={movie.imdbID} movie={movie} />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default FavoritesPage;
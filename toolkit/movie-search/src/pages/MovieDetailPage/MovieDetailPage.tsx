import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getMovieDetailsAsync, clearError } from '../../features/movies/moviesSlice';
import { addToFavorites, removeFromFavorites } from '../../features/favorites/favoritesSlice';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import styles from './MovieDetailPage.module.css';

const MovieDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { selectedMovie, loading, error } = useAppSelector((state) => state.movies);
    const favorites = useAppSelector((state) => state.favorites.items);

    useEffect(() => {
        if (id) {
            dispatch(getMovieDetailsAsync(id));
        }
    }, [dispatch, id]);

    const isFavorite = selectedMovie ? favorites.some(fav => fav.imdbID === selectedMovie.imdbID) : false;

    const handleFavoriteToggle = () => {
        if (!selectedMovie) return;

        if (isFavorite) {
            dispatch(removeFromFavorites(selectedMovie.imdbID));
        } else {
            dispatch(addToFavorites(selectedMovie));
        }
    };

    const handleRetry = () => {
        dispatch(clearError());
        if (id) {
            dispatch(getMovieDetailsAsync(id));
        }
    };

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return <ErrorMessage message={error} onRetry={handleRetry} />;
    }

    if (!selectedMovie) {
        return null;
    }

    return (
        <div className={styles.detailPage}>
            <button onClick={() => navigate(-1)} className={styles.backBtn}>
                ← Back
            </button>

            <div className={styles.movieContainer}>
                <div className={styles.posterSection}>
                    {selectedMovie.Poster !== 'N/A' ? (
                        <img src={selectedMovie.Poster} alt={selectedMovie.Title} className={styles.poster} />
                    ) : (
                        <div className={styles.noPoster}>No Poster Available</div>
                    )}
                </div>

                <div className={styles.infoSection}>
                    <div className={styles.header}>
                        <h1 className={styles.title}>{selectedMovie.Title}</h1>
                        <button
                            className={`${styles.favoriteBtn} ${isFavorite ? styles.active : ''}`}
                            onClick={handleFavoriteToggle}
                        >
                            {isFavorite ? '❤️ Remove from Favorites' : '🤍 Add to Favorites'}
                        </button>
                    </div>

                    <div className={styles.metaInfo}>
                        <span className={styles.year}>{selectedMovie.Year}</span>
                        <span className={styles.rated}>{selectedMovie.Rated}</span>
                        <span className={styles.runtime}>{selectedMovie.Runtime}</span>
                        <span className={styles.genre}>{selectedMovie.Genre}</span>
                    </div>

                    <div className={styles.rating}>
                        <strong>IMDb Rating:</strong> {selectedMovie.imdbRating}/10 ({selectedMovie.imdbVotes} votes)
                    </div>

                    <div className={styles.plot}>
                        <h3>Plot</h3>
                        <p>{selectedMovie.Plot}</p>
                    </div>

                    <div className={styles.details}>
                        <div className={styles.detailItem}>
                            <strong>Director:</strong> {selectedMovie.Director}
                        </div>
                        <div className={styles.detailItem}>
                            <strong>Writer:</strong> {selectedMovie.Writer}
                        </div>
                        <div className={styles.detailItem}>
                            <strong>Actors:</strong> {selectedMovie.Actors}
                        </div>
                        <div className={styles.detailItem}>
                            <strong>Released:</strong> {selectedMovie.Released}
                        </div>
                        <div className={styles.detailItem}>
                            <strong>Language:</strong> {selectedMovie.Language}
                        </div>
                        <div className={styles.detailItem}>
                            <strong>Country:</strong> {selectedMovie.Country}
                        </div>
                        <div className={styles.detailItem}>
                            <strong>Awards:</strong> {selectedMovie.Awards}
                        </div>
                        {selectedMovie.BoxOffice !== 'N/A' && (
                            <div className={styles.detailItem}>
                                <strong>Box Office:</strong> {selectedMovie.BoxOffice}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieDetailPage;
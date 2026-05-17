import React from 'react';
import { useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addToFavorites, removeFromFavorites } from '../../features/favorites/favoritesSlice';
import { MovieSearchResult } from '../../types/types';
import styles from './MovieCard.module.css';

interface MovieCardProps {
    movie: MovieSearchResult;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const favorites = useAppSelector((state) => state.favorites.items);

    const isFavorite = favorites.some(fav => fav.imdbID === movie.imdbID);

    const handleCardClick = () => {
        navigate(`/movie/${movie.imdbID}`);
    };

    const handleFavoriteClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (isFavorite) {
            dispatch(removeFromFavorites(movie.imdbID));
        } else {
            dispatch(addToFavorites(movie));
        }
    };

    return (
        <div className={styles.card} onClick={handleCardClick}>
            <div className={styles.posterContainer}>
                {movie.Poster !== 'N/A' ? (
                    <img src={movie.Poster} alt={movie.Title} className={styles.poster} />
                ) : (
                    <div className={styles.noPoster}>No Poster</div>
                )}
                <button
                    className={`${styles.favoriteBtn} ${isFavorite ? styles.active : ''}`}
                    onClick={handleFavoriteClick}
                    aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                >
                    {isFavorite ? '❤️' : '🤍'}
                </button>
            </div>
            <div className={styles.info}>
                <h3 className={styles.title}>{movie.Title}</h3>
                <div className={styles.details}>
                    <span className={styles.year}>{movie.Year}</span>
                    <span className={styles.type}>{movie.Type}</span>
                </div>
            </div>
        </div>
    );
};

export default MovieCard;
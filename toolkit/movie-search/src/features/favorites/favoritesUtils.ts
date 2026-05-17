import { MovieSearchResult } from '../../types/types';

export const loadFavoritesFromStorage = (): MovieSearchResult[] => {
    try {
        const stored = localStorage.getItem('favorites');
        return stored ? JSON.parse(stored) : [];
    } catch (error) {
        console.error('Failed to load favorites from localStorage:', error);
        return [];
    }
};

export const saveFavoritesToStorage = (favorites: MovieSearchResult[]): void => {
    try {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    } catch (error) {
        console.error('Failed to save favorites to localStorage:', error);
    }
};
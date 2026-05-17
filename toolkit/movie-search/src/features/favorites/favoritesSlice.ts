import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MovieSearchResult, MovieDetails } from '../../types/types';
import { loadFavoritesFromStorage, saveFavoritesToStorage } from './favoritesUtils';

interface FavoritesState {
    items: MovieSearchResult[];
}

const initialState: FavoritesState = {
    items: loadFavoritesFromStorage(),
};

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        addToFavorites: (state, action: PayloadAction<MovieSearchResult | MovieDetails>) => {
            const movie = action.payload;
            const exists = state.items.some(item => item.imdbID === movie.imdbID);

            if (!exists) {
                const favoriteItem: MovieSearchResult = {
                    imdbID: movie.imdbID,
                    Title: movie.Title,
                    Year: movie.Year,
                    Type: movie.Type,
                    Poster: movie.Poster,
                };
                state.items.push(favoriteItem);
                saveFavoritesToStorage(state.items);
            }
        },
        removeFromFavorites: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter(movie => movie.imdbID !== action.payload);
            saveFavoritesToStorage(state.items);
        },
        clearFavorites: (state) => {
            state.items = [];
            saveFavoritesToStorage(state.items);
        },
    },
});

export const { addToFavorites, removeFromFavorites, clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
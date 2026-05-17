import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { MoviesState, MovieDetails, SearchResponse } from '../../types/types';
import { searchMovies, getMovieDetails } from './moviesAPI';

const initialState: MoviesState = {
    searchResults: [],
    selectedMovie: null,
    loading: false,
    error: null,
    searchTerm: '',
    totalResults: 0,
};

export const searchMoviesAsync = createAsyncThunk(
    'movies/searchMovies',
    async (searchTerm: string) => {
        const response = await searchMovies(searchTerm);
        return response;
    }
);

export const getMovieDetailsAsync = createAsyncThunk(
    'movies/getMovieDetails',
    async (imdbID: string) => {
        const response = await getMovieDetails(imdbID);
        return response;
    }
);

const moviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        clearSearchResults: (state) => {
            state.searchResults = [];
            state.searchTerm = '';
            state.totalResults = 0;
        },
        setSearchTerm: (state, action: PayloadAction<string>) => {
            state.searchTerm = action.payload;
        },
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Search Movies
            .addCase(searchMoviesAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(searchMoviesAsync.fulfilled, (state, action: PayloadAction<SearchResponse>) => {
                state.loading = false;
                state.searchResults = action.payload.Search || [];
                state.totalResults = parseInt(action.payload.totalResults) || 0;
                state.error = null;
            })
            .addCase(searchMoviesAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to search movies';
                state.searchResults = [];
            })
            // Get Movie Details
            .addCase(getMovieDetailsAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getMovieDetailsAsync.fulfilled, (state, action: PayloadAction<MovieDetails>) => {
                state.loading = false;
                state.selectedMovie = action.payload;
                state.error = null;
            })
            .addCase(getMovieDetailsAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch movie details';
                state.selectedMovie = null;
            });
    },
});

export const { clearSearchResults, setSearchTerm, clearError } = moviesSlice.actions;
export default moviesSlice.reducer;
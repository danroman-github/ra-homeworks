import { MovieDetails, SearchResponse } from '../../types/types';

const API_KEY = '64405bd2';
const BASE_URL = 'https://www.omdbapi.com';

export const searchMovies = async (searchTerm: string, page: number = 1): Promise<SearchResponse> => {
    const response = await fetch(
        `${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(searchTerm)}&page=${page}`
    );

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    const data = await response.json();

    if (data.Response === 'False') {
        throw new Error(data.Error || 'Failed to fetch movies');
    }

    return data;
};

export const getMovieDetails = async (imdbID: string): Promise<MovieDetails> => {
    const response = await fetch(
        `${BASE_URL}?apikey=${API_KEY}&i=${imdbID}&plot=full`
    );

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    const data = await response.json();

    if (data.Response === 'False') {
        throw new Error(data.Error || 'Failed to fetch movie details');
    }

    return data;
};
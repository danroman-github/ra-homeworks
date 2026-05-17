export interface MovieSearchResult {
    imdbID: string;
    Title: string;
    Year: string;
    Type: string;
    Poster: string;
}

export interface Rating {
    Source: string;
    Value: string;
}

export interface MovieDetails {
    imdbID: string;
    Title: string;
    Year: string;
    Rated: string;
    Released: string;
    Runtime: string;
    Genre: string;
    Director: string;
    Writer: string;
    Actors: string;
    Plot: string;
    Language: string;
    Country: string;
    Awards: string;
    Poster: string;
    Ratings: Rating[];
    Metascore: string;
    imdbRating: string;
    imdbVotes: string;
    Type: string;
    DVD: string;
    BoxOffice: string;
    Production: string;
    Website: string;
    Response: string;
    Error?: string;
}

export interface SearchResponse {
    Search: MovieSearchResult[];
    totalResults: string;
    Response: string;
    Error?: string;
}

export interface MoviesState {
    searchResults: MovieSearchResult[];
    selectedMovie: MovieDetails | null;
    loading: boolean;
    error: string | null;
    searchTerm: string;
    totalResults: number;
}
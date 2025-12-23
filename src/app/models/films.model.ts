export interface Film {
    id: number;
    title: string;
    name?: string;
    original_title?: string;
    overview?: string;
    poster_path?: string;
    release_date?: string;
    vote_average?: number;
    runtime?: number;
    vote_count?: number;
    imdb_id?: string;
}

export interface Film {
    Title?: string;
    Year?: string;
    Rated?: string;
    Released?: string;
    Runtime?: string;
    Genre?: string;
    Director?: string;
    Writer?: string;
    Actors?: string;
    Plot?: string;
    Language?: string;
    Country?: string;
    Awards?: string;
    Poster?: string;
    Ratings?: Rating[];
    Metascore?: string;
    imdbRating?: string;
    imdbVotes?: string;
    imdbID?: string;
    Type?: string;
    DVD?: string;
    BoxOffice?: string;
    Production?: string;
    Website?: string;
    Response?: string;
    Error?: string;
}

export interface Film {
    episode_run_time?: number[];
    first_air_date?: string;
    genres?: Genre[];
    homepage?: string | null;
    id: number;
    in_production?: boolean;
    languages?: string[];
    last_air_date?: string | null;
    number_of_episodes?: number;
    number_of_seasons?: number;
    origin_country?: string[];
    original_language?: string;
    original_name?: string;
    status?: string;
    tagline?: string;
    type?: string;
}

export interface Genre {
    id: number;
    name: string;
}

export interface Rating {
    Source: string;
    Value: string;
}

export interface FilmsResponse {
    page: number;
    results: Film[];
    total_pages: number;
    total_results: number;
}

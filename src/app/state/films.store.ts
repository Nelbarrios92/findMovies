import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';
import { Film } from '../models/films.model';
import { FilmService } from '../services/film.service';
import { inject } from '@angular/core';

export interface FilmsState {
    movies: Film[];
    series: Film[];
    filteredMovies: Film[];
    searchResults: Film[];
    selectedType: string;
    loading: boolean;
    error: string | null;
}

const emptyFilms: Film[] = [
    { id: null!, title: '' },
    { id: null!, title: '' },
];

export const initialFilmsState: FilmsState = {
    movies: emptyFilms,
    series: emptyFilms,
    filteredMovies: emptyFilms,
    searchResults: [],
    selectedType: 'movies',
    loading: true,
    error: null,
};

export const FilmsStore = signalStore(
    { providedIn: 'root' },
    withState<FilmsState>(initialFilmsState),
    withMethods((store, filmService: FilmService = inject(FilmService)) => ({

        startLoading() {
            patchState(store, {
                loading: true,
                error: null
            });
        },

        setSelectedType(type: string) {
            patchState(store, {
                selectedType: type
            });
        },

        setError(error: string) {
            patchState(store, {
                loading: false,
                error: error
            });
        },

        stopLoading() {
            patchState(store, {
                loading: false,
                error: null
            });
        },

        loadMovies() {
            if (store.movies().length > 2) {
                return;
            }
            patchState(store, {
                loading: true,
                error: null
            });
            filmService.getFilms().subscribe({
                next: (movies) => this.loadMoviesSuccess(movies),
                error: (error) => this.loadMoviesFailure(error)
            });
        },

        loadMoviesSuccess(movies: Film[]) {
            patchState(store, {
                movies,
                loading: false
            });
        },

        loadMoviesFailure(error: string) {
            patchState(store, {
                loading: false,
                error
            });
        },

        loadSeries() {
            if (store.series().length > 2) {
                return;
            }
            patchState(store, {
                loading: true,
                error: null
            });
            filmService.getFilms(false).subscribe({
                next: (series) => this.loadSeriesSuccess(series),
                error: (error) => this.loadSeriesFailure(error)
            });
        },

        loadSeriesSuccess(series: Film[]) {
            patchState(store, {
                series,
                loading: false
            });
        },

        loadSeriesFailure(error: string) {
            patchState(store, {
                loading: false,
                error
            });
        },

        loadFilteredMovies() {
            if (store.filteredMovies().length > 2) {
                return;
            }
            patchState(store, {
                loading: true,
                error: null
            });
            filmService.getFilms(true, 2023).subscribe({
                next: (movies) => patchState(store, {
                    filteredMovies: movies,
                    loading: false
                }),
                error: (error) => patchState(store, {
                    loading: false,
                    error
                })
            });
        },

    })),


);

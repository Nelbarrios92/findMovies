import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Film } from '../../models/films.model';
import { FilmsStore } from '../../state/films.store';
import { FilmService } from '../../services/film.service';
import { SkeletonLoaderDirective } from '../../directives/skeleton-loader.directive';

@Component({
    selector: 'app-film-detail',
    imports: [SkeletonLoaderDirective],
    templateUrl: './film-detail.component.html',
    styleUrl: './film-detail.component.scss',
})
export class FilmDetailComponent {

    filmId: string | null = null;
    film = signal<Film | null>(null);
    store = inject(FilmsStore);

    constructor(private route: ActivatedRoute, private filmService: FilmService) {
    }

    ngOnInit(): void {
        this.route.params.subscribe({
            next: (params: any) => {
                this.store.startLoading();
                this.filmId = params.id;
                const isMovie = localStorage.getItem('tab') === 'movies';
                this.filmService.getFilmById(+params.id, isMovie).subscribe({
                    next: (film: Film) => {
                        if (!film.Error) {
                            this.film.set(film);
                            this.store.stopLoading()
                        } else {
                            this.store.setError(film.Error)
                        }
                    }
                });
            }
        })
    }




}

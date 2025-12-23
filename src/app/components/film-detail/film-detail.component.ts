import { Component, effect, inject, signal } from '@angular/core';
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

    film = signal<Film | null>(null);
    store = inject(FilmsStore);
    route = inject(ActivatedRoute);
    filmService = inject(FilmService);

    ngOnInit(): void {
        this.route.params.subscribe({
            next: (params: any) => {
                this.store.startLoading();
                const filmId = params.id;
                const type = params.type;
                this.filmService.getFilmById(+filmId, type === 'movie').subscribe({
                    next: (film: Film) => {
                        if (!film.Error) {
                            this.film.set(film);
                            this.store.stopLoading()
                        } else {
                            this.store.setError(film.Error)
                        }
                    },
                    error: (error) => {
                        this.store.setError(error)
                    }
                });
            }
        })
    }




}

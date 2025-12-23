import { Component, inject, input } from '@angular/core';
import { FilmsComponent } from '../films/films.component';
import { ScrollLoopDirective } from '../../directives/scroll-loop.directive';
import { Film } from '../../models/films.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gallery',
  imports: [FilmsComponent, ScrollLoopDirective],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss',
})
export class GalleryComponent {
  films = input<Film[]>([]);
  isMovie = input<boolean>(true);
  router = inject(Router);

  navigate(id: number) {
    this.router.navigate([`/film/${this.isMovie() ? 'movie' : 'serie'}/${id}`]);
  }
}

import { Component, input, signal } from '@angular/core';
import { FilmsComponent } from '../films/films.component';
import { ScrollLoopDirective } from '../../directives/scroll-loop.directive';
import { Film } from '../../models/films.model';

@Component({
  selector: 'app-gallery',
  imports: [FilmsComponent, ScrollLoopDirective],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss',
})
export class GalleryComponent {
  films = input<Film[]>([]);
}

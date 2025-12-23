import { Component, inject, OnInit, signal } from '@angular/core';
import { TabsComponent } from '../tabs/tabs.component';
import { GalleryComponent } from '../gallery/gallery.component';
import { SkeletonLoaderDirective } from '../../directives/skeleton-loader.directive';
import { FilmsStore } from '../../state/films.store';

@Component({
  selector: 'app-home',
  imports: [TabsComponent, GalleryComponent, SkeletonLoaderDirective],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {

  store = inject(FilmsStore);
  selectedType = signal('movies');

  ngOnInit() {
    this.selectedType.set(this.store.selectedType());
    if (this.selectedType() === 'movies') {
      this.store.loadMovies();
    } else {
      this.store.loadSeries();
    }
    this.store.loadFilteredMovies();
  }

  getFilms(type: string) {
    this.selectedType.set(type);
    if (type === 'movies') {
      this.store.loadMovies();
    } else {
      this.store.loadSeries();
    }
  }
}

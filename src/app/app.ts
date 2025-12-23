import { Component, inject, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { FilmsStore } from './state/films.store';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SearchBarComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('FindMovies');
  store = inject(FilmsStore);
  router = inject(Router);
  refresh() {
    window.location.href = this.router.url;
  }

  goToHome() {
    this.store.loadMovies();
    this.router.navigate(['/']);
  }

}

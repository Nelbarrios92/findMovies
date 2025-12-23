import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AsyncPipe, DatePipe } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, map, switchMap } from 'rxjs';
import { FilmService } from '../../services/film.service';

@Component({
  selector: 'app-search-bar',
  imports: [RouterModule, DatePipe, ReactiveFormsModule, AsyncPipe],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
})
export class SearchBarComponent {

  searchQuery = new FormControl('');
  films$;

  constructor(private filmService: FilmService) {
    this.films$ = this.searchQuery.valueChanges.pipe(
      debounceTime(300),
      switchMap(query => this.filmService.searchFilms(query || '')),
      map(films => {
        if (films.length === 0) {
          return [{ id: null!, title: '' }];
        }
        return films;
      })
    );
  }

}

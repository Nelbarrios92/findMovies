import { Component, inject, input, output, } from '@angular/core';
import { Film } from '../../models/films.model';
import { RouterModule } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { FilmsStore } from '../../state/films.store';

@Component({
  selector: 'app-films',
  imports: [RouterModule, DecimalPipe],
  templateUrl: './films.component.html',
  styleUrl: './films.component.scss',
})
export class FilmsComponent {

  film = input<Film>(null!);
  clicked = output<number>();
  store = inject(FilmsStore);
}

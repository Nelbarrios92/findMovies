import { Component, input, } from '@angular/core';
import { Film } from '../../models/films.model';
import { RouterModule } from '@angular/router';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-films',
  imports: [RouterModule, DecimalPipe],
  templateUrl: './films.component.html',
  styleUrl: './films.component.scss',
})
export class FilmsComponent {

  film = input<Film>(null!);

}

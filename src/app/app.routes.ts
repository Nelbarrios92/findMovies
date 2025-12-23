import { Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { FilmDetailComponent } from './components/film-detail/film-detail.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'film/:type/:id', component: FilmDetailComponent, runGuardsAndResolvers: 'always' }
];

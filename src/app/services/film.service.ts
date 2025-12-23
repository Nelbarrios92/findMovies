import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { delay, map, mergeMap } from 'rxjs/operators';
import { Film } from '../models/films.model';

@Injectable({
    providedIn: 'root'
})
export class FilmService {
    private http = inject(HttpClient);
    private token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNmNkNzQ5Mzk4OGE1OGNjM2ZkNWM2ZjE0YzUwY2M2MyIsIm5iZiI6MTc2NjM2ODMxNC44OTQsInN1YiI6IjY5NDhhNDNhNTc5MTZmYjBjNDJmYzFiMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.vHIczxmBnoa6ICVOTPgBlBsfQ8CvDMgvlUftKRhduZo';

    private headers = new HttpHeaders()
        .set('accept', 'application/json')
        .set('Authorization', `Bearer ${this.token}`);

    getFilms(isMovies: boolean = true, year?: number): Observable<Film[]> {

        const apiUrl = `https://api.themoviedb.org/3/discover/${isMovies ? 'movie' : 'tv'}?${year ? `year=${year}` : ''}&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`;

        return this.http.get<{ results: Film[] }>(apiUrl, { headers: this.headers }).pipe(
            delay(2000),
            map(response => response.results)
        );
    }

    searchFilms(query: string): Observable<Film[]> {

        const apiUrl = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`;

        return this.http.get<{ results: Film[] }>(apiUrl, { headers: this.headers }).pipe(
            map(response => response.results.splice(0, 5))
        );
    }

    getFilmById(id: number, isMovies: boolean): Observable<Film> {

        const apiUrl = `https://api.themoviedb.org/3/${isMovies ? 'movie' : 'tv'}/${id}`;

        const request = this.http.get<Film>(apiUrl, { headers: this.headers }).pipe(
            delay(2000),
            mergeMap(response => this.http.get<Film>(`https://www.omdbapi.com/?${isMovies ? `i=${response.imdb_id}` : `t=${response.name}`}&apikey=3581b4d1`))
        );

        return request;
    }
}

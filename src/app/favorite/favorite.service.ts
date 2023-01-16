import { Injectable, OnDestroy } from '@angular/core';
import { Movie } from '../interfaces/movies';
import { DatabaseService } from '../auth/database.service';
import { MoviesService } from '../movies/movies.service';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService implements OnDestroy {
  favorite: Movie[] = [];
  constructor(private dbService: DatabaseService){}

  getMovieIDs(){
    return this.dbService.queryID()
  }
  add(movie: Movie){
    // console.log(movie)
    this.favorite.push(movie);
  }
  remove(movie: Movie){
    this.favorite = this.favorite.filter(b => b != movie);
  }
  get(){
    return this.favorite;
  }
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }
}

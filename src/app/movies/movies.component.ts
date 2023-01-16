import { Component, OnDestroy, OnInit } from '@angular/core';
import { Movie } from '../interfaces/movies';
import { MoviesService } from './movies.service';


@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit, OnDestroy {
  searchText: any;
  constructor(private movieService: MoviesService){
    // console.log("constructor")
   }
   ngOnInit(): void {
    this.movies = this.movieService.getMovies();
   }
  movies: Movie[] = []

 isDisabled: boolean = false;
 isShowing: boolean = true;

//  card: Movie[] = [];

 handleClick(myVar: boolean){
  this.isDisabled = myVar;
 }
 inputString: string = '';
 handeInput(event: any){
  this.inputString = event.target.value;
 }
 toggleMovies(){
  this.isShowing = !this.isShowing
 }
 addToFavorite(movie: Movie){
  console.log(movie)
 }
 grabMovieId(){
  this.movieService.grabMovieId()
 }
 searchMovie(query: string){
  this.movies = []
  this.movies = this.movieService.searchMoviesResults(query);
 }
 ngOnDestroy(): void {
    this.movieService.destroy()
 }



}

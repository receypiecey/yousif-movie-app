import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Movie } from '../../interfaces/movies';
import { MatDialog } from '@angular/material/dialog';
import { FavoriteService } from 'src/app/favorite/favorite.service';
import { DatabaseService } from 'src/app/auth/database.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent {
  constructor(
    private favoriteService: FavoriteService,
    private dialog: MatDialog,
    private dbService: DatabaseService){  }

 @Input() movie: Movie = {} as Movie;
//  @Output() movieEmitter = new EventEmitter<Movie>();
  async isInFavorite(){
    const movieIDList = await this.dbService.queryID();
    return movieIDList.includes(this.movie.id)
  }
  isModalHidden: Boolean = false;
  addToFavorite(){
  if (localStorage.getItem("userName")==undefined){
    this.isModalHidden = true;
    alert("You must sign in first.")
    return
  }
  // this.movieEmitter.emit(this.movie);
  this.dbService.queryID();
  this.dbService.addMovie(this.movie);
  this.isModalHidden = true;

  }
  removeFromFavorite(){

  this.favoriteService.remove(this.movie);

  }

  openDialog(templateRef: any) {
  let dialogRef = this.dialog.open(templateRef, {});
  }
}

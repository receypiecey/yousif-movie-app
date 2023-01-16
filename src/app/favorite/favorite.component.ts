import { Component, OnDestroy, OnInit } from '@angular/core';
import { FavoriteService } from './favorite.service';
import { DatabaseService } from '../auth/database.service';
import { MoviesService } from '../movies/movies.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnDestroy{
  movieIDs: any = [];
  constructor(private favoriteService: FavoriteService, private movieService: MoviesService,     private dialog: MatDialog    ) {
    console.log("CONSTRUCT FAVORITES");
    this.movieIDs = this.favoriteService.getMovieIDs();

  }
  openDialog(templateRef: any) {
    let dialogRef = this.dialog.open(templateRef, {});
    }

favList(){
  console.log(this.movieIDs[0]['title']);
}

isModalHidden: Boolean = false;

removeFavorite(){
  alert("This feature hasn't been implemented yet.")
  this.isModalHidden=true;
}

getFavorite(){

  return this.movieIDs;
}
ngOnDestroy(): void {
  console.log("DESTROY FAVORITES")
  console.log(this.movieIDs)

  this.movieIDs = [];
  console.log(this.movieIDs)
}

}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesService } from './movies.service';
import { MoviesComponent } from './movies.component';
import { MovieComponent } from './movie/movie.component';
import { MaterialModule } from '../material.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [MoviesComponent, MovieComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
  ],
  providers: [MoviesService],
  exports: [MoviesComponent]
})
export class MoviesModule { }

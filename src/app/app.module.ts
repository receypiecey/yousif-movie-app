import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { MoviesModule } from "./movies/movies.module";
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from "./material.module";
import { FavoriteComponent } from "./favorite/favorite.component";

@NgModule({
 declarations: [AppComponent, FavoriteComponent, LoginComponent, RegisterComponent],
 imports: [BrowserModule, FormsModule, MoviesModule, AppRoutingModule, BrowserAnimationsModule, MaterialModule],
 bootstrap: [AppComponent],

})

export class AppModule {}

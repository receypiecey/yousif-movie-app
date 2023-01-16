import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./auth/login/login.component";
import { RegisterComponent } from "./auth/register/register.component";
import { MoviesComponent } from "./movies/movies.component";
import { FavoriteComponent } from "./favorite/favorite.component";
import { AuthGuard } from "./auth/auth.guard";

const routes: Routes = [
  {path: '', component:MoviesComponent},
  {path: 'favorite', component: FavoriteComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class AppRoutingModule {}

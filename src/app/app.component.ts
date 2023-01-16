import { Component, OnInit } from "@angular/core";
import { initializeApp } from "firebase/app";
import { AuthService } from "./auth/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})

export class AppComponent implements OnInit{
  constructor(private authService: AuthService){}
  ngOnInit(): void {
  }
  isAuthenticated(){
    return (localStorage.getItem("isAuthenticated")== "true");
  }
  logout(){
    this.authService.logout();
  }
}

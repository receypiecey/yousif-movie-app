import { Injectable } from '@angular/core';
import { createUserWithEmailAndPassword, getAuth, reauthenticateWithCredential, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { LoginForm } from '../interfaces/auth';
import { RegisterForm } from '../interfaces/register';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private router: Router, private dbService: DatabaseService) { }

  isLoading: boolean = false;
  isAuthenticated = new BehaviorSubject<boolean>(localStorage.getItem("isAuthenticated") === "true");

  login(form:LoginForm){
    if (this.isLoading) return;
    this.isLoading = true;
    const auth = getAuth();
    signInWithEmailAndPassword(auth, form.email, form.password)
    .then((userCredential) => {
      // Signed in
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userName", form.email);
      this.router.navigate(['']);
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      localStorage.setItem("isAuthenticated", "false");
      if (errorCode == 'auth/user-not-found') {
        alert('ERROR: User not found.');
      } else if (errorCode == 'auth/invalid-email') {
        alert('ERROR: Invalid email.');
      } else if (errorCode == 'auth/wrong-password') {
        alert('ERROR: Password is incorrect.');
      } else {
        alert(errorMessage);
      }
      console.log(error);
    }).finally(()=>this.isLoading = false);
  }


  register(form:RegisterForm){
    if (this.isLoading) return;
    this.isLoading = true;
    if(form.password != form.confirmPassword){
      alert("Password doesn't match.");
      this.isLoading = false;
      return;
    }
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, form.email, form.password)
      .then((userCredential) => {
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("userName", form.email);
        this.dbService.newUser(localStorage.getItem("userName"))
        alert("Successfully created account");
        this.router.navigate(['']);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        localStorage.setItem("isAuthenticated", "false");

        if (errorCode == 'auth/weak-password') {
          alert('The password is too weak.');
        } else if (errorCode == 'auth/invalid-email') {
          alert('This is an invalid email.');
        } else if (errorCode == 'auth/email-already-in-use') {
          alert('This email is already in use.');
        } else {
          alert(errorMessage);
        }
        console.log(error);
      }).finally(()=>this.isLoading = false);
  }

  logout(){
    const auth = getAuth();
    signOut(auth).then(() => {
      localStorage.removeItem("userName");
      this.router.navigate(['login']);
      localStorage.setItem("isAuthenticated", "false");
    }).catch((error) => {
      // An error happened.
    });
  }
}

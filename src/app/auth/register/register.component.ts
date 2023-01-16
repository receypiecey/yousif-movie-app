import { Component } from '@angular/core';
import { RegisterForm } from 'src/app/interfaces/register';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private authService: AuthService){}
  form: RegisterForm = {
    email: '',
    password: '',
    confirmPassword: '',
  }

  // passwordMatch: boolean = true;
  submit(){
    this.authService.register(this.form)
  }
  isLoading(){
    return this.authService.isLoading;
  }
}

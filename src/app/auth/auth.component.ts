import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { ResponseSign } from './models/response-sign';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLoginMode = true;
  isLoading = false;
  error: string = null;

  constructor(
    private authService: AuthService,
    private route: Router
  ) { }

  ngOnInit(): void {
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    let authObs: Observable<ResponseSign>;

    if (!form.valid) {
      return;
    } // Caso o usuário habilite o botão com algum hack, esse trecho previne qualquer ação.
    const email = form.value.email;
    const password = form.value.password;
    this.isLoading = true
    if (this.isLoginMode) {
      authObs = this.authService.signin(email, password);
    }
    else {
      authObs = this.authService.signup(email, password);
    }

    authObs.subscribe(responseData => {
      console.log(responseData);
      this.isLoading = false;
      this.route.navigate(['/recipes']);
    }, errorMessage => {
      this.error = errorMessage;
      this.isLoading = false;
    });
  }

  handleError(){
    this.error = null;
  }
}

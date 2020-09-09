import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { ResponseSign } from './models/response-sign';
import { User } from './models/user';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = new BehaviorSubject<User>(null);// Permite obter um valor prévio independente do momento do subscription
  private tokenExpirationTimer: any;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  signup(email: string, password: string) {
    return this.http.post<ResponseSign>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='
      + environment.firebaseAPIKey,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(
      catchError(errorResponse => {
        let errorMessage = 'An unkown error occured!';
        if (!errorResponse.error || !errorResponse.error.error) {
          return throwError(errorMessage);
        } else {
          switch (errorResponse.error.error.message) {
            case 'EMAIL_EXISTS':
              errorMessage = 'The email already exists';
            case 'TOO_MANY_ATTEMPTS_TRY_LATER':
              errorMessage = 'The email already exists';
          }
        }
        return throwError(errorMessage);
      }), tap(response => {
        this.handleAuthentication(response.email, response.localId, +response.expiresIn, response.idToken);
      })
    );
  }

  signin(email: string, password: string) {
    return this.http.post<ResponseSign>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='
      + environment.firebaseAPIKey
      , {
        email: email,
        password: password,
        returnSecureToken: true
      })
      .pipe(catchError(errorResponse => {
        let errorMessage = 'An unknown error occured!';
        if (!errorResponse.error || !errorResponse.error.error) {
          return throwError(errorMessage);
        } else {
          switch (errorResponse.error.error.message) {
            case 'EMAIL_NOT_FOUND': { errorMessage = 'Email not registered'; break; }
            case 'INVALID_PASSWORD': { errorMessage = 'Please, try your password again'; break; }
            case 'USER_DISABLED': { errorMessage = 'Email not registered'; break; }
          }
        }
        return throwError(errorMessage);
      }), tap(response => {
        this.handleAuthentication(response.email, response.localId, +response.expiresIn, response.idToken);
      })
      );
  }

  handleAuthentication(email: string, localId, expiresIn: number, idToken: string) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, localId, idToken, expirationDate);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user)); // Persistir login
  }

  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) { return; }
    const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));
    if (loadedUser.Token) {
      this.user.next(loadedUser);
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }

  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => { this.logout() }, expirationDuration)
  }
}

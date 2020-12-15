import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuth$ = new BehaviorSubject<boolean>(false);
  token: string;
  userId: string;

  constructor(private router: Router,
              private http: HttpClient) { }

  createNewUser(email: string, password: string, age:number,
                family: string, breed: string, food: string) {
    return new Promise((resolve, reject) => {
      this.http.post(
        'http://localhost:3000/api/auth/signup',
        {
          email: email,
          password: password,
          age: age,
          family: family,
          breed: breed,
          food: food
        })
        .subscribe(
          () => {
            this.login(email, password).then(
              () => { resolve(); }
            ).catch(
              (error) => { reject(error); }
            );
          }, (error) => {
            reject(error);
          }
        );
    });
  }


  login(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.http.post(
        'http://localhost:3000/api/auth/login',
        { email: email, password: password })
        .subscribe(
          (data: { token: string, userId: string }) => {
            this.token = data.token;
            this.userId = data.userId;
            this.isAuth$.next(true);
            resolve();
          },
          (error) => {
            reject(error);
          }
        );
    });
  }

  logout() {
    this.isAuth$.next(false);
    this.userId = null;
    this.token = null;
  }
}

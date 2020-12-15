import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient,
              private auth: AuthService,) { }

  getUsers() {
    return new Promise((resolve, reject) => {
      this.http.get('http://localhost:3000/api/users').subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  getUserById(id: string) {
    return new Promise((resolve, reject) => {
      this.http.get('http://localhost:3000/api/profile/' + id).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  modifyUserById(id: string, email: string, password: string, age:number,
                 family: string, breed: string, food: string) {
    return new Promise((resolve, reject) => {
      var user: any = {};
      if (password == null) {
        user = {
          email: email,
          age: age,
          family: family,
          breed: breed,
          food: food
        }
      } else {
        user = {
          email: email,
          password: password,
          age: age,
          family: family,
          breed: breed,
          food: food
        }
      }
      this.http.put('http://localhost:3000/api/profile/' + id, user)
        .subscribe(
          (response) => {
            resolve(response);
          },
          (error) => {
            reject(error);
          }
        );
    });
  }

  getFriendsByEmail(email: string) {
    return new Promise((resolve, reject) => {
      this.http.get('http://localhost:3000/api/friends/' + email).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  addFriend(id: string) {
    return new Promise((resolve, reject) => {
      this.http.put(
        'http://localhost:3000/api/friends/add',
        { email: this.auth.userEmail , id: id }
      ).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  removeFriend(id: string) {
    return new Promise((resolve, reject) => {
      this.http.put(
        'http://localhost:3000/api/friends/remove',
        { email: this.auth.userEmail , id: id }
      ).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
}

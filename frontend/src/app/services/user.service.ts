import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

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
}

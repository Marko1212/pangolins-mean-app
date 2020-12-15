import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  friends: string[] = [];
  users: string[] = [];

  constructor(private auth: AuthService,
              private userService: UserService,
              private router: Router) { }

  ngOnInit(): void {
    this.userService.getFriendsByEmail(this.auth.userEmail).then(friends => {
      friends.friends.forEach(id => {
        this.userService.getUserById(id).then(friend => {
          this.friends.push(friend);
        })
        .catch((error) => { console.log(error) });
      });
    })
    .catch((error) => { console.log(error) });

    this.userService.getUsers().then(users => {
      this.users = users;
    })
    .catch((error) => { console.log(error) });
  }

  onUserClick(user: string) {
    if (user._id == this.auth.userId) return;
    this.userService.addFriend(this.auth.userEmail, user._id).then(() => {
      console.log('New friend');
    })
    .catch((error) => { console.log(error) });
  }
}

import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from '../services/user.service';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  email: string;
  age: string;
  family: string;
  breed: string;
  food: string;
  isMyProfile: boolean;

  constructor(private userService: UserService,
              private router: Router,
              private route: ActivatedRoute,
              private auth: AuthService) { }

  ngOnInit(): void {
    this.isMyProfile = false;
    this.route.params.subscribe(
      (params: Params) => {
        if (params.id === this.auth.userId) this.isMyProfile = true;
        this.userService.getUserById(params.id).then(
          data => {
            this.email = data.email != null ? data.email : 'Unknown';
            this.age = data.age != null ? data.age : 'Unknown';
            this.family = data.family != null ? data.family : 'Unknown';
            this.breed = data.breed != null ? data.breed : 'Unknown';
            this.food = data.food != null ? data.food : 'Unknown';
          }
        )
      }
    )
  }

  onEdit() {
    this.router.navigate(['/profile/edit/' + this.auth.userId])
  }
}

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
            this.email = (<any>data).email != null ? (<any>data).email : 'Unknown';
            this.age = (<any>data).age != null ? (<any>data).age : 'Unknown';
            this.family = (<any>data).family != null ? (<any>data).family : 'Unknown';
            this.breed = (<any>data).breed != null ? (<any>data).breed : 'Unknown';
            this.food = (<any>data).food != null ? (<any>data).food : 'Unknown';
          }
        )
      }
    )
  }

  onEdit() {
    this.router.navigate(['/profile/edit/' + this.auth.userId])
  }
}

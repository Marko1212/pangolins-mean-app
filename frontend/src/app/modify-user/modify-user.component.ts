import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-modify-user',
  templateUrl: './modify-user.component.html',
  styleUrls: ['./modify-user.component.css']
})
export class ModifyUserComponent implements OnInit {

  editForm: FormGroup;
  loading = false;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private auth: AuthService,
              private userService: UserService,
              private location: Location) { }

  ngOnInit(): void {
    this.loading = true;
    this.route.params.subscribe(
      (params: Params) => {
        this.userService.getUserById(params.id).then(
          data => {
            this.editForm = this.formBuilder.group({
              email: [(<any>data).email],
              password: [null, Validators.minLength(8)],
              age: [(<any>data).age, [Validators.min(1), Validators.max(20)]],
              family: [(<any>data).family],
              breed: [(<any>data).breed],
              food: [(<any>data).food]
            });
            this.loading = false;
          }
        )
      }
    )
  }

  onEdit() {
    const email = this.editForm.get('email').value;
    const password = this.editForm.get('password').value;
    const age = this.editForm.get('age').value;
    const family = this.editForm.get('family').value;
    const breed = this.editForm.get('breed').value;
    const food = this.editForm.get('food').value;
    this.userService.modifyUserById(this.auth.userId, email, password, age, family, breed, food).then(
      () => {
        this.location.back();
      }
    ).catch(
      (error) => { console.log(error) }
    );
  }

  onCancel() {
    this.location.back();
  }

}

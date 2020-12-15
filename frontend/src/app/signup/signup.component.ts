import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  errorMessage: string;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private auth: AuthService) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
      age: [null, [Validators.min(1), Validators.max(20), Validators.pattern('^[0-9]\d*$')]],
      family: [null],
      breed: [null],
      food: [null]
    });
  }

  onSignup() {
    const email = this.signupForm.get('email').value;
    const password = this.signupForm.get('password').value;
    const age = this.signupForm.get('age').value;
    const family = this.signupForm.get('family').value;
    const breed = this.signupForm.get('breed').value;
    const food = this.signupForm.get('food').value;
    this.auth.createNewUser(email, password, age, family, breed, food).then(
      () => {
        this.router.navigate(['/']);
      }
    ).catch(
      (error) => {
        this.errorMessage = error.message;
      }
    );
  }
}

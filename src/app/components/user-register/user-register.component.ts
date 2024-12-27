import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserServiceService } from '../../user-service.service';
import { Router } from '@angular/router';

interface UserRegisterRequest {
  username: FormControl<string>,
  email: FormControl<string>,
  password: FormControl<string>
}

@Component({
  selector: 'app-user-register',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './user-register.component.html',
  styleUrl: './user-register.component.css'
})
export class UserRegisterComponent {

  userRegisterForm: FormGroup<UserRegisterRequest>;
  passwordMinLength: number = 10;
  passwordDontMatch: boolean = true;
  emailAlreadyExists:boolean = false;
  usernameAlreadyExists:boolean = false;
  passwordConfirmation: string | null = null;
  isSubmitting: boolean = false;
  registerSuccess: boolean = false;

  constructor(private readonly userService: UserServiceService, private readonly route: Router){
    this.userRegisterForm = new FormGroup<UserRegisterRequest>({
      username: new FormControl("", {
        validators: [Validators.required],
        nonNullable: true
      }),
      email: new FormControl("", {
        validators: [Validators.email, Validators.required],
        nonNullable: true
      }),
      password: new FormControl("", {
        validators: [Validators.minLength(this.passwordMinLength), Validators.required],
        nonNullable: true
      })
    })
  }

  goToLogin(){
    this.route.navigate(["user/login"]);
  }

  goToHome(){
    this.route.navigate([""]);
  }

  checkConfirmPassword(){
    this.passwordDontMatch = this.userRegisterForm.value.password === this.passwordConfirmation ?false : true;
    console.log(this.passwordDontMatch);
  }

  submitRegister(){
    this.isSubmitting = true;
    this.userService.registerUser(this.userRegisterForm.getRawValue()).subscribe({
      next: (response) => {

      },
      error: (err) => {

        if (err.error === 101){
          this.emailAlreadyExists = true;

        }
        else if (err.error === 102){
          this.usernameAlreadyExists = true;

        }
      },
      complete: () => {
        this.userRegisterForm.reset();
        this.passwordConfirmation = null;
        this.registerSuccess = true;
      }
    }).add(()=> { this.isSubmitting = false;})
  }
} 

import { Component } from '@angular/core';
import { UserServiceService } from '../../user-service.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

interface LoginForm {
  email: FormControl<String>,
  password: FormControl<String>;
}

@Component({
  selector: 'app-user-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css'
})
export class UserLoginComponent {
  isSubmitting: boolean = false;
  loginForm: FormGroup<LoginForm>;
  
  constructor(private readonly authService: UserServiceService,
    private readonly router: Router
  ){
    this.loginForm = new FormGroup<LoginForm>({
      email: new FormControl("", {
        validators: [Validators.email, Validators.required],
        nonNullable: true
      }),
      password: new FormControl("", {
        validators: [Validators.required],
        nonNullable: true
      })
    })
  }

  submitLogin(){
    this.isSubmitting = true;

    this.authService.login(this.loginForm.getRawValue()).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        this.loginForm.reset()
        this.router.navigate(["/"])
      }
    }).add(() => this.isSubmitting = false)
  }

  goToHome(){
    this.router.navigate([""])
  }
}

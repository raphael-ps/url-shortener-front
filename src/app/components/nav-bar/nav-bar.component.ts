import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  isLoggedIn: boolean = false;
  username: string | null;
  userId: string | null;

  constructor(private readonly route: Router){
    this.isLoggedIn = sessionStorage.getItem("token") === null ? false : true;

    this.userId = sessionStorage.getItem("userId");
    this.username = sessionStorage.getItem("username");
  }
 
  logout(){
    sessionStorage.clear()
    this.isLoggedIn = false;
  }

  loginButton(){
    this.route.navigate(["/user/login"])
  }

  registerButton(){
    this.route.navigate(["/user/register"])
  }
}

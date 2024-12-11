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

  constructor(private readonly route: Router){

  }

  loginButton(){
    this.route.navigate(["/user/login"])
  }

  registerButton(){
    this.route.navigate(["/user/register"])
  }
}

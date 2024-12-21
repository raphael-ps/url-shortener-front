import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private readonly httpClient: HttpClient) { }

  registerUser( userInfo: {
    username: string;
    email: string;
    password: string;
  }){
    console.log(userInfo);
    return this.httpClient.post(`http://localhost:8080/user/register`, userInfo)
  }
}

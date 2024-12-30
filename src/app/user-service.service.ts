import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';

type LoginResponse = {
  token: string,
  username: string,
  userId: string
}

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private apiUrl: String = "http://localhost:8080/auth"

  constructor(private readonly httpClient: HttpClient) { }

  login( userInfo: {
    email: String,
    password: String
  }){

    return this.httpClient.post<LoginResponse>(`${this.apiUrl}/login`, userInfo).pipe(
      tap((value) => {
        sessionStorage.setItem("token", value.token);
        console.log(value.token)
        sessionStorage.setItem("userId", value.userId)
        console.log(value.userId)
        sessionStorage.setItem("username", value.username)
        console.log(value.username)
      })
    )
  }
  
  registerUser( userInfo: {
    username: string;
    email: string;
    password: string;
  }){
    console.log(userInfo);
    return this.httpClient.post(`${this.apiUrl}/register`, userInfo)
  }
}

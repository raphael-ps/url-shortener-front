import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlServiceService {

  constructor(private readonly httpClient : HttpClient) { }

  addShortUrl = (info: {
    originalUrl : string;
    nickname : string;
    password : string | null;
  }) => {
    console.log(info)
    return this.httpClient.post("http://localhost:8080/shorten", info, {responseType: "text"})
  }

  getLongUrl = (nickname : string) => {
    return this.httpClient.get(`http://localhost:8080/${nickname}`, {responseType: "text"})
  }

  validatePassword = (nickname: string, password: string) => {
    console.log(nickname, password)
    return this.httpClient.post(`http://localhost:8080/${nickname}/validate-password`, {password: password}, {responseType: "text"})
  }
}

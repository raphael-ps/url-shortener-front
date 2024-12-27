import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { shortenedUrl } from './models/ShortenedUrl';
import { map } from 'rxjs';

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

  retrieveUrlStats = (nickcname: string) => {
    return this.httpClient.get<shortenedUrl>(`http://localhost:8080/stats/${nickcname}`);
  }

  validatePassword = (nickname: string, password: string) => {
    console.log(nickname, password)
    return this.httpClient.post(`http://localhost:8080/${nickname}/validate-password`, {password: password}, {responseType: "text"})
  }
}

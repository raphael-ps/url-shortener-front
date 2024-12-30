import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { shortenedUrl } from './models/ShortenedUrl';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UrlServiceService {

  constructor(private readonly httpClient : HttpClient) { }

  addShortUrl = (info: {
    originalUrl : string;
    nickname : string;
    password : string | null;
    userId?: string | null
  }) => {
    info.userId = sessionStorage.getItem("userId");
    console.log(info)
    return this.httpClient.post("http://localhost:8080/shorten", info, {responseType: "text"})
  }

  deleteUrl(urlId: string, token: string){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    
    return this.httpClient.post<string>("http://localhost:8080/user/delete-url", urlId, {headers})
  }

  getUserHistory(userId: string, token: string): Observable<any> {
    console.log(userId)
    console.log(token)
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const params = new HttpParams().set('userId', userId);

    return this.httpClient.get<Array<shortenedUrl>>(`http://localhost:8080/user/teste`, { headers, params });
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

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
  }) => {
    console.log(info)
    return this.httpClient.post("http://localhost:8080/shorten", info).subscribe({
      next: (response) => {
        console.log("Requisição bem-sucedida", response);
      },
      error: (err) => {
        console.error("Erro na requisição:", err);
      },
      complete: () => {
        console.log("Requisição completada!");
      },
    });
  }

  getLongUrl = (nickname : string) => {
    return this.httpClient.get("http://localhost:8080/"+nickname, {responseType: "text"}).subscribe({
      next: (response) => {
        window.location.href = response
      },
      error: (err) => {
        if (err.status == 404){
          alert("Error 404 - Link Não Encontrado!\nVai Se Fuder! 🤬")
        }
      }
    })
  }
}

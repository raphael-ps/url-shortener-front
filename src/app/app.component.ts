import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { UrlServiceService } from './url-service.service';

interface ShortUrlRequest {
  originalUrl: FormControl<string>;
  nickname: FormControl<string>;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  imgsrc = "https://http.cat/status/418.jpg"
  name = "Otário";
  title = 'url-shortener-front';
  urlNickname = "";

  urlShortenerForm: FormGroup<ShortUrlRequest> ;

  constructor (private readonly urlService: UrlServiceService){
    this.urlShortenerForm = new FormGroup<ShortUrlRequest>({
      originalUrl: new FormControl("", {
        validators: [Validators.required],
        nonNullable: true,
      }),
      nickname: new FormControl("", {
        validators: [Validators.required],
        nonNullable: true,
      })
    })
  }

  submitShortUrl = () => {
    this.urlService.addShortUrl(this.urlShortenerForm.value as {originalUrl: string; nickname: string;})
  }

  toggleImage = () => {
    const aux = "https://http.cat/images/420.jpg"

    this.imgsrc = this.imgsrc == aux ? "https://http.cat/images/418.jpg" : aux;
  }

  redirectTest = () => {
    this.urlService.redirectToUrl(this.urlNickname)
  }
}

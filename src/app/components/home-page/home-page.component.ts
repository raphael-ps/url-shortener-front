import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { UrlServiceService } from '../../url-service.service';
import { Router } from '@angular/router';


interface ShortUrlRequest {
  originalUrl: FormControl<string>;
  nickname: FormControl<string>;
  password: FormControl<string | null>;
}

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

  imgsrc = "https://http.cat/status/418.jpg"
  name = "Otário";
  title = 'url-shortener-front';
  urlNickname = "";
  param!: string | null;
  urlShortenerForm: FormGroup<ShortUrlRequest> ;

  constructor (
    private readonly urlService: UrlServiceService,
    private readonly route: Router,
  ){
    this.urlShortenerForm = new FormGroup<ShortUrlRequest>({
      originalUrl: new FormControl("", {
        validators: [Validators.required],
        nonNullable: true,
      }),
      nickname: new FormControl("", {
        validators: [Validators.required],
        nonNullable: true,
      }),
      password: new FormControl("", {nonNullable: false})
    })
  }

  submitShortUrl = () => {
    this.urlService.addShortUrl(this.urlShortenerForm.value as {originalUrl: string; nickname: string; password: string | null})
  }

  toggleImage = () => {
    const aux = "https://http.cat/images/420.jpg"

    this.imgsrc = this.imgsrc == aux ? "https://http.cat/images/418.jpg" : aux;
  }
}

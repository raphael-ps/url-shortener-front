import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { UrlServiceService } from '../../url-service.service';
import { Router } from '@angular/router';
import { NavBarComponent } from "../nav-bar/nav-bar.component";


interface ShortUrlRequest {
  originalUrl: FormControl<string>;
  nickname: FormControl<string>;
  password: FormControl<string | null>;
  expirationDate: FormControl<Date | null>;
}

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [ReactiveFormsModule, NavBarComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

  isSubmitting: boolean = false;
  title = 'url-shortener-front';
  param!: string | null;
  urlShortenerForm: FormGroup<ShortUrlRequest> ;
  shortenSucces: boolean = false
  shortenedLink : string = "";
  nicknameAlreadyExists: boolean = false;

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
      password: new FormControl(null, {nonNullable: false}),
      expirationDate: new FormControl(null, {nonNullable: false})
    })
  }

  submitShortUrl = () => {
    this.isSubmitting = true;
    this.urlService.addShortUrl(this.urlShortenerForm.value as {originalUrl: string; nickname: string; password: string | null}).subscribe({
      next: (response) => {
        this.shortenedLink = location.origin + "/" + response
      },
      error: (err) => {
        this.nicknameAlreadyExists = true 
      },
      complete: () => {
        this.shortenSucces = true;
        this.urlShortenerForm.reset();
        this.copyUrlToClipboard();
      }
    }).add(() => this.isSubmitting = false)
  }

  copyUrlToClipboard() {

    navigator.clipboard.writeText(this.shortenedLink)
      .then(() => {
        console.log('Text copied to clipboard');
      })
      .catch(err => {
        console.error('Failed to copy text: ', err);
      });
  
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UrlServiceService } from '../../url-service.service';
import { NotFoundPageComponent } from '../not-found-page/not-found-page.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-redirect',
  standalone: true,
  imports: [NotFoundPageComponent, FormsModule],
  templateUrl: './redirect.component.html',
  styleUrl: './redirect.component.css'
})
export class RedirectComponent implements OnInit{
  param: string = "";
  error: number | null = null;
  isSubmitting : boolean = false;
  password: string = "";
  isInvalidPassword: boolean = false;

  longUrl: string = "";

  constructor(
    private actRoute: ActivatedRoute,
    private urlService: UrlServiceService,
  ){}

  ngOnInit(): void {
    console.log("construtor chamado")
    const optionalParam = this.actRoute.snapshot.paramMap.get('nickname')
    this.param = optionalParam == null ? "" : optionalParam;
  
    this.urlService.getLongUrl(this.param).subscribe({
      next: (response) => {
         this.longUrl = response.startsWith("http") ? response : "https://" + response;
      },
      error: (err) => {
        this.error = err.status
        console.log(this.error)
      },
      complete: () => {
        location.replace(this.longUrl)
      }
    })
  }


  submit = () => {
  
    if(this.password == ""){
      this.isInvalidPassword = true;
      return
    }

    this.isSubmitting = true;
    this.urlService.validatePassword(this.param, this.password).subscribe({
      next: (response) => {
        window.location.href = response.startsWith("http") ? response : "https://" + response;
      },
      error: (err) => {
        if (err.status == 401){
          this.isInvalidPassword = true
        }
      },
    }).add( () => {
      this.isSubmitting = false;
    })
  }
}

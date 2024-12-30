import { Component, OnInit } from '@angular/core';
import { NavBarComponent } from "../nav-bar/nav-bar.component";
import { Router } from '@angular/router';
import { UrlServiceService } from '../../url-service.service';
import { UserServiceService } from '../../user-service.service';
import { shortenedUrl } from '../../models/ShortenedUrl';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-history',
  standalone: true,
  imports: [NavBarComponent, CommonModule],
  templateUrl: './user-history.component.html',
  styleUrl: './user-history.component.css'
})
export class UserHistoryComponent implements OnInit{
  userId: string | null = null;
  token: string | null = null;

  urlList: shortenedUrl[] = [];

  constructor(private readonly router: Router, private readonly urlService: UrlServiceService){
  }
  ngOnInit(): void {
    this.userId = sessionStorage.getItem("userId");
    this.token = sessionStorage.getItem("token");

    if (this.userId && this.token){
      console.log("aqui")
      this.urlService.getUserHistory(this.userId, this.token).subscribe({
        next: (response: shortenedUrl[]) => {
          this.urlList = response;
        },
        error: (err) => {
          console.log(err)
        },
        complete: () => {
          console.log(this.urlList)
        }
      })
    }
  }

  deleteUrl(url: shortenedUrl){
    console.log(url.id);
    const userToken = sessionStorage.getItem("token");
    this.urlService.deleteUrl(url.id, userToken ? userToken : "").subscribe({
      next: (response) => {
        this.urlList = this.urlList.filter(item => item.id !== url.id);
      }
    });
  }

}

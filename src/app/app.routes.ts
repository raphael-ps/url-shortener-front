import { Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
import { RedirectComponent } from './components/redirect/redirect.component';

export const routes: Routes = [
    {path: ":nickname", component: RedirectComponent},
    {path: "", component: HomePageComponent},
    {path: "**", component: NotFoundPageComponent}
];

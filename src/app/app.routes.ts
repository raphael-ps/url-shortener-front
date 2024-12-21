import { Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
import { RedirectComponent } from './components/redirect/redirect.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { UserRegisterComponent } from './components/user-register/user-register.component';

export const routes: Routes = [
    {path: ":nickname", component: RedirectComponent},
    {path: "", component: HomePageComponent},
    {path: "user/login", component: UserLoginComponent},
    {path: "user/register", component: UserRegisterComponent},
    {path: "**", component: NotFoundPageComponent}
];

import { Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
import { RedirectComponent } from './components/redirect/redirect.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { UserRegisterComponent } from './components/user-register/user-register.component';
import { UserHistoryComponent } from './components/user-history/user-history.component';
import { AuthGuard } from './auth-guard.service';
import { NoauthGuardService } from './noauth-guard.service';

export const routes: Routes = [
  { path: ':nickname', component: RedirectComponent },
  { path: '', component: HomePageComponent},
  {
    path: 'auth/login',
    component: UserLoginComponent,
    canActivate: [NoauthGuardService],
  },
  { path: 'auth/register', component: UserRegisterComponent },
  {
    path: 'user/history',
    component: UserHistoryComponent,
    canActivate: [AuthGuard],
  },
  { path: '**', component: NotFoundPageComponent },
];

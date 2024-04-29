import { Routes } from '@angular/router';
import { UploadComponent } from './upload/upload.component';
import { HomeComponent } from './home/home.component';
import { AuthResponseComponent } from './auth/auth-response/auth-response.component';
import { LogoutComponent } from './logout/logout.component';
import { MsalGuard } from '@azure/msal-angular';
import { LoginFailedComponent } from './login-failed/login-failed.component';

export const routes: Routes = [
  { path: 'auth-response', component: AuthResponseComponent },
  { path: 'upload', component: UploadComponent, canActivate: [MsalGuard] },
  { path: 'logout', component: LogoutComponent },
  { path: 'login-failed', component: LoginFailedComponent },
  { path: '', component: HomeComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

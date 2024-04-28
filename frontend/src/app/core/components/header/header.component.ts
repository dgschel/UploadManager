import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  constructor(private authService: MsalService) {}

  login() {
    // Use the redict flow to log in the user
    this.authService.loginRedirect();
  }

  logout() {
    // Use the redirect flow to log out the user. Clear the Browsercache and redirect to the postLogoutRedirectUri
    this.authService.logoutRedirect();
  }
}

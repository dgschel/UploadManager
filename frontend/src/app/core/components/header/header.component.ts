import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { InteractionStatus } from '@azure/msal-browser';

import { Subject, filter, takeUntil } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit, OnDestroy {
  private readonly _destroying$ = new Subject<void>();

  isAuthenticated: boolean = false;

  constructor(
    private authService: MsalService,
    private msalBroadcastService: MsalBroadcastService
  ) {}

  ngOnInit(): void {
    // inProgress$ is a subject provided by the MSAL service to track the state of the user's authentication
    // It is recommended to use 'none'-status before any interaction involving a user
    this.msalBroadcastService.inProgress$
      .pipe(
        filter(
          (status: InteractionStatus) => status === InteractionStatus.None
        ),
        takeUntil(this._destroying$)
      )
      .subscribe(() => {
        this.isAuthenticated =
          this.authService.instance.getActiveAccount() !== null;

        console.log('Account', this.authService.instance.getActiveAccount());
      });
  }

  login() {
    // Use the redict flow to log in the user
    this.authService.loginRedirect();
  }

  logout() {
    // Use the redirect flow to log out the user. Clear the Browsercache and redirect to the postLogoutRedirectUri
    this.authService.logoutRedirect();
  }

  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }
}

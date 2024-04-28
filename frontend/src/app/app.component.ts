import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { Subject, filter, takeUntil } from 'rxjs';

import {
  AuthenticationResult,
  EventMessage,
  EventType,
} from '@azure/msal-browser';
import { HeaderComponent } from './core/components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  private readonly _destroying$ = new Subject<void>();

  title = 'Upload Manager';

  constructor(
    private authService: MsalService,
    private msalBroadcastService: MsalBroadcastService
  ) {}

  ngOnInit(): void {
    // MSAL v3.x requires initialization of the application object
    // the method handleRedirectObservable() will initialize and handles the redirect flow
    this.authService.handleRedirectObservable().subscribe({
      next: (result) => console.log('Authentication result: ', result),
      error: (error) => {
        console.error('Error intializing MSAL: ', error);
      },
    });

    // MSAL events are managed by the MSAL Broadcast service
    // The events are available by subscribing to the msalSubject$
    this.msalBroadcastService.msalSubject$
      .pipe(
        filter(
          (msg: EventMessage) => msg.eventType === EventType.LOGIN_SUCCESS
        ),
        takeUntil(this._destroying$)
      )
      .subscribe((result: EventMessage) => {
        let payload = result.payload as AuthenticationResult;
        this.authService.instance.setActiveAccount(payload.account);
        console.log('Payload', payload);
      });
  }

  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }
}

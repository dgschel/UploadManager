import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { MsalService } from '@azure/msal-angular';

import { HeaderComponent } from './core/components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Upload Manager';

  constructor(private authService: MsalService) {}

  ngOnInit(): void {
    // MSAL v3.x requires initialization of the application object
    // the method handleRedirectObservable() will initialize and handles the redirect flow
    this.authService.handleRedirectObservable().subscribe({
      next: (result) => console.log('Authentication result: ', result),
      error: (error) => {
        console.error('Error intializing MSAL: ', error);
      },
    });
  }
}

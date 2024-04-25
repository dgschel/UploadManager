import { Component } from '@angular/core';
import { IntroComponent } from './components/intro/intro.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [IntroComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}

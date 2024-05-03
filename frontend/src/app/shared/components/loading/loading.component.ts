import { NgClass } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [NgClass],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss',
})
export class LoadingComponent {
  isLoading = input<boolean>(false);

  get loadingClass() {
    return this.isLoading() ? ['blur-sm', 'pointer-events-none'] : [];
  }
}

import { Component, signal } from '@angular/core';
import { LoadingComponent } from '../loading/loading.component';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [LoadingComponent],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
  // Manipulate the modal loading state from outside
  // Since the modal is only a wrapper to inject dynamic content into, we can use a signal to control the loading state
  isLoading = signal(false);
}

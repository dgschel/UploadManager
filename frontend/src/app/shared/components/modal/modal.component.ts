import { Component, EventEmitter, TemplateRef, ViewChild } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { Observable, Subject, finalize } from 'rxjs';
import { LoadingComponent } from '../loading/loading.component';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [LoadingComponent],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
  constructor(private modalService: ModalService) {}

  approve() {
    // return this.mockHttpCall().pipe(finalize(() => this.modalService.close()));
    return this.mockHttpCall();
  }

  mockHttpCall(): Observable<string> {
    return new Observable<string>((observer) => {
      setTimeout(() => {
        observer.next('Mock response');
        observer.complete();
      }, 3000);
    });
  }

  cancel(): void {
    this.modalService.close();
  }
}

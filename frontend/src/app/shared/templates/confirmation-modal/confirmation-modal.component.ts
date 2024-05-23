import {
  Component,
  EventEmitter,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { Subject, Observable, of, delay } from 'rxjs';

@Component({
  selector: 'app-confirmation-modal',
  standalone: true,
  imports: [],
  templateUrl: './confirmation-modal.component.html',
  styleUrl: './confirmation-modal.component.scss',
})
export class ConfirmationModalComponent {
  @ViewChild('container', { static: true, read: TemplateRef })
  containerTemplate: TemplateRef<any> | undefined;

  private startSubject = new Subject<boolean>();
  start$: Observable<boolean> = this.startSubject.asObservable();

  private submitSubject = new Subject<string>();
  submit$: Observable<string> = this.submitSubject.asObservable();

  private closeEvent = new EventEmitter<void>();
  @Output() onClose: EventEmitter<void> = this.closeEvent;

  protected submit(): void {
    this.startSubject.next(true);

    of('Mock HTTP request complete!')
      .pipe(delay(5000))
      .subscribe((message) => {
        this.submitSubject.next(message);
        this.startSubject.next(false);
      });
  }

  protected close(): void {
    this.closeEvent.emit();
  }
}

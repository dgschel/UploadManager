import { HttpClient, HttpClientModule } from '@angular/common/http';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { Subject, Observable, throwError, catchError, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-confirmation-modal',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './confirmation-modal.component.html',
  styleUrl: './confirmation-modal.component.scss',
})
export class ConfirmationModalComponent {
  @ViewChild('container', { static: true, read: TemplateRef })
  containerTemplate: TemplateRef<any> | undefined;

  @Input() fileName: string = '';

  private startSubject = new Subject<boolean>();
  start$: Observable<boolean> = this.startSubject.asObservable();

  private submitSubject = new Subject<string>();
  submit$: Observable<string> = this.submitSubject.asObservable();

  private errorSubject = new Subject<string>();
  error$: Observable<string> = this.errorSubject.asObservable();

  private closeEvent = new EventEmitter<void>();
  @Output() onClose: EventEmitter<void> = this.closeEvent;

  constructor(private http: HttpClient) {}

  protected submit(): void {
    this.http
      .delete(`${environment.endpoints.fileDelete}?filename=${this.fileName}`)
      .pipe(
        tap(() => this.startSubject.next(true)),
        catchError((err) => throwError(() => err)) // Pass the error to the next observer
      )
      .subscribe({
        next: (res) => console.log('File deleted!', res),
        error: (err) => this.errorSubject.next(err.message),
        complete: () => this.startSubject.next(false),
      });
  }

  protected close(): void {
    this.closeEvent.emit();
  }
}

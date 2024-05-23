import {
  Component,
  EventEmitter,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { Observable, Subject, delay, of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})
export class TestComponent {
  @ViewChild('actions', { static: true, read: TemplateRef }) actionsTemplate:
    | TemplateRef<any>
    | undefined;

  private submitSubject = new Subject<string>();
  submit$: Observable<string> = this.submitSubject.asObservable();

  private closeEvent = new EventEmitter<void>();
  @Output() onClose: EventEmitter<void> = this.closeEvent;

  protected submit(): void {
    of('Mock HTTP request complete!')
      .pipe(delay(2000))
      .subscribe((message) => {
        this.submitSubject.next(message);
      });
  }

  protected close(): void {
    this.closeEvent.emit();
  }
}

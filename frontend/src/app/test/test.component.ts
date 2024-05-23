import { Component, EventEmitter, TemplateRef, ViewChild } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [],
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss',
})
export class TestComponent {
  @ViewChild('actions', { static: true, read: TemplateRef }) actions:
    | TemplateRef<any>
    | undefined;

  private _confirmSubject = new Subject<string>();

  public get ConfirmSubject(): Observable<string> {
    return this._confirmSubject.asObservable();
  }

  protected confirm() {
    console.log('Confirming...');
    this._confirmSubject.next('Confirmed');
  }

  protected abort() {
    throw new Error('Method not implemented.');
  }
}

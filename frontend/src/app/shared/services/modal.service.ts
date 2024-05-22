import {
  ApplicationRef,
  ComponentRef,
  EnvironmentInjector,
  Injectable,
  ViewContainerRef,
  createComponent,
} from '@angular/core';
import { ModalComponent } from '../components/modal/modal.component';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  componentRef: ComponentRef<ModalComponent> | undefined;

  constructor(
    private appRef: ApplicationRef,
    private injector: EnvironmentInjector
  ) {}

  open(): void {
    this.componentRef = createComponent(ModalComponent, {
      environmentInjector: this.injector,
    });

    document.body.appendChild(this.componentRef.location.nativeElement);
    this.appRef.attachView(this.componentRef.hostView);
  }

  close(): void {
    this.componentRef?.destroy();
  }
}

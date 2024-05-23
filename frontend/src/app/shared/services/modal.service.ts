import {
  ApplicationRef,
  ComponentRef,
  EnvironmentInjector,
  Injectable,
  TemplateRef,
  createComponent,
} from '@angular/core';
import { ModalComponent } from '../components/modal/modal.component';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  modalCompRef: ComponentRef<ModalComponent> | undefined;

  constructor(
    private appRef: ApplicationRef,
    private injector: EnvironmentInjector
  ) {}

  createComponent(content: TemplateRef<any>) {
    const myContent = content.createEmbeddedView(null);
    this.modalCompRef = createComponent(ModalComponent, {
      environmentInjector: this.injector,
      projectableNodes: [myContent.rootNodes],
    });

    document.body.appendChild(this.modalCompRef.location.nativeElement);
    this.appRef.attachView(this.modalCompRef.hostView);
  }

  open(templateRef: TemplateRef<any>) {
    this.createComponent(templateRef);
  }

  close(): void {
    this.modalCompRef?.destroy();
    if (this.modalCompRef?.hostView) {
      this.appRef.detachView(this.modalCompRef?.hostView);
    }
  }
}

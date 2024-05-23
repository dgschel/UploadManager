import {
  ApplicationRef,
  ComponentRef,
  ElementRef,
  EnvironmentInjector,
  Injectable,
  TemplateRef,
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

  createComponent(content: TemplateRef<any>) {
    const myContent = content.createEmbeddedView(null);
    this.componentRef = createComponent(ModalComponent, {
      environmentInjector: this.injector,
      projectableNodes: [myContent.rootNodes],
    });

    document.body.appendChild(this.componentRef.location.nativeElement);
    this.appRef.attachView(this.componentRef.hostView);
  }

  open(templateRef: TemplateRef<any>) {
    this.createComponent(templateRef);

    return this.componentRef?.instance.onClose;
    // return this.componentRef?.instance.approve();
  }

  close(): void {
    this.componentRef?.destroy();
  }
}

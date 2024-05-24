import {
  AfterViewInit,
  Component,
  EnvironmentInjector,
  TemplateRef,
  ViewChild,
  computed,
  createComponent,
  input,
  output,
} from '@angular/core';

import {
  DataTablePagerComponent,
  NgxDatatableModule,
} from '@swimlane/ngx-datatable';

import {
  AllowedContentType,
  CustomBlobProperties,
  PrefixedBlobProperties,
} from '../../../shared/models/blob';
import {
  formatDocumentType,
  formatFileSize,
  removeFileExtension,
} from '../../../utils/file';
import { formatDate } from '../../../utils/date';
import { ModalService } from '../../../shared/services/modal.service';
import { ConfirmationModalComponent } from '../../../shared/templates/confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-download-list',
  standalone: true,
  imports: [NgxDatatableModule],
  templateUrl: './download-list.component.html',
  styleUrl: './download-list.component.scss',
})
export class DownloadListComponent implements AfterViewInit {
  prefixedBlobs = input.required<PrefixedBlobProperties[]>();
  blobs = computed(() => this.prefixedBlobs().flatMap((data) => data.blobs));
  removeBlob = output<CustomBlobProperties>();

  @ViewChild('pager') pager: DataTablePagerComponent | undefined;

  constructor(
    private modalService: ModalService,
    private injector: EnvironmentInjector
  ) {}

  ngAfterViewInit(): void {
    this.pager?.selectPage(1);
  }

  deleteBlob = (blob: CustomBlobProperties) => {
    this.removeBlob.emit(blob);

    const comp = createComponent(ConfirmationModalComponent, {
      environmentInjector: this.injector,
    });

    comp.instance.submit$.subscribe({
      next: (message: string) => {
        console.log('Submitted modal', message);
        this.modalService.close();
      },
    });

    comp.instance.onClose.subscribe({
      next: () => {
        console.log('Closed modal');
        this.modalService.close();
      },
    });

    const modalRef = this.modalService.open(
      comp.instance.containerTemplate as TemplateRef<any>
    );

    comp.instance.start$.subscribe({
      next: (isLoading: boolean) => {
        console.log('Loading...', isLoading);
        modalRef.instance.isLoading.set(isLoading);
      },
    });
  };

  getRowClass = () => 'transition-all duration-200 hover:bg-gray-100';

  getFormattedName = (fileName: string) => removeFileExtension(fileName);
  getFormattedSize = (size: number) => formatFileSize(size);
  getFormattedDate = (date: string) => formatDate(date);
  getFormattedDocumentType = (documentType: AllowedContentType) =>
    formatDocumentType(documentType);
}

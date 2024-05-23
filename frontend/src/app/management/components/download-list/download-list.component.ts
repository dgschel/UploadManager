import {
  AfterViewInit,
  Component,
  ElementRef,
  EnvironmentInjector,
  Injector,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  computed,
  createComponent,
  input,
} from '@angular/core';

import {
  DataTablePagerComponent,
  NgxDatatableModule,
} from '@swimlane/ngx-datatable';

import {
  AllowedContentType,
  PrefixedBlobProperties,
} from '../../../shared/models/blob';
import {
  formatDocumentType,
  formatFileSize,
  removeFileExtension,
} from '../../../utils/file';
import { formatDate } from '../../../utils/date';
import { ModalService } from '../../../shared/services/modal.service';
import { TestComponent } from '../../../test/test.component';

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

  @ViewChild('pager') pager: DataTablePagerComponent | undefined;

  constructor(
    private modalService: ModalService,
    private injector: EnvironmentInjector
  ) {}

  ngAfterViewInit(): void {
    this.pager?.selectPage(1);
  }

  deleteBlob = (blob: PrefixedBlobProperties) => {
    console.log('Deleting blob...', blob);
    const comp = createComponent(TestComponent, {
      environmentInjector: this.injector,
    });
    console.log(comp);

    comp.instance.ConfirmSubject.subscribe({
      next: (message: string) => {
        console.log('inside table', message);
        this.modalService.close();
      },
    });

    this.modalService
      .open(comp.instance.actions as TemplateRef<any>)
      ?.subscribe({ next: () => console.log('Modal is closing') });
  };

  onDelete = () => {
    console.log('Deleted blob');
  };

  onAbort = () => {
    console.log('Aborted deletion');
  };

  getRowClass = () => 'transition-all duration-200 hover:bg-gray-100';

  getFormattedName = (fileName: string) => removeFileExtension(fileName);
  getFormattedSize = (size: number) => formatFileSize(size);
  getFormattedDate = (date: string) => formatDate(date);
  getFormattedDocumentType = (documentType: AllowedContentType) =>
    formatDocumentType(documentType);
}

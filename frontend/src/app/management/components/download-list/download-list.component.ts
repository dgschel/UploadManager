import {
  AfterViewInit,
  Component,
  ElementRef,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  computed,
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
  @ViewChild('actions', { read: TemplateRef }) actions!: TemplateRef<any>;

  constructor(private modalService: ModalService) {}

  ngAfterViewInit(): void {
    this.pager?.selectPage(1);
  }

  deleteBlob = (blob: PrefixedBlobProperties) => {
    console.log('Deleting blob...', blob);
    this.modalService.open(this.actions)?.subscribe({
      next: (message: string) => console.log(message),
    });
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

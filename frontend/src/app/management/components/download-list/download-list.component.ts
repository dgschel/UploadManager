import { Component, computed, input } from '@angular/core';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';

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

@Component({
  selector: 'app-download-list',
  standalone: true,
  imports: [NgxDatatableModule],
  templateUrl: './download-list.component.html',
  styleUrl: './download-list.component.scss',
})
export class DownloadListComponent {
  prefixedBlobs = input.required<PrefixedBlobProperties[]>();
  blobs = computed(() => this.prefixedBlobs().flatMap((data) => data.blobs));

  getRowClass = () => 'transition-all duration-200 hover:bg-gray-100';

  getFormattedName = (fileName: string) => removeFileExtension(fileName);
  getFormattedSize = (size: number) => formatFileSize(size);
  getFormattedDate = (date: string) => formatDate(date);
  getFormattedDocumentType = (documentType: AllowedContentType) =>
    formatDocumentType(documentType);
}

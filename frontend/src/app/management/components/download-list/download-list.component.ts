import {
  AfterViewInit,
  Component,
  ViewChild,
  computed,
  input,
  output,
} from '@angular/core';

import {
  DataTableBodyRowComponent,
  DataTablePagerComponent,
  DatatableComponent,
  NgxDatatableModule,
} from '@swimlane/ngx-datatable';

import {
  AllowedContentType,
  CustomBlobProperties,
  PrefixedBlob,
  PrefixedBlobProperties,
} from '../../../shared/models/blob';
import {
  formatDocumentType,
  formatFileSize,
  removeFileExtension,
} from '../../../utils/file';
import { formatDate } from '../../../utils/date';
import {
  filterPrefixedBlobsByBlobName,
  findPrefixedBlobByBlobName,
} from '../../../utils/filter';
import { NgxDatatableRowDetail } from '../../../shared/models/datatable';

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
  maxPageSize = computed(() => Math.ceil(this.blobs().length / 10));
  removeBlob = output<PrefixedBlob>();

  @ViewChild('table') table: DatatableComponent | undefined;
  @ViewChild('pager') pager: DataTablePagerComponent | undefined;

  // if the viewport is less than 768px, the flexGrow value is 10, otherwise it is 1
  calculateFlexGrow = (): number => (window.innerWidth < 768 ? 10 : 1);

  // if the viewport is less than 768px, the height of the footer is 72px, otherwise it is 48px
  calculateFooterHeight = (): number => (window.innerWidth < 768 ? 72 : 48);

  ngAfterViewInit(): void {
    this.pager?.selectPage(1);
  }

  deleteBlob = (blob: CustomBlobProperties) => {
    const filteredPrefixedBlobs = filterPrefixedBlobsByBlobName(
      this.prefixedBlobs(),
      blob.name
    );

    const prefixedBlob: PrefixedBlob = findPrefixedBlobByBlobName(
      filteredPrefixedBlobs,
      blob.name
    );

    this.removeBlob.emit(prefixedBlob);
  };

  toggleExpandRow = (row: CustomBlobProperties) =>
    this.table?.rowDetail.toggleExpandRow(row);

  onDetailToggle = ($event: NgxDatatableRowDetail) =>
    console.log('Detail Toggled', $event);

  getRowClass = () => 'transition-all duration-200 hover:bg-gray-100';

  getFormattedName = (fileName: string) => removeFileExtension(fileName);
  getFormattedSize = (size: number) => formatFileSize(size);
  getFormattedDate = (date: string) => formatDate(date);
  getFormattedDocumentType = (documentType: AllowedContentType) =>
    formatDocumentType(documentType);
}

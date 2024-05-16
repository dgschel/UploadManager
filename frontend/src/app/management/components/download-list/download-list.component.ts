import { Component, computed, input } from '@angular/core';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import {
  CustomBlobProperties,
  PrefixedBlobProperties,
} from '../../../shared/models/blob';
import { formatFileSize } from '../../../utils/file';

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

  getFormattedSize = (size: number) => formatFileSize(size);
}

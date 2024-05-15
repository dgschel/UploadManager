import { Component, computed, input } from '@angular/core';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import {
  CustomBlobProperties,
  PrefixedBlobProperties,
} from '../../../shared/models/blob';

@Component({
  selector: 'app-download-list',
  standalone: true,
  imports: [NgxDatatableModule],
  templateUrl: './download-list.component.html',
  styleUrl: './download-list.component.scss',
})
export class DownloadListComponent {
  prefixedBlobs = input.required<PrefixedBlobProperties[]>();
  blobs = computed(() => {
    return this.prefixedBlobs().reduce((acc, curr) => {
      return acc.concat(curr.blobs);
    }, [] as CustomBlobProperties[]);
  });
}

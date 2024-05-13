import { Component, input } from '@angular/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { CustomBlobProperties } from '../../../shared/models/blob';

@Component({
  selector: 'app-download-list',
  standalone: true,
  imports: [NgxDatatableModule],
  templateUrl: './download-list.component.html',
  styleUrl: './download-list.component.scss',
})
export class DownloadListComponent {
  rows = input.required<CustomBlobProperties[]>();
}

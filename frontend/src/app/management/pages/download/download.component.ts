import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit, signal } from '@angular/core';

import { Observable, switchMap } from 'rxjs';

import { DownloadListComponent } from '../../components/download-list/download-list.component';
import { CustomBlobProperties } from '../../../shared/models/blob';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-download',
  standalone: true,
  imports: [HttpClientModule, DownloadListComponent],
  templateUrl: './download.component.html',
  styleUrl: './download.component.scss',
})
export class DownloadComponent implements OnInit {
  blobs = signal<CustomBlobProperties[]>([]);

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getBlobs().subscribe((data) => {
      this.blobs.set(data);
      console.log('Blobs: ', data);
    });
  }

  private getBlobs(): Observable<CustomBlobProperties[]> {
    return this.http.get<CustomBlobProperties[]>(
      environment.endpoints.fileDownload
    );
  }
}

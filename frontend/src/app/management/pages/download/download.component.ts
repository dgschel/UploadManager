import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit, signal } from '@angular/core';

import { Observable } from 'rxjs';

import { DownloadListComponent } from '../../components/download-list/download-list.component';
import { CustomBlobProperties } from '../../../shared/models/blob';
import { environment } from '../../../../environments/environment';
import { LoadingComponent } from '../../../shared/components/loading/loading.component';

@Component({
  selector: 'app-download',
  standalone: true,
  imports: [HttpClientModule, LoadingComponent, DownloadListComponent],
  templateUrl: './download.component.html',
  styleUrl: './download.component.scss',
})
export class DownloadComponent implements OnInit {
  blobs = signal<CustomBlobProperties[]>([]);
  isLoading = signal<boolean>(false);

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.isLoading.set(true);

    this.getBlobs().subscribe({
      next: (data) => this.handleFetchSuccess(data),
      error: (e) => this.handleFetchError(e),
    });
  }

  private handleFetchSuccess(data: CustomBlobProperties[]): void {
    this.isLoading.set(false);
    this.blobs.set(data);
    console.log('Blobs: ', data);
  }

  private handleFetchError(error: any): void {
    this.isLoading.set(false);
    console.error('Error: ', error);
  }

  private getBlobs(): Observable<CustomBlobProperties[]> {
    return this.http.get<CustomBlobProperties[]>(
      environment.endpoints.fileDownload
    );
  }
}

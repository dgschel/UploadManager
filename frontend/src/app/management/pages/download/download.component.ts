import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit, signal } from '@angular/core';

import { DownloadListComponent } from '../../components/download-list/download-list.component';
import { PrefixedBlobProperties } from '../../../shared/models/blob';
import { environment } from '../../../../environments/environment';
import { LoadingComponent } from '../../../shared/components/loading/loading.component';
import { HttpResultWrapper } from '../../../shared/models/http';

@Component({
  selector: 'app-download',
  standalone: true,
  imports: [HttpClientModule, LoadingComponent, DownloadListComponent],
  templateUrl: './download.component.html',
  styleUrl: './download.component.scss',
})
export class DownloadComponent implements OnInit {
  prefixedBlobs = signal<PrefixedBlobProperties[]>([]);
  isLoading = signal<boolean>(false);

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.isLoading.set(true);
    this.getBlobs().subscribe({
      next: (data) => this.handleFetchSuccess(data),
      error: (e) => this.handleFetchError(e),
    });
  }

  private handleFetchSuccess(
    data: HttpResultWrapper<PrefixedBlobProperties>
  ): void {
    this.isLoading.set(false);
    this.prefixedBlobs.set(data.result);
    console.log('Blobs: ', data);
  }

  private handleFetchError(error: any): void {
    this.isLoading.set(false);
    console.error('Error: ', error);
  }

  private getBlobs() {
    return this.http.get<HttpResultWrapper<PrefixedBlobProperties>>(
      environment.endpoints.fileDownload
    );
  }
}

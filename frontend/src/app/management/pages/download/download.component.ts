import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-download',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './download.component.html',
  styleUrl: './download.component.scss',
})
export class DownloadComponent {
  constructor(private http: HttpClient) {}

  listBlobs() {
    this.http.get(environment.endpoints.fileDownload).subscribe((data) => {
      console.log(data);
    });
  }
}

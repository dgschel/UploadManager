import { Component, signal } from '@angular/core';

import { UploadFilesComponent } from './components/upload-files/upload-files.component';
import { FilePropertyComponent } from './components/file-property/file-property.component';
import { LoadingComponent } from '../shared/components/loading/loading.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { UploadFailure, UploadSuccess } from '../shared/models/upload-response';
import { SuccessfulComponent } from '../shared/components/successful/successful.component';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [
    HttpClientModule,
    UploadFilesComponent,
    FilePropertyComponent,
    LoadingComponent,
    SuccessfulComponent,
  ],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.scss',
})
export class UploadComponent {
  files = signal<File[]>([]);
  isLoading = signal<boolean>(false);
  isUploadSuccess = signal<boolean>(true);

  constructor(private http: HttpClient) {}

  handleFileSelection = (files: File[]) => {
    this.files.set(files);
  };

  handleRemoveFile = (file: File) => {
    this.files.update((prevFiles) =>
      prevFiles.filter((f) => f.name !== file.name)
    );
  };

  upload = () => {
    const formdata = new FormData();
    this.isLoading.set(true);

    this.files().forEach((file) => {
      formdata.append('files', file);
    });

    this.http
      .post<UploadSuccess>(environment.endpoints.fileUpload, formdata)
      .subscribe({
        next: this.handleUploadSuccess,
        error: this.handleUploadFailure,
      });
  };

  handleUploadSuccess = (response: UploadSuccess) => {
    console.log('Upload successful: ', response.message);
    this.isLoading.set(false);
    this.files.set([]);
    this.isUploadSuccess.set(true);
  };

  handleUploadFailure = (error: UploadFailure) => {
    console.error('Upload failed', error.message);
    this.isLoading.set(false);
  };
}

import { Component, signal } from '@angular/core';

import { UploadFilesComponent } from './components/upload-files/upload-files.component';
import { FilePropertyComponent } from './components/file-property/file-property.component';
import { LoadingComponent } from '../shared/components/loading/loading.component';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [UploadFilesComponent, FilePropertyComponent, LoadingComponent],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.scss',
})
export class UploadComponent {
  files = signal<File[]>([]);
  isLoading = signal<boolean>(false);

  handleFileSelection = (files: File[]) => {
    this.files.set(files);
  };

  handleRemoveFile = (file: File) => {
    this.files.update((prevFiles) =>
      prevFiles.filter((f) => f.name !== file.name)
    );
  };

  upload = () => {
    this.isLoading.set(true);

    setTimeout(() => {
      this.isLoading.set(false);
    }, 3000);
  };
}

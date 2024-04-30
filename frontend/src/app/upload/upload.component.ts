import { Component, signal } from '@angular/core';

import { UploadFilesComponent } from './components/upload-files/upload-files.component';
import { FilePropertyComponent } from './components/file-property/file-property.component';
@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [UploadFilesComponent, FilePropertyComponent],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.scss',
})
export class UploadComponent {
  files = signal<File[]>([]);

  handleFileSelection(files: File[]) {
    console.log('Upload Component', files);
    this.files.set(files);
  }
}

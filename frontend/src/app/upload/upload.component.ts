import { Component } from '@angular/core';
import { UploadFilesComponent } from './components/upload-files/upload-files.component';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [UploadFilesComponent],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.scss',
})
export class UploadComponent {}

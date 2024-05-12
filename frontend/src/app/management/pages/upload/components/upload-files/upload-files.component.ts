import {
  Component,
  WritableSignal,
  signal,
  HostListener,
  output,
  OutputEmitterRef,
} from '@angular/core';
import { NgClass } from '@angular/common';
import { allowedMimeTypes } from '../../../../../shared/models/mime-types';
import { isValidMimeType } from '../../../../../utils/file';

@Component({
  selector: 'app-upload-files',
  standalone: true,
  imports: [NgClass],
  templateUrl: './upload-files.component.html',
  styleUrl: './upload-files.component.scss',
})
export class UploadFilesComponent {
  files: WritableSignal<File[]> = signal<File[]>([]);
  isDragging: WritableSignal<boolean> = signal<boolean>(false);

  // Developer Preview
  selectedFiles: OutputEmitterRef<File[]> = output<File[]>();

  getMimeTypes(): string[] {
    return allowedMimeTypes;
  }

  @HostListener('change', ['$event.target.files'])
  onChangedFiles(fileList: FileList) {
    const filesArray = Array.from(fileList); // convert FileList to array
    const validFiles = filesArray.filter(isValidMimeType);
    const limitedFiles = validFiles.slice(0, 5);

    this.isDragging.set(false);
    this.files.set(limitedFiles);
    this.selectedFiles.emit(limitedFiles);
  }

  @HostListener('dragover', ['$event'])
  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragging.set(true);
  }

  @HostListener('drop', ['$event'])
  onDrop(event: DragEvent) {
    event.preventDefault();

    if (!event.dataTransfer) return;

    this.onChangedFiles(event.dataTransfer.files);
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.isDragging.set(false);
  }
}

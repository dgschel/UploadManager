import {
  Component,
  WritableSignal,
  signal,
  HostListener,
  output,
  OutputEmitterRef,
} from '@angular/core';
import { NgClass } from '@angular/common';

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

  @HostListener('change', ['$event.target.files'])
  onChangedFiles(fileList: FileList) {
    const _files = Array.from(fileList); // convert FileList to array
    this.isDragging.set(false);
    this.files.set(_files);
    this.selectedFiles.emit(_files);
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

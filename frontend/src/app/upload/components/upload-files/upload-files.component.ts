import { Component, WritableSignal, signal } from '@angular/core';
import { NgClass } from '@angular/common';

import { FilePropertyComponent } from '../file-property/file-property.component';

@Component({
  selector: 'app-upload-files',
  standalone: true,
  imports: [NgClass, FilePropertyComponent],
  templateUrl: './upload-files.component.html',
  styleUrl: './upload-files.component.scss',
})
export class UploadFilesComponent {
  files: WritableSignal<Array<File>> = signal<Array<File>>([]);
  isDragging: WritableSignal<boolean> = signal<boolean>(false);

  onChangedFiles(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files) {
      this.files.set(Array.from(target.files));
    }
    this.isDragging.set(false);

    console.log('Files', this.files());
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragging.set(true);
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    console.log(event.dataTransfer?.files);
    if (event.dataTransfer?.files) {
      this.files.set(Array.from(event.dataTransfer.files));
    }
    this.isDragging.set(true);
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.isDragging.set(false);
  }
}

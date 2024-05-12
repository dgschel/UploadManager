import {
  Component,
  InputSignal,
  OutputEmitterRef,
  input,
  output,
} from '@angular/core';
import { formatFileSize } from '../../../../../utils/file';

@Component({
  selector: 'app-file-property',
  standalone: true,
  imports: [],
  templateUrl: './file-property.component.html',
  styleUrl: './file-property.component.scss',
})
export class FilePropertyComponent {
  // Developer-Preview feature: InputSignal
  file: InputSignal<File> = input.required<File>();

  // Developer Preview feature: OutputEmitterRef
  removeFile: OutputEmitterRef<File> = output<File>();

  get name() {
    return this.file().name;
  }

  get size() {
    return formatFileSize(this.file().size);
  }

  remove() {
    this.removeFile.emit(this.file());
  }
}

import {
  AfterViewInit,
  Component,
  Input,
  InputSignal,
  input,
} from '@angular/core';

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
}

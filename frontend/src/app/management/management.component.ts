import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { UploadComponent } from '../upload/upload.component';

@Component({
  selector: 'app-management',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  templateUrl: './management.component.html',
  styleUrl: './management.component.scss',
})
export class ManagementComponent {}

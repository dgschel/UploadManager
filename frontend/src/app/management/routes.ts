import { Routes } from '@angular/router';
import { ManagementComponent } from './management.component';
import { DownloadComponent } from './pages/download/download.component';
import { UploadComponent } from './pages/upload/upload.component';

export const ManagementRoutes: Routes = [
  {
    path: '',
    component: ManagementComponent,
  },
  { path: 'download', component: DownloadComponent },
  { path: 'upload', component: UploadComponent },
];

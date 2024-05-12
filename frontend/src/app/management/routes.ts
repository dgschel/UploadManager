import { Routes } from '@angular/router';
import { ManagementComponent } from './management.component';
import { DownloadComponent } from './pages/download/download.component';

export const ManagementRoutes: Routes = [
  {
    path: '',
    component: ManagementComponent,
    children: [{ path: 'download', component: DownloadComponent }],
  },
];

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit, computed, signal } from '@angular/core';

import { DownloadListComponent } from '../../components/download-list/download-list.component';
import { PrefixedBlobProperties } from '../../../shared/models/blob';
import { environment } from '../../../../environments/environment';
import { LoadingComponent } from '../../../shared/components/loading/loading.component';
import { HttpResultWrapper } from '../../../shared/models/http';
import { formatDate } from '../../../utils/date';

@Component({
  selector: 'app-download',
  standalone: true,
  imports: [HttpClientModule, LoadingComponent, DownloadListComponent],
  templateUrl: './download.component.html',
  styleUrl: './download.component.scss',
})
export class DownloadComponent implements OnInit {
  data = [
    {
      prefix: 'images/',
      blobs: [
        {
          name: 'app-services.png',
          url: 'https://stuploadmanagement001.blob.core.windows.net/e8f4db16-07e7-455f-a9c4-11d6eb05e217/images/app-services.png?sv=2023-11-03&st=2024-05-16T12%3A29%3A48Z&se=2024-05-16T12%3A34%3A48Z&sr=c&sp=r&sig=BzomUsmgQ%2B8lzZ%2BqE7NADr0Qc0dCM6DFNOE6wmKx1pM%3D',
          contentType: 'image/png',
          size: 23677,
          createdOn: '2024-05-10T07:44:29.000Z',
        },
        {
          name: 'azure-logo.jfif',
          url: 'https://stuploadmanagement001.blob.core.windows.net/e8f4db16-07e7-455f-a9c4-11d6eb05e217/images/azure-logo.jfif?sv=2023-11-03&st=2024-05-16T12%3A29%3A48Z&se=2024-05-16T12%3A34%3A48Z&sr=c&sp=r&sig=BzomUsmgQ%2B8lzZ%2BqE7NADr0Qc0dCM6DFNOE6wmKx1pM%3D',
          contentType: 'image/jpeg',
          size: 5695,
          createdOn: '2024-05-08T16:04:44.000Z',
        },
        {
          name: 'azure-success.jfif',
          url: 'https://stuploadmanagement001.blob.core.windows.net/e8f4db16-07e7-455f-a9c4-11d6eb05e217/images/azure-success.jfif?sv=2023-11-03&st=2024-05-16T12%3A29%3A48Z&se=2024-05-16T12%3A34%3A48Z&sr=c&sp=r&sig=BzomUsmgQ%2B8lzZ%2BqE7NADr0Qc0dCM6DFNOE6wmKx1pM%3D',
          contentType: 'image/jpeg',
          size: 133160,
          createdOn: '2024-05-08T16:04:44.000Z',
        },
        {
          name: 'azure_function.png',
          url: 'https://stuploadmanagement001.blob.core.windows.net/e8f4db16-07e7-455f-a9c4-11d6eb05e217/images/azure_function.png?sv=2023-11-03&st=2024-05-16T12%3A29%3A48Z&se=2024-05-16T12%3A34%3A48Z&sr=c&sp=r&sig=BzomUsmgQ%2B8lzZ%2BqE7NADr0Qc0dCM6DFNOE6wmKx1pM%3D',
          contentType: 'image/png',
          size: 29185,
          createdOn: '2024-05-08T16:04:44.000Z',
        },
        {
          name: 'azure_function.svg',
          url: 'https://stuploadmanagement001.blob.core.windows.net/e8f4db16-07e7-455f-a9c4-11d6eb05e217/images/azure_function.svg?sv=2023-11-03&st=2024-05-16T12%3A29%3A48Z&se=2024-05-16T12%3A34%3A48Z&sr=c&sp=r&sig=BzomUsmgQ%2B8lzZ%2BqE7NADr0Qc0dCM6DFNOE6wmKx1pM%3D',
          contentType: 'image/svg+xml',
          size: 3230,
          createdOn: '2024-05-08T16:04:44.000Z',
        },
        {
          name: 'bg-gradient.jpeg',
          url: 'https://stuploadmanagement001.blob.core.windows.net/e8f4db16-07e7-455f-a9c4-11d6eb05e217/images/bg-gradient.jpeg?sv=2023-11-03&st=2024-05-16T12%3A29%3A48Z&se=2024-05-16T12%3A34%3A48Z&sr=c&sp=r&sig=BzomUsmgQ%2B8lzZ%2BqE7NADr0Qc0dCM6DFNOE6wmKx1pM%3D',
          contentType: 'image/jpeg',
          size: 557198,
          createdOn: '2024-05-08T16:04:44.000Z',
        },
        {
          name: 'logo.jfif',
          url: 'https://stuploadmanagement001.blob.core.windows.net/e8f4db16-07e7-455f-a9c4-11d6eb05e217/images/logo.jfif?sv=2023-11-03&st=2024-05-16T12%3A29%3A48Z&se=2024-05-16T12%3A34%3A48Z&sr=c&sp=r&sig=BzomUsmgQ%2B8lzZ%2BqE7NADr0Qc0dCM6DFNOE6wmKx1pM%3D',
          contentType: 'image/jpeg',
          size: 53395,
          createdOn: '2024-05-10T07:45:03.000Z',
        },
        {
          name: 'logo.png',
          url: 'https://stuploadmanagement001.blob.core.windows.net/e8f4db16-07e7-455f-a9c4-11d6eb05e217/images/logo.png?sv=2023-11-03&st=2024-05-16T12%3A29%3A48Z&se=2024-05-16T12%3A34%3A48Z&sr=c&sp=r&sig=BzomUsmgQ%2B8lzZ%2BqE7NADr0Qc0dCM6DFNOE6wmKx1pM%3D',
          contentType: 'image/png',
          size: 282388,
          createdOn: '2024-05-08T20:53:20.000Z',
        },
        {
          name: 'logo_center_transparent.png',
          url: 'https://stuploadmanagement001.blob.core.windows.net/e8f4db16-07e7-455f-a9c4-11d6eb05e217/images/logo_center_transparent.png?sv=2023-11-03&st=2024-05-16T12%3A29%3A48Z&se=2024-05-16T12%3A34%3A48Z&sr=c&sp=r&sig=BzomUsmgQ%2B8lzZ%2BqE7NADr0Qc0dCM6DFNOE6wmKx1pM%3D',
          contentType: 'image/png',
          size: 3688,
          createdOn: '2024-05-10T07:45:03.000Z',
        },
        {
          name: 'web_service_web_service_web_service web_service web_service.. web_service.png',
          url: 'https://stuploadmanagement001.blob.core.windows.net/e8f4db16-07e7-455f-a9c4-11d6eb05e217/images/web_service_web_service_web_service%20web_service%20web_service..%20web_service.png?sv=2023-11-03&st=2024-05-16T12%3A29%3A48Z&se=2024-05-16T12%3A34%3A48Z&sr=c&sp=r&sig=BzomUsmgQ%2B8lzZ%2BqE7NADr0Qc0dCM6DFNOE6wmKx1pM%3D',
          contentType: 'image/png',
          size: 30110,
          createdOn: '2024-05-09T08:40:13.000Z',
        },
      ],
    },
    {
      prefix: 'videos/',
      blobs: [
        {
          name: 'Aufzeichnung 2024-05-09 105943.mp4',
          url: 'https://stuploadmanagement001.blob.core.windows.net/e8f4db16-07e7-455f-a9c4-11d6eb05e217/videos/Aufzeichnung%202024-05-09%20105943.mp4?sv=2023-11-03&st=2024-05-16T12%3A29%3A48Z&se=2024-05-16T12%3A34%3A48Z&sr=c&sp=r&sig=BzomUsmgQ%2B8lzZ%2BqE7NADr0Qc0dCM6DFNOE6wmKx1pM%3D',
          contentType: 'video/mp4',
          size: 1624348,
          createdOn: '2024-05-09T09:00:09.000Z',
        },
      ],
    },
    {
      prefix: 'images/',
      blobs: [
        {
          name: 'app-services.png',
          url: 'https://stuploadmanagement001.blob.core.windows.net/e8f4db16-07e7-455f-a9c4-11d6eb05e217/images/app-services.png?sv=2023-11-03&st=2024-05-16T12%3A29%3A48Z&se=2024-05-16T12%3A34%3A48Z&sr=c&sp=r&sig=BzomUsmgQ%2B8lzZ%2BqE7NADr0Qc0dCM6DFNOE6wmKx1pM%3D',
          contentType: 'image/png',
          size: 23677,
          createdOn: '2024-05-10T07:44:29.000Z',
        },
        {
          name: 'azure-logo.jfif',
          url: 'https://stuploadmanagement001.blob.core.windows.net/e8f4db16-07e7-455f-a9c4-11d6eb05e217/images/azure-logo.jfif?sv=2023-11-03&st=2024-05-16T12%3A29%3A48Z&se=2024-05-16T12%3A34%3A48Z&sr=c&sp=r&sig=BzomUsmgQ%2B8lzZ%2BqE7NADr0Qc0dCM6DFNOE6wmKx1pM%3D',
          contentType: 'image/jpeg',
          size: 5695,
          createdOn: '2024-05-08T16:04:44.000Z',
        },
        {
          name: 'azure-success.jfif',
          url: 'https://stuploadmanagement001.blob.core.windows.net/e8f4db16-07e7-455f-a9c4-11d6eb05e217/images/azure-success.jfif?sv=2023-11-03&st=2024-05-16T12%3A29%3A48Z&se=2024-05-16T12%3A34%3A48Z&sr=c&sp=r&sig=BzomUsmgQ%2B8lzZ%2BqE7NADr0Qc0dCM6DFNOE6wmKx1pM%3D',
          contentType: 'image/jpeg',
          size: 133160,
          createdOn: '2024-05-08T16:04:44.000Z',
        },
        {
          name: 'azure_function.png',
          url: 'https://stuploadmanagement001.blob.core.windows.net/e8f4db16-07e7-455f-a9c4-11d6eb05e217/images/azure_function.png?sv=2023-11-03&st=2024-05-16T12%3A29%3A48Z&se=2024-05-16T12%3A34%3A48Z&sr=c&sp=r&sig=BzomUsmgQ%2B8lzZ%2BqE7NADr0Qc0dCM6DFNOE6wmKx1pM%3D',
          contentType: 'image/png',
          size: 29185,
          createdOn: '2024-05-08T16:04:44.000Z',
        },
        {
          name: 'azure_function.svg',
          url: 'https://stuploadmanagement001.blob.core.windows.net/e8f4db16-07e7-455f-a9c4-11d6eb05e217/images/azure_function.svg?sv=2023-11-03&st=2024-05-16T12%3A29%3A48Z&se=2024-05-16T12%3A34%3A48Z&sr=c&sp=r&sig=BzomUsmgQ%2B8lzZ%2BqE7NADr0Qc0dCM6DFNOE6wmKx1pM%3D',
          contentType: 'image/svg+xml',
          size: 3230,
          createdOn: '2024-05-08T16:04:44.000Z',
        },
        {
          name: 'bg-gradient.jpeg',
          url: 'https://stuploadmanagement001.blob.core.windows.net/e8f4db16-07e7-455f-a9c4-11d6eb05e217/images/bg-gradient.jpeg?sv=2023-11-03&st=2024-05-16T12%3A29%3A48Z&se=2024-05-16T12%3A34%3A48Z&sr=c&sp=r&sig=BzomUsmgQ%2B8lzZ%2BqE7NADr0Qc0dCM6DFNOE6wmKx1pM%3D',
          contentType: 'image/jpeg',
          size: 557198,
          createdOn: '2024-05-08T16:04:44.000Z',
        },
        {
          name: 'logo.jfif',
          url: 'https://stuploadmanagement001.blob.core.windows.net/e8f4db16-07e7-455f-a9c4-11d6eb05e217/images/logo.jfif?sv=2023-11-03&st=2024-05-16T12%3A29%3A48Z&se=2024-05-16T12%3A34%3A48Z&sr=c&sp=r&sig=BzomUsmgQ%2B8lzZ%2BqE7NADr0Qc0dCM6DFNOE6wmKx1pM%3D',
          contentType: 'image/jpeg',
          size: 53395,
          createdOn: '2024-05-10T07:45:03.000Z',
        },
        {
          name: 'logo.png',
          url: 'https://stuploadmanagement001.blob.core.windows.net/e8f4db16-07e7-455f-a9c4-11d6eb05e217/images/logo.png?sv=2023-11-03&st=2024-05-16T12%3A29%3A48Z&se=2024-05-16T12%3A34%3A48Z&sr=c&sp=r&sig=BzomUsmgQ%2B8lzZ%2BqE7NADr0Qc0dCM6DFNOE6wmKx1pM%3D',
          contentType: 'image/png',
          size: 282388,
          createdOn: '2024-05-08T20:53:20.000Z',
        },
        {
          name: 'logo_center_transparent.png',
          url: 'https://stuploadmanagement001.blob.core.windows.net/e8f4db16-07e7-455f-a9c4-11d6eb05e217/images/logo_center_transparent.png?sv=2023-11-03&st=2024-05-16T12%3A29%3A48Z&se=2024-05-16T12%3A34%3A48Z&sr=c&sp=r&sig=BzomUsmgQ%2B8lzZ%2BqE7NADr0Qc0dCM6DFNOE6wmKx1pM%3D',
          contentType: 'image/png',
          size: 3688,
          createdOn: '2024-05-10T07:45:03.000Z',
        },
        {
          name: 'web_service_web_service_web_service web_service web_service.. web_service.png',
          url: 'https://stuploadmanagement001.blob.core.windows.net/e8f4db16-07e7-455f-a9c4-11d6eb05e217/images/web_service_web_service_web_service%20web_service%20web_service..%20web_service.png?sv=2023-11-03&st=2024-05-16T12%3A29%3A48Z&se=2024-05-16T12%3A34%3A48Z&sr=c&sp=r&sig=BzomUsmgQ%2B8lzZ%2BqE7NADr0Qc0dCM6DFNOE6wmKx1pM%3D',
          contentType: 'image/png',
          size: 30110,
          createdOn: '2024-05-09T08:40:13.000Z',
        },
      ],
    },
    {
      prefix: 'videos/',
      blobs: [
        {
          name: 'Aufzeichnung 2024-05-09 105943.mp4',
          url: 'https://stuploadmanagement001.blob.core.windows.net/e8f4db16-07e7-455f-a9c4-11d6eb05e217/videos/Aufzeichnung%202024-05-09%20105943.mp4?sv=2023-11-03&st=2024-05-16T12%3A29%3A48Z&se=2024-05-16T12%3A34%3A48Z&sr=c&sp=r&sig=BzomUsmgQ%2B8lzZ%2BqE7NADr0Qc0dCM6DFNOE6wmKx1pM%3D',
          contentType: 'video/mp4',
          size: 1624348,
          createdOn: '2024-05-09T09:00:09.000Z',
        },
      ],
    },
    {
      prefix: 'images/',
      blobs: [
        {
          name: 'app-services.png',
          url: 'https://stuploadmanagement001.blob.core.windows.net/e8f4db16-07e7-455f-a9c4-11d6eb05e217/images/app-services.png?sv=2023-11-03&st=2024-05-16T12%3A29%3A48Z&se=2024-05-16T12%3A34%3A48Z&sr=c&sp=r&sig=BzomUsmgQ%2B8lzZ%2BqE7NADr0Qc0dCM6DFNOE6wmKx1pM%3D',
          contentType: 'image/png',
          size: 23677,
          createdOn: '2024-05-10T07:44:29.000Z',
        },
        {
          name: 'azure-logo.jfif',
          url: 'https://stuploadmanagement001.blob.core.windows.net/e8f4db16-07e7-455f-a9c4-11d6eb05e217/images/azure-logo.jfif?sv=2023-11-03&st=2024-05-16T12%3A29%3A48Z&se=2024-05-16T12%3A34%3A48Z&sr=c&sp=r&sig=BzomUsmgQ%2B8lzZ%2BqE7NADr0Qc0dCM6DFNOE6wmKx1pM%3D',
          contentType: 'image/jpeg',
          size: 5695,
          createdOn: '2024-05-08T16:04:44.000Z',
        },
        {
          name: 'azure-success.jfif',
          url: 'https://stuploadmanagement001.blob.core.windows.net/e8f4db16-07e7-455f-a9c4-11d6eb05e217/images/azure-success.jfif?sv=2023-11-03&st=2024-05-16T12%3A29%3A48Z&se=2024-05-16T12%3A34%3A48Z&sr=c&sp=r&sig=BzomUsmgQ%2B8lzZ%2BqE7NADr0Qc0dCM6DFNOE6wmKx1pM%3D',
          contentType: 'image/jpeg',
          size: 133160,
          createdOn: '2024-05-08T16:04:44.000Z',
        },
        {
          name: 'azure_function.png',
          url: 'https://stuploadmanagement001.blob.core.windows.net/e8f4db16-07e7-455f-a9c4-11d6eb05e217/images/azure_function.png?sv=2023-11-03&st=2024-05-16T12%3A29%3A48Z&se=2024-05-16T12%3A34%3A48Z&sr=c&sp=r&sig=BzomUsmgQ%2B8lzZ%2BqE7NADr0Qc0dCM6DFNOE6wmKx1pM%3D',
          contentType: 'image/png',
          size: 29185,
          createdOn: '2024-05-08T16:04:44.000Z',
        },
        {
          name: 'azure_function.svg',
          url: 'https://stuploadmanagement001.blob.core.windows.net/e8f4db16-07e7-455f-a9c4-11d6eb05e217/images/azure_function.svg?sv=2023-11-03&st=2024-05-16T12%3A29%3A48Z&se=2024-05-16T12%3A34%3A48Z&sr=c&sp=r&sig=BzomUsmgQ%2B8lzZ%2BqE7NADr0Qc0dCM6DFNOE6wmKx1pM%3D',
          contentType: 'image/svg+xml',
          size: 3230,
          createdOn: '2024-05-08T16:04:44.000Z',
        },
        {
          name: 'bg-gradient.jpeg',
          url: 'https://stuploadmanagement001.blob.core.windows.net/e8f4db16-07e7-455f-a9c4-11d6eb05e217/images/bg-gradient.jpeg?sv=2023-11-03&st=2024-05-16T12%3A29%3A48Z&se=2024-05-16T12%3A34%3A48Z&sr=c&sp=r&sig=BzomUsmgQ%2B8lzZ%2BqE7NADr0Qc0dCM6DFNOE6wmKx1pM%3D',
          contentType: 'image/jpeg',
          size: 557198,
          createdOn: '2024-05-08T16:04:44.000Z',
        },
        {
          name: 'logo.jfif',
          url: 'https://stuploadmanagement001.blob.core.windows.net/e8f4db16-07e7-455f-a9c4-11d6eb05e217/images/logo.jfif?sv=2023-11-03&st=2024-05-16T12%3A29%3A48Z&se=2024-05-16T12%3A34%3A48Z&sr=c&sp=r&sig=BzomUsmgQ%2B8lzZ%2BqE7NADr0Qc0dCM6DFNOE6wmKx1pM%3D',
          contentType: 'image/jpeg',
          size: 53395,
          createdOn: '2024-05-10T07:45:03.000Z',
        },
        {
          name: 'logo.png',
          url: 'https://stuploadmanagement001.blob.core.windows.net/e8f4db16-07e7-455f-a9c4-11d6eb05e217/images/logo.png?sv=2023-11-03&st=2024-05-16T12%3A29%3A48Z&se=2024-05-16T12%3A34%3A48Z&sr=c&sp=r&sig=BzomUsmgQ%2B8lzZ%2BqE7NADr0Qc0dCM6DFNOE6wmKx1pM%3D',
          contentType: 'image/png',
          size: 282388,
          createdOn: '2024-05-08T20:53:20.000Z',
        },
        {
          name: 'logo_center_transparent.png',
          url: 'https://stuploadmanagement001.blob.core.windows.net/e8f4db16-07e7-455f-a9c4-11d6eb05e217/images/logo_center_transparent.png?sv=2023-11-03&st=2024-05-16T12%3A29%3A48Z&se=2024-05-16T12%3A34%3A48Z&sr=c&sp=r&sig=BzomUsmgQ%2B8lzZ%2BqE7NADr0Qc0dCM6DFNOE6wmKx1pM%3D',
          contentType: 'image/png',
          size: 3688,
          createdOn: '2024-05-10T07:45:03.000Z',
        },
        {
          name: 'web_service_web_service_web_service web_service web_service.. web_service.png',
          url: 'https://stuploadmanagement001.blob.core.windows.net/e8f4db16-07e7-455f-a9c4-11d6eb05e217/images/web_service_web_service_web_service%20web_service%20web_service..%20web_service.png?sv=2023-11-03&st=2024-05-16T12%3A29%3A48Z&se=2024-05-16T12%3A34%3A48Z&sr=c&sp=r&sig=BzomUsmgQ%2B8lzZ%2BqE7NADr0Qc0dCM6DFNOE6wmKx1pM%3D',
          contentType: 'image/png',
          size: 30110,
          createdOn: '2024-05-09T08:40:13.000Z',
        },
      ],
    },
    {
      prefix: 'videos/',
      blobs: [
        {
          name: 'Aufzeichnung 2024-05-09 105943.mp4',
          url: 'https://stuploadmanagement001.blob.core.windows.net/e8f4db16-07e7-455f-a9c4-11d6eb05e217/videos/Aufzeichnung%202024-05-09%20105943.mp4?sv=2023-11-03&st=2024-05-16T12%3A29%3A48Z&se=2024-05-16T12%3A34%3A48Z&sr=c&sp=r&sig=BzomUsmgQ%2B8lzZ%2BqE7NADr0Qc0dCM6DFNOE6wmKx1pM%3D',
          contentType: 'video/mp4',
          size: 1624348,
          createdOn: '2024-05-09T09:00:09.000Z',
        },
      ],
    },
    {
      prefix: 'images/',
      blobs: [
        {
          name: 'app-services.png',
          url: 'https://stuploadmanagement001.blob.core.windows.net/e8f4db16-07e7-455f-a9c4-11d6eb05e217/images/app-services.png?sv=2023-11-03&st=2024-05-16T12%3A29%3A48Z&se=2024-05-16T12%3A34%3A48Z&sr=c&sp=r&sig=BzomUsmgQ%2B8lzZ%2BqE7NADr0Qc0dCM6DFNOE6wmKx1pM%3D',
          contentType: 'image/png',
          size: 23677,
          createdOn: '2024-05-10T07:44:29.000Z',
        },
        {
          name: 'azure-logo.jfif',
          url: 'https://stuploadmanagement001.blob.core.windows.net/e8f4db16-07e7-455f-a9c4-11d6eb05e217/images/azure-logo.jfif?sv=2023-11-03&st=2024-05-16T12%3A29%3A48Z&se=2024-05-16T12%3A34%3A48Z&sr=c&sp=r&sig=BzomUsmgQ%2B8lzZ%2BqE7NADr0Qc0dCM6DFNOE6wmKx1pM%3D',
          contentType: 'image/jpeg',
          size: 5695,
          createdOn: '2024-05-08T16:04:44.000Z',
        },
        {
          name: 'azure-success.jfif',
          url: 'https://stuploadmanagement001.blob.core.windows.net/e8f4db16-07e7-455f-a9c4-11d6eb05e217/images/azure-success.jfif?sv=2023-11-03&st=2024-05-16T12%3A29%3A48Z&se=2024-05-16T12%3A34%3A48Z&sr=c&sp=r&sig=BzomUsmgQ%2B8lzZ%2BqE7NADr0Qc0dCM6DFNOE6wmKx1pM%3D',
          contentType: 'image/jpeg',
          size: 133160,
          createdOn: '2024-05-08T16:04:44.000Z',
        },
        {
          name: 'azure_function.png',
          url: 'https://stuploadmanagement001.blob.core.windows.net/e8f4db16-07e7-455f-a9c4-11d6eb05e217/images/azure_function.png?sv=2023-11-03&st=2024-05-16T12%3A29%3A48Z&se=2024-05-16T12%3A34%3A48Z&sr=c&sp=r&sig=BzomUsmgQ%2B8lzZ%2BqE7NADr0Qc0dCM6DFNOE6wmKx1pM%3D',
          contentType: 'image/png',
          size: 29185,
          createdOn: '2024-05-08T16:04:44.000Z',
        },
        {
          name: 'azure_function.svg',
          url: 'https://stuploadmanagement001.blob.core.windows.net/e8f4db16-07e7-455f-a9c4-11d6eb05e217/images/azure_function.svg?sv=2023-11-03&st=2024-05-16T12%3A29%3A48Z&se=2024-05-16T12%3A34%3A48Z&sr=c&sp=r&sig=BzomUsmgQ%2B8lzZ%2BqE7NADr0Qc0dCM6DFNOE6wmKx1pM%3D',
          contentType: 'image/svg+xml',
          size: 3230,
          createdOn: '2024-05-08T16:04:44.000Z',
        },
        {
          name: 'bg-gradient.jpeg',
          url: 'https://stuploadmanagement001.blob.core.windows.net/e8f4db16-07e7-455f-a9c4-11d6eb05e217/images/bg-gradient.jpeg?sv=2023-11-03&st=2024-05-16T12%3A29%3A48Z&se=2024-05-16T12%3A34%3A48Z&sr=c&sp=r&sig=BzomUsmgQ%2B8lzZ%2BqE7NADr0Qc0dCM6DFNOE6wmKx1pM%3D',
          contentType: 'image/jpeg',
          size: 557198,
          createdOn: '2024-05-08T16:04:44.000Z',
        },
        {
          name: 'logo.jfif',
          url: 'https://stuploadmanagement001.blob.core.windows.net/e8f4db16-07e7-455f-a9c4-11d6eb05e217/images/logo.jfif?sv=2023-11-03&st=2024-05-16T12%3A29%3A48Z&se=2024-05-16T12%3A34%3A48Z&sr=c&sp=r&sig=BzomUsmgQ%2B8lzZ%2BqE7NADr0Qc0dCM6DFNOE6wmKx1pM%3D',
          contentType: 'image/jpeg',
          size: 53395,
          createdOn: '2024-05-10T07:45:03.000Z',
        },
        {
          name: 'logo.png',
          url: 'https://stuploadmanagement001.blob.core.windows.net/e8f4db16-07e7-455f-a9c4-11d6eb05e217/images/logo.png?sv=2023-11-03&st=2024-05-16T12%3A29%3A48Z&se=2024-05-16T12%3A34%3A48Z&sr=c&sp=r&sig=BzomUsmgQ%2B8lzZ%2BqE7NADr0Qc0dCM6DFNOE6wmKx1pM%3D',
          contentType: 'image/png',
          size: 282388,
          createdOn: '2024-05-08T20:53:20.000Z',
        },
        {
          name: 'logo_center_transparent.png',
          url: 'https://stuploadmanagement001.blob.core.windows.net/e8f4db16-07e7-455f-a9c4-11d6eb05e217/images/logo_center_transparent.png?sv=2023-11-03&st=2024-05-16T12%3A29%3A48Z&se=2024-05-16T12%3A34%3A48Z&sr=c&sp=r&sig=BzomUsmgQ%2B8lzZ%2BqE7NADr0Qc0dCM6DFNOE6wmKx1pM%3D',
          contentType: 'image/png',
          size: 3688,
          createdOn: '2024-05-10T07:45:03.000Z',
        },
        {
          name: 'web_service_web_service_web_service web_service web_service.. web_service.png',
          url: 'https://stuploadmanagement001.blob.core.windows.net/e8f4db16-07e7-455f-a9c4-11d6eb05e217/images/web_service_web_service_web_service%20web_service%20web_service..%20web_service.png?sv=2023-11-03&st=2024-05-16T12%3A29%3A48Z&se=2024-05-16T12%3A34%3A48Z&sr=c&sp=r&sig=BzomUsmgQ%2B8lzZ%2BqE7NADr0Qc0dCM6DFNOE6wmKx1pM%3D',
          contentType: 'image/png',
          size: 30110,
          createdOn: '2024-05-09T08:40:13.000Z',
        },
      ],
    },
    {
      prefix: 'videos/',
      blobs: [
        {
          name: 'Aufzeichnung 2024-05-09 105943.mp4',
          url: 'https://stuploadmanagement001.blob.core.windows.net/e8f4db16-07e7-455f-a9c4-11d6eb05e217/videos/Aufzeichnung%202024-05-09%20105943.mp4?sv=2023-11-03&st=2024-05-16T12%3A29%3A48Z&se=2024-05-16T12%3A34%3A48Z&sr=c&sp=r&sig=BzomUsmgQ%2B8lzZ%2BqE7NADr0Qc0dCM6DFNOE6wmKx1pM%3D',
          contentType: 'video/mp4',
          size: 1624348,
          createdOn: '2024-05-09T09:00:09.000Z',
        },
      ],
    },
  ];
  prefixedBlobs = signal<PrefixedBlobProperties[]>(this.data as any);
  filteredPrefixedBlobs = computed(() => {
    const query = this.searchQuery().toLowerCase();
    return this.prefixedBlobs().map((prefixedBlob) => {
      return {
        ...prefixedBlob,
        blobs: prefixedBlob.blobs.filter(
          (blob) =>
            blob.name.toLowerCase().includes(query) ||
            formatDate(blob.createdOn).toLowerCase().includes(query)
        ),
      };
    });
  });
  isLoading = signal<boolean>(false);
  searchQuery = signal<string>('');

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // this.isLoading.set(true);
    // this.getBlobs().subscribe({
    //   next: (data) => this.handleFetchSuccess(data),
    //   error: (e) => this.handleFetchError(e),
    // });
  }

  onSearchQueryUpdated(value: string): void {
    this.searchQuery.set(value);
  }

  private handleFetchSuccess(
    data: HttpResultWrapper<PrefixedBlobProperties>
  ): void {
    this.isLoading.set(false);
    this.prefixedBlobs.set(data.result);
    console.log('Blobs: ', data);
  }

  private handleFetchError(error: any): void {
    this.isLoading.set(false);
    console.error('Error: ', error);
  }

  private getBlobs() {
    return this.http.get<HttpResultWrapper<PrefixedBlobProperties>>(
      environment.endpoints.fileDownload
    );
  }
}

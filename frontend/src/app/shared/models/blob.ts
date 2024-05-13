import { allowedMimeTypes } from './mime-types';

export type ContentType = (typeof allowedMimeTypes)[number];

export type CustomBlobProperties = {
  name: string;
  url: string;
  contentType: ContentType;
  size: number;
  createdOn: Date;
};

import { allowedMimeTypes } from './mime-types';

export type AllowedContentType = (typeof allowedMimeTypes)[number];

export type CustomBlobProperties = {
  name: string;
  url: string;
  contentType: AllowedContentType;
  size: number;
  createdOn: Date;
};

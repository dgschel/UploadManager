import { allowedMimeTypes } from './mime-types';

export type AllowedContentType = (typeof allowedMimeTypes)[number];

export type CustomBlobProperties = {
  name: string;
  url: string;
  contentType: AllowedContentType;
  size: number;
  createdOn: Date;
};

export type PrefixedBlobProperties = {
  prefix: string;
  blobs: CustomBlobProperties[];
};

export type PrefixedBlob = {
  prefix: string;
  blob: CustomBlobProperties
}
import { AllowedContentType } from '../shared/models/blob';
import { allowedMimeTypes } from '../shared/models/mime-types';

export const formatFileSize = (size: number): string => {
  const units = ['B', 'KB', 'MB', 'GB'];
  let index = 0;
  while (size >= 1024 && index < units.length - 1) {
    size /= 1024;
    index++;
  }
  return `${size.toFixed(2)} ${units[index]}`;
};

export const isValidMimeType = (file: File): boolean =>
  allowedMimeTypes.includes(file.type as AllowedContentType);

export const documentTypeMap: Record<AllowedContentType, string> = {
  'image/bmp': 'BMP',
  'image/gif': 'GIF',
  'image/jpeg': 'JPEG',
  'image/png': 'PNG',
  'image/svg+xml': 'SVG',
  'image/webp': 'WEBP',
  'video/mp4': 'MP4',
  'video/mpeg': 'MPEG',
  'video/quicktime': 'QUICKTIME',
  'video/webm': 'WEBM',
  'video/x-flv': 'FLV',
  'video/x-msvideo': 'AVI',
};

export const formatDocumentType = (documentType: AllowedContentType): string =>
  documentTypeMap[documentType];

export interface Upload {
  upload(files: File[]): Promise<File[]>;
}

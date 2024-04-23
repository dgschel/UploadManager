import { FormData } from "undici";

export interface FileUploader {
  uploadFiles(formData: FormData): Promise<File[]>;
}

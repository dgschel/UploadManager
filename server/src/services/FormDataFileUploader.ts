import { FormData } from "undici";
import { FileUploader } from "../models/FileUploader";

export class FormDataFileUploader implements FileUploader {
  async uploadFiles(formData: FormData): Promise<File[]> {
    const files: File[] = [];

    const formDataValues = formData.getAll("files");

    for (const file of formDataValues) {
      if (file instanceof File) {
        files.push(file);
      }
    }

    return files;
  }
}

import { FormData } from "undici";
import { Upload } from "../models/Upload";

export class AzureFileUploader implements Upload {
  async upload(formData: FormData): Promise<File[]> {
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

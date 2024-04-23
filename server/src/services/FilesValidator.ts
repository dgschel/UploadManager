import { FormData } from "undici";

export class FilesValidator {
  static hasFiles(formData: FormData): boolean {
    return formData.has("files");
  }

  static validateFilesPresence(formDataValues: any[]): boolean {
    return formDataValues.length > 0;
  }
}

import { FormData } from "undici";

export class FormDataValidator {
  static hasFiles(formData: FormData): boolean {
    return formData.has("files");
  }

  static validateFilesPresence(formDataValues: any[]): boolean {
    return formDataValues.length > 0;
  }
}

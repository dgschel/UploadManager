import { FormData } from "undici";

export interface Upload {
  upload(formData: FormData): Promise<File[]>;
}

import { HttpRequest } from "@azure/functions";

export async function getFormDataFiles(request: HttpRequest): Promise<any[]> {
  const formData = await request.formData();
  return formData.getAll("files");
}

export async function getFiles(formData): Promise<File[]> {
  const formDataValues = formData.getAll("files");

  const files = formDataValues.map((formDataValue) => {
    if (formDataValue instanceof File) {
      return formDataValue;
    }
  });

  return files;
}

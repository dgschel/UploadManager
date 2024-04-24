import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";

import { Upload } from "../models/Upload";
import { Config } from "../models/Config";
import { AzureFileUploader } from "../services/AzureFileUploader";
import { FormDataValidator } from "../services/FormDataValidator";
import { MimeTypesValidator } from "../services/MimeTypesValidator";
import { configMimeTypesBlobInput } from "../bindings/blobStorage";

export async function uploadFiles(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  context.log(`Http function processed request for url "${request.url}"`);

  try {
    // Retrieve the config file from the blob storage input binding
    // The config file contains the allowed MIME-Types to upload files
    // The type is either undefined or a custom type Config
    const config = context.extraInputs.get(configMimeTypesBlobInput);

    if (!config) {
      return { body: `Missing config file for allowed MIME-Types` };
    }

    const formData = await request.formData();

    if (!FormDataValidator.hasFiles(formData)) {
      return { body: `Specify a key with name 'files'` };
    }

    const formDataValues = formData.getAll("files");

    if (!FormDataValidator.validateFilesPresence(formDataValues)) {
      return { body: `Upload atleast one file` };
    }

    const files: File[] = formDataValues.map((file) => {
      if (file instanceof File) {
        return file;
      }
    });

    const mimeTypesValidator = new MimeTypesValidator(config as Config);
    const allowedFilesToUpload = files.filter(mimeTypesValidator.hasAllowedMimeType);
    context.log(allowedFilesToUpload);
    
    const azureFileUploader: Upload = new AzureFileUploader("uploads", context);
    const uploadedFiles = await azureFileUploader.upload(allowedFilesToUpload);

    context.log(uploadedFiles);
  } catch (error) {
    context.error(error);
    return { body: `Specify a body to upload files` };
  }

  return { body: `Hello, world!` };
}

app.http("upload-files", {
  methods: ["POST"],
  authLevel: "function",
  extraInputs: [configMimeTypesBlobInput],
  handler: uploadFiles,
});

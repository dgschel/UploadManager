import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";

import { Config } from "../models/config";
import { AzureFileUploader } from "../services/azure-file-uploader";
import { MimeTypesValidator } from "../services/mime-type-validator";
import { configMimeTypesBlobInput } from "../bindings/blobStorage";
import { validateFormData } from "../utils/validate-form-data";
import { getFiles } from "../utils/file";

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
    await validateFormData(formData);
    const files = await getFiles(formData);

    const mimeTypesValidator = new MimeTypesValidator(config as Config);
    const allowedFilesToUpload = files.filter(mimeTypesValidator.hasAllowedMimeType);
    context.log("Allowed Files to upload", allowedFilesToUpload);

    const azureFileUploader = new AzureFileUploader("uploads", context);
    const uploadedFiles = await azureFileUploader.upload(allowedFilesToUpload);

    context.log("Uploaded Files to Azure", uploadedFiles);
  } catch (error) {
    context.error(error);
    return { body: error.message };
  }

  return { body: `Hello, world!` };
}

app.http("upload-files", {
  methods: ["POST"],
  authLevel: "function",
  extraInputs: [configMimeTypesBlobInput],
  handler: uploadFiles,
});

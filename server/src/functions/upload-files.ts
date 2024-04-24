import { app, input, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";

import { Upload } from "../models/Upload";
import { Config } from "../models/Config";
import { AzureFileUploader } from "../services/AzureFileUploader";
import { FormDataValidator } from "../services/FormDataValidator";
import { MimeTypesValidator } from "../services/MimeTypesValidator";

const configMimeTypesBlobInput = input.storageBlob({
  path: "configs/mime-types.json",
  connection: "AzureWebJobsStorage",
});

export async function uploadFiles(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  context.log(`Http function processed request for url "${request.url}"`);

  try {
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

    const azureFileUploader: Upload = new AzureFileUploader();
    const files = await azureFileUploader.upload(formData);

    const mimeTypesValidator = new MimeTypesValidator(config as Config);
    const allowedFilesToUpload = files.filter(mimeTypesValidator.hasAllowedMimeType);

    context.log({ files, allowedFilesToUpload });
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

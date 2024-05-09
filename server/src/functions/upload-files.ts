import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";

import { Config } from "../models/config.js";
import { AzureFileUploader } from "../services/azure-file-uploader.js";
import { MimeTypesValidator } from "../services/mime-type-validator.js";
import { configMimeTypesBlobInput } from "../bindings/blobStorage.js";
import { validateFormData } from "../utils/validate-form-data.js";
import { getFiles } from "../utils/file.js";
import { validateToken } from "../utils/validate-jwt-token.js";

export async function uploadFiles(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  context.log(`Http function processed request for url "${request.url}"`);

  const token = request.headers.get("Authorization");

  if (!token) {
    return { jsonBody: { message: "Missing JWT token" } };
  }

  const value = token.split(" ")[1];

  try {
    // Validate the JWT token and retrieve the sub claim
    // The sub claim is the unique identifier of the user in Azure AD B2C
    const { sub } = await validateToken(value, process.env["APPLICATION_ID_UPLOAD_FILES"]);

    context.log("JWT token is valid");

    // Retrieve the config file from the blob storage input binding
    // The config file contains the allowed MIME-Types to upload files
    // The type is either undefined or a custom type Config
    const config = context.extraInputs.get(configMimeTypesBlobInput);

    if (!config) {
      return { jsonBody: { message: `Missing config file for allowed MIME-Types` } };
    }

    const formData = await request.formData();
    await validateFormData(formData);
    const files = await getFiles(formData);

    const mimeTypesValidator = new MimeTypesValidator(config as Config);
    const allowedFilesToUpload = files.filter(mimeTypesValidator.hasAllowedMimeType);
    context.log("Allowed Files to upload", allowedFilesToUpload);

    const azureFileUploader = new AzureFileUploader(sub, context);
    const uploadedFiles = await azureFileUploader.upload(allowedFilesToUpload);

    context.log("Uploaded Files to Azure", uploadedFiles);
    const fileNames = uploadedFiles.map((file) => file.name);

    return { jsonBody: { message: `Uploading files to Azure was successful`, fileNames } };
  } catch (error) {
    context.error(`Failed to upload files to Azure: ${error.message}`);
    // throw new Error(`Failed to upload files to Azure: ${error.message}`);
    return { jsonBody: { message: error.message }, status: 500 };
  }
}

app.http("upload-files", {
  methods: ["POST"],
  authLevel: "anonymous",
  extraInputs: [configMimeTypesBlobInput],
  handler: uploadFiles,
});

import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";

import { FileUploader } from "../models/FileUploader";
import { FilesValidator } from "../services/FilesValidator";
import { FormDataFileUploader } from "../services/FormDataFileUploader";

export async function uploadFiles(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  context.log(`Http function processed request for url "${request.url}"`);

  try {
    const formData = await request.formData();

    if (!FilesValidator.hasFiles(formData)) {
      return { body: `Specify a key with name 'files'` };
    }

    const formDataValues = formData.getAll("files");

    if (!FilesValidator.validateFilesPresence(formDataValues)) {
      return { body: `Upload atleast one file` };
    }

    const fileUploader: FileUploader = new FormDataFileUploader();
    const files = await fileUploader.uploadFiles(formData);

    context.log(files);
  } catch (error) {
    return { body: `Specify a body to upload files` };
  }

  return { body: `Hello, world!` };
}

app.http("upload-files", {
  methods: ["POST"],
  authLevel: "function",
  handler: uploadFiles,
});

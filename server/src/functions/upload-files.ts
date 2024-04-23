import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";

export async function uploadFiles(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  context.log(`Http function processed request for url "${request.url}"`);

  try {
    const formData = await request.formData();

    if (!formData.has("files")) {
      return { body: `Specify a key with name 'files'` };
    }

    const formDataValues = formData.getAll("files");

    if (formDataValues.length === 0) {
      return { body: `Upload atleast one file` };
    }

    let files: File[] = [];

    for (const file of formDataValues) {
      if (file instanceof File) {
        files.push(file);
      }
    }

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

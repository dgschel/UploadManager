import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { validateToken } from "../utils/validate-jwt-token.js";
import { AzureFileDownloader } from "../services/azure-file-downloader.js";

export async function downloadFiles(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  context.log(`Http function processed request for url "${request.url}"`);

  const token = request.headers.get("Authorization");

  if (!token) {
    return { jsonBody: { message: "Missing JWT token" } };
  }

  const value = token.split(" ")[1];

  try {
    // Validate the JWT token and retrieve the sub claim
    // The sub claim is the unique identifier of the user in Azure AD B2C
    const { sub } = await validateToken(value, process.env["APPLICATION_ID_DOWNLOAD_FILES"]);

    context.log("JWT token is valid");

    // Retrieve the files from Azure Storage
    const downloader = new AzureFileDownloader(sub, context);
    const result = await downloader.listBlobsByHierarchy();

    context.log("Listing blobs by hierarchy was successful", result);

    return { jsonBody: { message: `Downloading files from Azure was successful`, result } };
  } catch (error) {
    context.error(`Failed to upload files to Azure: ${error.message}`);
    return { jsonBody: { message: error.message }, status: 500 };
  }
}

app.http("download-files", {
  methods: ["GET"],
  authLevel: "anonymous",
  handler: downloadFiles,
});

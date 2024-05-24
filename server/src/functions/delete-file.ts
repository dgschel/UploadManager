import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { validateToken } from "../utils/validate-jwt-token.js";

export async function deleteFile(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  context.log(`Http function processed request for url "${request.url}"`);

  const token = request.headers.get("Authorization");

  if (!token) {
    return { jsonBody: { message: "Missing JWT token" } };
  }

  const value = token.split(" ")[1];

  try {
    // Validate the JWT token and retrieve the sub claim
    // The sub claim is the unique identifier of the user in Azure AD B2C
    const { sub } = await validateToken(value, process.env["placeholder"]);

    context.log("JWT token is valid");

    return { jsonBody: { message: `placeholder` } };
  } catch (error) {
    context.error(`Failed to delete file in Azure: ${error.message}`);
    return { jsonBody: { message: error.message }, status: 500 };
  }
}

app.http("delete-file", {
  methods: ["GET", "POST"],
  authLevel: "anonymous",
  handler: deleteFile,
});

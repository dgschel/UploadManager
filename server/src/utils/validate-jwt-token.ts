import { verify, VerifyOptions } from "azure-ad-verify-token";
import { JwtPayload } from "jsonwebtoken";

export async function validateToken(token: string, audience: string): Promise<JwtPayload> {
  const options: VerifyOptions = {
    jwksUri: "https://uploadmanager.b2clogin.com/uploadmanager.onmicrosoft.com/discovery/v2.0/keys?p=B2C_1_signupsignin1", // This is the JWKS URL of the tenant
    issuer: process.env.ISSUER, // This is the Issuer URL of the application accessing the tenant. In Azure B2C the Directory (tenant) ID
    audience // This is the Application ID of the application accessing the tenant
  };

  try {
    // Verify the token and return the payload as JwtPayload. Ignore the type string
    return (await verify(token, options)) as JwtPayload;
  } catch (error) {
    throw new Error(`Failed to validate token`);
  }
}

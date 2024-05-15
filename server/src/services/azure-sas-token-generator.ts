import { InvocationContext } from "@azure/functions";
import { BlobSASPermissions, BlobServiceClient, ContainerClient, ContainerSASPermissions } from "@azure/storage-blob";

export class AzureSASTokenGenerator {
  constructor(private readonly _blobServiceClient: BlobServiceClient, private readonly _context: InvocationContext) {}

  // This method generates a SAS token for a container
  generateContainerSASUrl = async (containerName: string): Promise<string> => {
    const containerClient = this._blobServiceClient.getContainerClient(containerName);

    return containerClient.generateSasUrl({
      permissions: ContainerSASPermissions.parse("r"), // Set the permission on the container to read with helper method
      startsOn: new Date(), // Set the start time
      expiresOn: new Date(Date.now() + 5 * 60 * 1000), // Set the expiry time to 5 minutes from now
    });
  };

  // This method generates a SAS token for a blob
  generateBlobSASUrl = async (containerName: string, blobName: string): Promise<string> => {
    const containerClient = this._blobServiceClient.getContainerClient(containerName);
    const blobClient = containerClient.getBlobClient(blobName);

    return blobClient.generateSasUrl({
      permissions: BlobSASPermissions.parse("r"),
      startsOn: new Date(),
      expiresOn: new Date(Date.now() + 5 * 60 * 1000),
    });
  };
}

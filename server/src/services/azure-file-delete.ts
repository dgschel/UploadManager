import { BlobDeleteIfExistsResponse, BlobDeleteOptions, BlobServiceClient, ContainerClient } from "@azure/storage-blob";
import { InvocationContext } from "@azure/functions";

export class AzureFileDelete {
  _blobServiceClient: BlobServiceClient;
  _containerName: string;
  _context: InvocationContext;

  constructor(containerName: string, context: InvocationContext) {
    this._blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AzureWebJobsStorage);
    this._containerName = containerName;
    this._context = context;
  }

  async delete(blobName: string): Promise<BlobDeleteIfExistsResponse> {
    const containerClient: ContainerClient = this._blobServiceClient.getContainerClient(this._containerName);
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    const options: BlobDeleteOptions = { deleteSnapshots: "include" };

    try {
      return await blockBlobClient.deleteIfExists(options);
    } catch (error) {
      this._context.error(`Failed to delete file in Azure: ${error.message}`);
      throw new Error(`Failed to delete file in Azure: ${error.message}`, error);
    }
  }
}

import { BlobServiceClient, ContainerClient } from "@azure/storage-blob";
import { InvocationContext } from "@azure/functions";

export class AzureFileDownloader {
  _blobServiceClient: BlobServiceClient;
  _containerName: string;
  _context: InvocationContext;

  constructor(containerName: string, context: InvocationContext) {
    this._blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AzureWebJobsStorage);
    this._containerName = containerName;
    this._context = context;
  }

  async listBlobsByHierarchy(prefix: string) {
    const containerClient: ContainerClient = this._blobServiceClient.getContainerClient(this._containerName);
    const result = [];

    for await (const response of containerClient.listBlobsByHierarchy("/", { prefix }).byPage()) {
      const segment = response.segment;

      if (segment.blobPrefixes.length) {
        for await (const prefix of segment.blobPrefixes) {
          const data = await this.listBlobsByHierarchy(prefix.name);
          result.push({ prefix: prefix.name, data });
        }

        return result;
      }

      return segment.blobItems.map((blobItem) => containerClient.getBlobClient(blobItem.name).url);
    }

    return result;
  }
}

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

  async listBlobsByHierarchy(virtualHierarchyDelimiter: string = "/"): Promise<string[]> {
    const containerClient = this._blobServiceClient.getContainerClient(this._containerName);

    for await (const response of containerClient.listBlobsByHierarchy(virtualHierarchyDelimiter).byPage()) {
      const segment = response.segment;

      if (segment.blobPrefixes) {
        for await (const prefix of segment.blobPrefixes) {
          return await this.listBlobsByHierarchy(`${virtualHierarchyDelimiter}${prefix.name}`);
        }
      }

      return segment.blobItems.map((blob) => containerClient.getBlobClient(blob.name).url);
    }
  }
}

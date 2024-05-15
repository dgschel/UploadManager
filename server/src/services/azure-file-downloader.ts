import { BlobServiceClient, ContainerClient } from "@azure/storage-blob";
import { InvocationContext } from "@azure/functions";
import { CustomBlobProperties } from "../models/blob.js";

export class AzureFileDownloader {
  _blobServiceClient: BlobServiceClient;
  _containerName: string;
  _context: InvocationContext;

  constructor(containerName: string, context: InvocationContext) {
    this._blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AzureWebJobsStorage);
    this._containerName = containerName;
    this._context = context;
  }

  async listBlobsByHierarchy(prefix: string = "") {
    const containerClient: ContainerClient = this._blobServiceClient.getContainerClient(this._containerName);
    const result = [];

    for await (const response of containerClient.listBlobsByHierarchy("/", { prefix }).byPage()) {
      const segment = response.segment;

      if (segment.blobPrefixes.length) {
        for await (const prefix of segment.blobPrefixes) {
          const blobs = await this.listBlobsByHierarchy(prefix.name);
          result.push({ prefix: prefix.name, blobs });
        }

        return result;
      }

      // Service SAS Container Level
      return segment.blobItems.map(
        (blobItem) =>
          ({
            name: blobItem.name.replace(prefix, ""),
            url: containerClient.getBlobClient(blobItem.name).url,
            contentType: blobItem.properties.contentType,
            size: blobItem.properties.contentLength,
            createdOn: blobItem.properties.createdOn,
          } as CustomBlobProperties)
      );
    }

    return result;
  }
}

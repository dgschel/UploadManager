import { BlobServiceClient, BlockBlobClient } from "@azure/storage-blob";
import { InvocationContext } from "@azure/functions";
import { Upload } from "../models/Upload.js";

export class AzureFileUploader implements Upload {
  private _blobServiceClient: BlobServiceClient;
  private _containerName: string;
  private _context: InvocationContext;

  constructor(containerName: string, context: InvocationContext) {
    this._blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AzureWebJobsStorage);
    this._containerName = containerName;
    this._context = context;
  }

  private async getBlobClient(fileName: string): Promise<BlockBlobClient> {
    const containerClient = this._blobServiceClient.getContainerClient(this._containerName);
    await containerClient.createIfNotExists();
    const blockBlobClient = containerClient.getBlockBlobClient(fileName);

    return blockBlobClient;
  }

  private getDirectory(fileType: string): string {
    return fileType.split("/")[0] === "image" ? "images" : "videos";
  }

  async upload(files: File[]): Promise<File[]> {
    const uploadPromises = files.map(async (file) => {
      try {
        const dir = this.getDirectory(file.type);
        const blockBlobClient = await this.getBlobClient(`${dir}/${file.name}`);
        const buffer = await file.arrayBuffer();
        await blockBlobClient.uploadData(buffer, { blobHTTPHeaders: { blobContentType: file.type } });

        this._context.log(`Uploaded file ${file.name} to container ${this._containerName}`);

        return file;
      } catch (error) {
        this._context.error(`Failed to upload file ${file.name} to container ${this._containerName}: ${error}`);
      }
    });

    return await Promise.all(uploadPromises);
  }
}

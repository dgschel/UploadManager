import { input } from "@azure/functions";

export const configMimeTypesBlobInput = input.storageBlob({
  path: "configs/mime-types.json",
  connection: "AzureWebJobsStorage",
});

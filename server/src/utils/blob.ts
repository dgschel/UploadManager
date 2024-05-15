export function appendSASTokenToBlobUrl(blobUrl: string, sasToken: string): string {
  return `${blobUrl}?${sasToken}`;
}

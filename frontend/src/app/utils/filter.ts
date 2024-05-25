import {
  CustomBlobProperties,
  PrefixedBlobProperties,
} from '../shared/models/blob';
import { formatDate } from './date';

/**
 * Typesafe filter the items based on the search query
 * @param items pass the items to filter. The items should have atleast name, contentType and createdOn properties
 * @param searchQuery pass the search query to filter the items
 * @returns filtered items based on the search query
 */
export const filterItemsBySearchQuery = <
  T extends Pick<CustomBlobProperties, 'name' | 'contentType' | 'createdOn'>
>(
  items: T[],
  searchQuery: string
): T[] => {
  return items.filter((item) => {
    const searchQueryLowerCase = searchQuery.toLowerCase();
    return (
      item.name.toLowerCase().includes(searchQueryLowerCase) ||
      item.contentType.toLowerCase().includes(searchQueryLowerCase) ||
      formatDate(item.createdOn).toLowerCase().includes(searchQueryLowerCase)
    );
  });
};

// Return a new array of prefixed blobs that contain blobs with the specified blob name
export const filterPrefixedBlobsByBlobName = (
  prefixedBlobs: PrefixedBlobProperties[],
  blobName: string
): PrefixedBlobProperties[] => {
  return prefixedBlobs
    .map((prefixedBlob) => {
      const blobs = prefixedBlob.blobs.filter((blob) =>
        blob.name.includes(blobName)
      );
      return {
        prefix: prefixedBlob.prefix,
        blobs,
      };
    })
    .filter((prefixedBlob) => prefixedBlob.blobs.length > 0);
};

/**
 * Find a prefixed blob with the specified blob name
 * @param prefixedBlobs pass the array of prefixed blobs to search
 * @param blobName pass the blob name to search for
 * @returns the prefixed blob with the specified blob name, if found
 */
export const findPrefixedBlobByBlobName = (
  prefixedBlobs: PrefixedBlobProperties[],
  blobName: string
) =>
  prefixedBlobs.reduce(
    (_, curr) => ({
      prefix: curr.prefix,
      blob: curr.blobs.find((b) => b.name === blobName),
    }),
    {} as { prefix: string; blob: CustomBlobProperties | undefined }
  );

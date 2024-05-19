import { CustomBlobProperties } from '../shared/models/blob';
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

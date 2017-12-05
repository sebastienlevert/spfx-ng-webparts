import { WebPartContext } from '@microsoft/sp-webpart-base';
import { IListItem } from "../../models/list-item.model";

/**
 * Interface for Lists Service
 */
export interface IListsService {
  /**
   * Gets all the list items based on the listId
   */
  getListItems(listId: string, viewFields: string[]): Promise<IListItem[]>;

  /**
   * Gets the list based on its List Id and expands its fields
   */
  getList(listId: string): Promise<any>;
}

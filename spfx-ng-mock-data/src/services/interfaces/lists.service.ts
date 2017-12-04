import { List } from "../../models/list";
import { WebPartContext } from '@microsoft/sp-webpart-base';

/**
 * Interface for Lists Service
 */
export interface IListsService {
  /**
   * Gets all the lists from the current Site
   */
  getLists(context: WebPartContext): Promise<List[]>;
}

import { WebPartContext } from '@microsoft/sp-webpart-base';

/**
 * Interface for Templates Service
 */
export interface ITemplatesService {
  /**
   * Gets all the templates based on the listId
   */
  getTemplates(listId: string): Promise<any[]>;
}

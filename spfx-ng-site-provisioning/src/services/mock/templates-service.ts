import { Injectable } from '@angular/core';
import { ITemplatesService } from './../interfaces/templates-service.interface';
import { ITemplate } from './../../models/template';

@Injectable()
export class MockTemplatesService implements ITemplatesService {
  /**
   * Gets all the list items based on the listId
   * @param listId The Id of the selected List
   */
  public getTemplates(listId: string): Promise<ITemplate[]> {
    return new Promise<ITemplate[]>((resolve, reject) => {
      resolve([
        {
          Title: "Template 01",
          EncodedAbsUrl: "https://tenant.sharepoint.com/sites/site/templates/template01.xml"
        },
        {
          Title: "Template 02",
          EncodedAbsUrl: "https://tenant.sharepoint.com/sites/site/templates/template02.xml"
        }
      ]);
    })
  }
}

import { Injectable } from '@angular/core';
import WebPartContext from '@microsoft/sp-webpart-base/lib/core/WebPartContext';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import { ITemplatesService } from './interfaces/templates-service.interface';
import pnp from "sp-pnp-js";
import { ITemplate } from '../models/template';

/**
 * Implementation of the Templates Service
 */
@Injectable()
export class TemplatesService implements ITemplatesService {
  /**
   * Gets all the list items based on the listId
   * @param listId The Id of the selected List
   */
  public getTemplates(listId: string): Promise<ITemplate[]> {
    return pnp.sp.web.lists.getById(listId).items.select(...["Title","EncodedAbsUrl"]).getAs<ITemplate[]>();
  }
}

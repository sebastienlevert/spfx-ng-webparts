import { Injectable } from '@angular/core';
import { IListItem } from '../models/list-item.model';
import WebPartContext from '@microsoft/sp-webpart-base/lib/core/WebPartContext';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import { IListsService } from './interfaces/lists.service';
import pnp from "sp-pnp-js";

@Injectable()
export class ListsService implements IListsService {
  /**
   * Gets all the list items based on the listId
   * @param listId The Id of the selected List
   * @param viewFields The fields to load from the list
   */
  public getListItems(listId: string, viewFields: string[]): Promise<IListItem[]> {
    return pnp.sp.web.lists.getById(listId).items.select(...viewFields).get();
  }

  /**
   * Gets the list based on its List Id and expands its fields
   * @param listId The Id of the selcted List
   */
  public getList(listId: string): Promise<any> {
    return pnp.sp.web.lists.getById(listId).expand(...["Fields"]).select(...["Title", "InternalName"]).get();
  }
}

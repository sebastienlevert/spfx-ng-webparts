import { WebPartContext } from '@microsoft/sp-webpart-base';
import { Injectable } from '@angular/core';
import { IListsService } from './interfaces/lists.service';
import { List } from './../models/list';
import { SPHttpClient, HttpClientResponse } from '@microsoft/sp-http'


@Injectable()
export class ListsService implements IListsService {
  /**
   * Builds a list of lists
   */
  public getLists(context: WebPartContext): Promise<List[]> {
    return new Promise<List[]>((resolve, reject) => {
      context.spHttpClient.get(`${context.pageContext.web.absoluteUrl}/_api/web/lists`, SPHttpClient.configurations.v1)
      .then(res => res.json())
      .then(res => {
        resolve(res.value as List[]);
      })
      .catch(err => console.log(err));
    });
  }
}

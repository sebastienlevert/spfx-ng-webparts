import { WebPartContext } from '@microsoft/sp-webpart-base';
import { Injectable } from '@angular/core';
import { IListsService } from './../interfaces/lists.service';
import { List } from '../../models/list';

@Injectable()
export class MockListsService implements IListsService {
  /**
   * Builds a Mocked list of lists
   */
  public getLists(context: WebPartContext): Promise<List[]> {
    return new Promise<List[]>((resolve, reject) => {
      setTimeout(() => resolve([
        {
          Id: "bf8ff17c-f808-4031-b627-fa8193122a58",
          Title: "List 01"
        },
        {
          Id: "330f1a60-4c76-402f-a956-f6a7abea8062",
          Title: "List 02"
        },
        {
          Id: "5807d99b-cee2-4337-b289-8433e0635a08",
          Title: "List 03"
        }
      ]), 300);
    });
  }
}

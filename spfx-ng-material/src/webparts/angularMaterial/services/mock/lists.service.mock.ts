import { WebPartContext } from '@microsoft/sp-webpart-base';
import { Injectable } from '@angular/core';
import { IListsService } from './../interfaces/lists.service';
import { IListItem } from "./../../models/list-item.model";
const chance = require('chance').Chance();

@Injectable()
export class MockListsService implements IListsService {
  /**
   * Builds a Mocked list based on the listId
   * @param listId
   */
  public getList(listId: String): Promise<any> {
    return new Promise<any>(function(resolve, reject) {
      setTimeout(() => resolve({
        Id: listId,
        Title: chance.capitalize(chance.word({syllables: 4})),
        Fields: [
          { InternalName: "Id", Title: "Id" },
          { InternalName: "Guid", Title: "Guid" },
          { InternalName: "Title", Title: "Title" },
          { InternalName: "Test01", Title: chance.capitalize(chance.word({syllables: 3})) },
          { InternalName: "Test02", Title: chance.capitalize(chance.word({syllables: 3})) }
        ]
      }), 300);
    });
  }

  /**
   * Gets the list items based on the listId
   * @param listId
   */
  public getListItems(listId: String, viewFields: string[]): Promise<IListItem[]> {
    let self = this;

    return new Promise<any[]>(function(resolve, reject) {
      let maxItems: number = chance.integer({min: 5, max: 50});
      let items = new Array<any>();

      for(let i = 0; i < maxItems; ++i) {
        items.push({
          Id: chance.integer({ min: 0, max: 100 }),
          Guid: chance.guid(),
          Title: chance.name(),
          Test01: chance.street(),
          Test02: chance.phone()
        });
      }

      setTimeout(() => resolve(items), 2000);
    });
  }
}

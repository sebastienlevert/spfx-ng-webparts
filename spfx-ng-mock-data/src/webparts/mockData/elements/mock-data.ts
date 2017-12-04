import { Component, NgModule, Input, ViewEncapsulation } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { ListsService } from '../../../services/lists.service';
import { List } from '../../../models/list';
import { Environment, EnvironmentType } from '@microsoft/sp-core-library';
import { MockListsService } from '../../../services/mock/lists.service';

@Component({
  selector: 'mock-data',
  templateUrl: './mock-data.html',
  styleUrls: [ './mock-data.scss' ],
  encapsulation: ViewEncapsulation.None
})
export class MockData {
  @Input() context: WebPartContext;
  public lists: Promise<List[]>;

  constructor(private listsService: ListsService) { }

  ngOnInit(){
    if(!this.context){
      console.error('Please provide the context!');
      return;
    }

    this.lists = this.listsService.getLists(this.context);
  }
}

@NgModule({
  imports: [BrowserModule],
  declarations: [MockData],
  providers: [
    { provide: ListsService, useFactory: ListsServiceFactory }
  ],
  entryComponents: [MockData]
})
export class MockDataModule {
  ngDoBootstrap(){}
}

/**
 * Lists Service Factory that provides the right service based on the context of the running WebPart
 */
export function ListsServiceFactory() {
  if (Environment.type === EnvironmentType.Local) {
    return new MockListsService();
  } else if (Environment.type == EnvironmentType.SharePoint || Environment.type == EnvironmentType.ClassicSharePoint) {
    return new ListsService();
  }
};


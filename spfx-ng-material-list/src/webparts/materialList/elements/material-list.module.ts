import { MaterialList } from './material-list';
import { ListsService } from './../../../services/lists.service';
import { NgModule } from '@angular/core';
import { MatTableModule, MatPaginatorModule, MatFormFieldModule, MatInputModule, MatProgressBarModule, MatSortModule, MatToolbarModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Environment, EnvironmentType } from '@microsoft/sp-core-library';
import { MockListsService } from '../../../services/mock/lists.service.mock';

/**
 * Module that intializes our Angular Element
 * Includes Angular Material so uses Zone.js
 */
@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatTableModule, MatPaginatorModule, MatFormFieldModule, MatInputModule, MatProgressBarModule, MatSortModule, MatToolbarModule
  ],
  providers: [
    { provide: ListsService, useFactory: ListsServiceFactory }
  ],
  declarations: [MaterialList],
  entryComponents: [MaterialList]
})
export class MaterialListModule {
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

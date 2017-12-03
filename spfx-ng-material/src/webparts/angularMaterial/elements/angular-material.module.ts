import { AngularMaterial } from './angular-material';
import { ListsService } from './../services/lists.service';
import { NgModule } from '@angular/core';
import { MatTableModule, MatPaginatorModule, MatFormFieldModule, MatInputModule, MatProgressBarModule, MatSortModule, MatToolbarModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Environment, EnvironmentType } from '@microsoft/sp-core-library';

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
  declarations: [AngularMaterial],
  entryComponents: [AngularMaterial]
})
export class AngularMaterialModule {
  ngDoBootstrap(){}
}

/**
 * Lists Service Factory that provides the right service based on the context of the running WebPart
 */
export function ListsServiceFactory() {
  if (Environment.type === EnvironmentType.Local) {
    if (DEBUG) {
      let MockListsService = require('../services/mock/lists.service.mock');
      return new MockListsService();
    }
  } else if (Environment.type == EnvironmentType.SharePoint || Environment.type == EnvironmentType.ClassicSharePoint) {
    return new ListsService();
  }
};

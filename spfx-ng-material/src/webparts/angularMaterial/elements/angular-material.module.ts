import { AngularMaterial } from './angular-material';
import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material';
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
    MatToolbarModule
  ],
  declarations: [AngularMaterial],
  entryComponents: [AngularMaterial]
})
export class AngularMaterialModule {
  ngDoBootstrap(){}
}

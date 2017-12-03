import { SiteProvisioning } from './site-provisioning';
import { SiteProvisioningForm } from './site-provisioning-form';
import { AppRoutes } from './site-provisioning.routes';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Environment, EnvironmentType } from '@microsoft/sp-core-library';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/**
 * Module that intializes our Angular Element
 * Includes Angular Material so uses Zone.js
 */
@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatStepperModule, MatFormFieldModule, MatInputModule
  ],
  declarations: [SiteProvisioning, SiteProvisioningForm],
  entryComponents: [SiteProvisioning]
})
export class SiteProvisioningModule {
  ngDoBootstrap(){}
}

import { ConfigurationService } from './../../../services/configuration-service';
import { SiteProvisioning } from './site-provisioning';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Environment, EnvironmentType } from '@microsoft/sp-core-library';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material';
import { HttpModule, Http } from '@angular/http';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { SiteProvisioningDialog } from './site-provisioning-dialog';
import { MockSitesService } from '../../../services/mock/sites-service.mock';
import { SitesService } from '../../../services/sites-service';
import { TemplatesService } from '../../../services/templates-service';
import { MockTemplatesService } from '../../../services/mock/templates-service';

/**
 * Module that intializes our Angular Element
 * Includes Angular Material so uses Zone.js
 */
@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    MatStepperModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSlideToggleModule, MatSelectModule, MatToolbarModule, MatDialogModule, MatProgressBarModule
  ],
  providers: [
    { provide: SitesService, useFactory: SitesServiceFactory, deps: [Http] },
    { provide: TemplatesService, useFactory: TemplatesServiceFactory }
  ],
  declarations: [SiteProvisioning, SiteProvisioningDialog],
  entryComponents: [SiteProvisioning, SiteProvisioningDialog]
})
export class SiteProvisioningModule {
  ngDoBootstrap(){}
}

/**
 * Sites Service Factory that provides the right service based on the context of the running WebPart
 */
export function SitesServiceFactory(http: Http) {
  if (Environment.type === EnvironmentType.Local) {
    return new MockSitesService();
  } else if (Environment.type == EnvironmentType.SharePoint || Environment.type == EnvironmentType.ClassicSharePoint) {
    return new SitesService(http);
  }
};

/**
 * Lists Service Factory that provides the right service based on the context of the running WebPart
 */
export function TemplatesServiceFactory() {
  if (Environment.type === EnvironmentType.Local) {
    return new MockTemplatesService();
  } else if (Environment.type == EnvironmentType.SharePoint || Environment.type == EnvironmentType.ClassicSharePoint) {
    return new TemplatesService();
  }
};

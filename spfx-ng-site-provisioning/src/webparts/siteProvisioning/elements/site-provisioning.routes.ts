import { SiteProvisioning } from './site-provisioning';
import { SiteProvisioningForm } from './site-provisioning-form';
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

const routes: Routes = [
  { path: '', component: SiteProvisioning },
  { path: 'new', component: SiteProvisioningForm },
  { path: '**', redirectTo: '' }
];

export const appRoutingProviders: any[] = [

];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes, { useHash: true });

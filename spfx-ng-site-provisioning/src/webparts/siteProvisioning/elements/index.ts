//web components ES5 shim
import './../../../elements/wc-shim.js';
import { registerAsCustomElements } from '@angular/elements';
import { platformBrowser } from '@angular/platform-browser';

import { SiteProvisioning } from './site-provisioning';
import { SiteProvisioningModule } from './site-provisioning.module';
import { SiteProvisioningModuleNgFactory } from './site-provisioning.module.ngfactory';

registerAsCustomElements(
  [ SiteProvisioning ],
  () => platformBrowser().bootstrapModuleFactory(SiteProvisioningModuleNgFactory/*, { ngZone: 'noop' }*/)
).catch(err => console.log(err));


//web components ES5 shim
import './../../../elements/wc-shim.js';
import { registerAsCustomElements } from '@angular/elements';
import { platformBrowser } from '@angular/platform-browser';

import { AngularMaterial } from './angular-material';
import { AngularMaterialModule } from './angular-material.module';
import { AngularMaterialModuleNgFactory } from './angular-material.module.ngfactory';

registerAsCustomElements(
  [ AngularMaterial ],
  () => platformBrowser().bootstrapModuleFactory(AngularMaterialModuleNgFactory/*, { ngZone: 'noop' }*/)
).catch(err => console.log(err));


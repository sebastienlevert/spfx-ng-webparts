//web components ES5 shim
import './../../../elements/wc-shim.js';
import { registerAsCustomElements } from '@angular/elements';
import { platformBrowser } from '@angular/platform-browser';

import { HelloWorldMaterial, HelloWorldMaterialModule } from './hello-world';
import { HelloWorldMaterialModuleNgFactory } from './hello-world.ngfactory';

registerAsCustomElements(
  [ HelloWorldMaterial ],
  () => platformBrowser().bootstrapModuleFactory(HelloWorldMaterialModuleNgFactory, { ngZone: 'noop' })
).catch(err => console.log(err));


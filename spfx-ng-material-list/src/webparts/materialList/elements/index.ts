//web components ES5 shim
import './../../../elements/wc-shim.js';
import { registerAsCustomElements } from '@angular/elements';
import { platformBrowser } from '@angular/platform-browser';

import { MaterialList } from './material-list';
import { MaterialListModule } from './material-list.module';
import { MaterialListModuleNgFactory } from './material-list.module.ngfactory';

registerAsCustomElements(
  [ MaterialList ],
  () => platformBrowser().bootstrapModuleFactory(MaterialListModuleNgFactory/*, { ngZone: 'noop' }*/)
).catch(err => console.log(err));


//web components ES5 shim
import './../../../elements/wc-shim.js';
import { registerAsCustomElements } from '@angular/elements';
import { platformBrowser } from '@angular/platform-browser';

import { ListRest, ListRestModule } from './list-rest';
import { ListRestModuleNgFactory } from './list-rest.ngfactory';

registerAsCustomElements(
  [ ListRest ],
  () => platformBrowser().bootstrapModuleFactory(ListRestModuleNgFactory)
).catch(err => console.log(err));


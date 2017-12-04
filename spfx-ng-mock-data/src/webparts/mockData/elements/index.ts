//web components ES5 shim
import './../../../elements/wc-shim.js';
import { registerAsCustomElements } from '@angular/elements';
import { platformBrowser } from '@angular/platform-browser';

import { MockData, MockDataModule } from './mock-data';
import { MockDataModuleNgFactory } from './mock-data.ngfactory';

registerAsCustomElements(
  [ MockData ],
  () => platformBrowser().bootstrapModuleFactory(MockDataModuleNgFactory)
).catch(err => console.log(err));


//web components ES5 shim
import './../../../elements/wc-shim.js';
import { platformBrowser } from '@angular/platform-browser';

import { HelloWorld, HelloWorldModule } from './hello-world';
import { HelloWorldModuleNgFactory } from './hello-world.ngfactory';

platformBrowser().bootstrapModuleFactory(HelloWorldModuleNgFactory, { ngZone: 'noop' });


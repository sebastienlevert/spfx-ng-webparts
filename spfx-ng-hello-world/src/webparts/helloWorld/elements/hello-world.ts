import { Component, NgModule, Input, ViewEncapsulation } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'hello-world',
  templateUrl: './hello-world.html',
  styleUrls: [ './hello-world.scss' ],
  encapsulation: ViewEncapsulation.None
})
export class HelloWorld {
  @Input() name: string;
}

@NgModule({
  imports: [BrowserModule],
  declarations: [HelloWorld],
  entryComponents: [HelloWorld]
})
export class HelloWorldModule 
  constructor(private injector: Injector) {
        const customElement = createCustomElement(HelloWorld, { injector });
        customElements.define('hello-world', customElement);
      }
  ngDoBootstrap(){}
}

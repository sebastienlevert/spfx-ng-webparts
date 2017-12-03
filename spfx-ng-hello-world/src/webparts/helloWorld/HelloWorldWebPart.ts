import './elements';
import { HelloWorld } from './elements/hello-world';
import { NgElement } from '@angular/elements';


import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

export default class HelloWorldWebPartWebPart extends BaseClientSideWebPart<HelloWorld> {
  constructor(){
    super();
  }

  public render(): void {
    this.domElement.innerHTML = `
      <hello-world
        name="${this.properties.name}">
      </hello-world>`;
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: "Hello World Configuration"
          },
          groups: [
            {
              groupName: "Options",
              groupFields: [
                PropertyPaneTextField('name', {
                  label: "Name"
                })
              ]
            }
          ]
        }
      ]
    };
  }
}

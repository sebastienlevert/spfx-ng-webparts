import './elements';
import { HelloWorldMaterial } from './elements/hello-world';
import { NgElement } from '@angular/elements';

import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

export default class HelloWorldMaterialWebPartWebPart extends BaseClientSideWebPart<HelloWorldMaterial> {

  public render(): void {
    this.domElement.innerHTML = `<hello-world-material></hello-world-material>`;
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

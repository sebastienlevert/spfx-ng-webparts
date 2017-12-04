import './elements'
import { MockData } from './elements/mock-data'

import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

export default class MockDataWebPart extends BaseClientSideWebPart<MockData> {

  public render(): void {
    let ngElement = this.domElement.getElementsByTagName('mock-data')[0]

    if(ngElement) {
      this.domElement.removeChild(ngElement);
    }

    const ElementListRest = customElements.get('mock-data');
    const element = new ElementListRest();
    element.context = this.context;
    this.domElement.appendChild(element);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: []
    };
  }
}

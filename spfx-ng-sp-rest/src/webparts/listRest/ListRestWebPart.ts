import './elements'
import { ListRest } from './elements/list-rest'

import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

export default class ListRestWebPart extends BaseClientSideWebPart<ListRest> {

  public render(): void {
    let ngElement = this.domElement.getElementsByTagName('list-rest')[0]

    if(ngElement) {
      this.domElement.removeChild(ngElement);
    }

    const ElementListRest = customElements.get('list-rest');
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

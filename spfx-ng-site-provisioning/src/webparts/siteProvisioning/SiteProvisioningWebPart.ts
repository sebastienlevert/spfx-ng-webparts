import './elements';
import { SiteProvisioning } from './elements/site-provisioning';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

export default class SiteProvisioningWebPartWebPart extends BaseClientSideWebPart<SiteProvisioning> {

  public render(): void {
    this.domElement.innerHTML = `<site-provisioning></site-provisioning>`;
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: "Site Provisioning Options"
          },
          groups: [
            {
              groupName: "Azure Function Configuration",
              groupFields: [
                PropertyPaneTextField('functionUrl', {
                  label: "Function URL"
                }),
                PropertyPaneTextField('functionKey', {
                  label: "Function Key"
                })
              ]
            }
          ]
        }
      ]
    };
  }
}

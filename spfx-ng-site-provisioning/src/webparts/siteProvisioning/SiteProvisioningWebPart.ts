import './elements';
import { SiteProvisioning } from './elements/site-provisioning';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import { PropertyFieldListPicker, PropertyFieldListPickerOrderBy } from '@pnp/spfx-property-controls/lib/PropertyFieldListPicker';
import pnp from "sp-pnp-js";

export default class SiteProvisioningWebPartWebPart extends BaseClientSideWebPart<SiteProvisioning> {
  /**
   * The Custom Element tag
   */
  private TAG_NAME = "site-provisioning";

  /**
   * Renders the WebPart
   */
  public render(): void {
    let currentComponent = this.getComponent();

    // If the component is already on the page, it means we need to refresh the DOM. Else, we simply render
    if(currentComponent) {
      this.refreshComponent(currentComponent);
    } else {
      this.renderComponent();
    }
  }

  /**
   * Gets the current Custom Element from the inner DOM of the provided DOM Element
   */
  private getComponent(): Element {
    return this.domElement.getElementsByTagName(this.TAG_NAME)[0]
  }

  /**
   * Refreshes the component within the provided DOM Element
   * @param component
   */
  private refreshComponent(component: Element): void {
    this.removeComponent(component);
    this.renderComponent();
  }

  /**
   * Removes the componet from the provided DOM Element
   * @param component
   */
  private removeComponent(component: Element): void {
    this.domElement.removeChild(component);
  }

  /**
   * Renders the component within the provided DOM Element
   */
  private renderComponent(): void {
    const ElementSiteProvisioning = customElements.get(this.TAG_NAME);
    const element = new ElementSiteProvisioning();
    element.functionUrl = this.properties.functionUrl;
    element.functionKey = this.properties.functionKey;
    element.templatesListId = this.properties.templatesListId;
    this.domElement.appendChild(element);
  }

    /**
   * Initializes the PnP context
   */
  public onInit(): Promise<void> {
    return super.onInit().then(_ => {
      pnp.setup({
        spfxContext: this.context
      });
    });
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
            },
            {
              groupName: "PnP Templates Configuration",
              groupFields: [
                PropertyFieldListPicker('templatesListId', {
                  label: 'Select a Template Repository',
                  selectedList: this.properties.templatesListId,
                  includeHidden: false,
                  baseTemplate: 101,
                  orderBy: PropertyFieldListPickerOrderBy.Title,
                  disabled: false,
                  onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
                  properties: this.properties,
                  context: this.context,
                  onGetErrorMessage: null,
                  deferredValidationTime: 0,
                  key: 'listPickerFieldId'
                })
              ]
            }
          ]
        }
      ]
    };
  }
}

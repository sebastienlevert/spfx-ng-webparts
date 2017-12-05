import './elements';
import { AngularMaterial } from './elements/angular-material';

import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { PropertyFieldListPicker, PropertyFieldListPickerOrderBy } from '@pnp/spfx-property-controls/lib/PropertyFieldListPicker';
import pnp from "sp-pnp-js";
import { PropertyPaneSlider } from '@microsoft/sp-webpart-base/lib/propertyPane/propertyPaneFields/propertyPaneSlider/PropertyPaneSlider';

/**
 * Example WebPart that uses Angular Material to dynamically display SharePoint List content
 */
export default class AngularMaterialWebPartWebPart extends BaseClientSideWebPart<AngularMaterial> {
  /**
   * The Custom Element tag
   */
  private TAG_NAME = "angular-material";

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
    const ElementAngularMaterial = customElements.get(this.TAG_NAME);
    const element = new ElementAngularMaterial();
    element.name = this.properties.name;
    this.domElement.appendChild(element);
  }

  /**
   * Gets the current Data Version
   */
  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  /**
   * Builds the Property Pane Configuration
   */
  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: "Angular Material Configuration"
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

import './elements';
import { MaterialList } from './elements/material-list';

import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import { PropertyFieldListPicker, PropertyFieldListPickerOrderBy } from '@pnp/spfx-property-controls/lib/PropertyFieldListPicker';
import pnp from "sp-pnp-js";
import { PropertyPaneSlider } from '@microsoft/sp-webpart-base/lib/propertyPane/propertyPaneFields/propertyPaneSlider/PropertyPaneSlider';

export default class MaterialListWebPartWebPart extends BaseClientSideWebPart<MaterialList> {

  /**
   * The Custom Element tag
   */
  private TAG_NAME = "material-list";

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
      const ElementMaterialList = customElements.get(this.TAG_NAME);
      const element = new ElementMaterialList();
      element.listId = this.properties.listId;
      element.viewFields = this.properties.viewFields;
      element.defaultPageSize = this.properties.defaultPageSize;
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

    /**
     * Disables the Reactive Property
     */
    protected get disableReactivePropertyChanges(): boolean {
      return true;
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
              description: "Angular Material List Configuration"
            },
            groups: [
              {
                groupName: "Options",
                groupFields: [
                  PropertyFieldListPicker('listId', {
                    label: 'Select a List',
                    selectedList: this.properties.listId,
                    includeHidden: false,
                    orderBy: PropertyFieldListPickerOrderBy.Title,
                    disabled: false,
                    onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
                    properties: this.properties,
                    context: this.context,
                    onGetErrorMessage: null,
                    deferredValidationTime: 0,
                    key: 'listPickerFieldId'
                  }),
                  PropertyPaneTextField('viewFields', {
                    label: "View Fields"
                  }),
                  PropertyPaneSlider("defaultPageSize", {
                    min: 5,
                    step: 5,
                    max: 50,
                    label: "Default Page Size"
                  })
                ]
              }
            ]
          }
        ]
      };
    }
}

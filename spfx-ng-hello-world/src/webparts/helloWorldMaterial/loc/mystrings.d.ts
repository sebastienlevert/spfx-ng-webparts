declare interface IHelloWorldMaterialWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
}

declare module 'HelloWorldMaterialWebPartStrings' {
  const strings: IHelloWorldMaterialWebPartStrings;
  export = strings;
}

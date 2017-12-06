import { Injectable } from '@angular/core';
import { IConfiguration } from './../models/configuration';
import { Environment, EnvironmentType } from '@microsoft/sp-core-library';

/**
 * Service used as a central repository for configuration values
 */
@Injectable()
export class ConfigurationService {
  private readonly mocked: boolean = Environment.type === EnvironmentType.Local;
  public functionUrl: string = "";
  public functionKey: string = "";
  public templatesListId: string = "";

  /**
   * Loads the date inside the Configuration service
   * @param data
   */
  public load(data: IConfiguration) {
    this.functionUrl = data.functionUrl ? data.functionUrl : "";
    this.functionKey = data.functionKey ? data.functionKey : "";
    this.templatesListId = data.templatesListId ? data.templatesListId : "";
  }

  /**
   * Returns true if the value of the Configuration Service is considered valid
   */
  public isConfigured() : boolean {
    return !(this.functionKey === "" || this.functionUrl === "" || this.templatesListId === "") || !(this.mocked && this.templatesListId === "");
  }
}

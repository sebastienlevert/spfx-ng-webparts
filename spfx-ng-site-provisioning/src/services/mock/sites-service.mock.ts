import { ConfigurationService } from './../configuration-service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import { ISitesService } from "./../interfaces/sites-service.interface";
import { ISiteCreationInformation, ISiteCreationResponse } from "./../../models";

/**
 * Mocked version of the Sites Service
 */
@Injectable()
export class MockSitesService implements ISitesService {
  /**
   * Creates a site based on the site information and the configuration values
   * @param siteInformation
   * @param configurationService
   */
  public createSite(siteInformation: ISiteCreationInformation, configurationService: ConfigurationService): Observable<ISiteCreationResponse> {
    return Observable.of<ISiteCreationResponse>({
      description: `${siteInformation.description} (Mocked)`,
      email: `${siteInformation.url}@mocked.onmicrosoft.com`,
      id: "00000000-0000-0000-0000-000000000000",
      title: `${siteInformation.title} (Mocked)`,
      url: `#${siteInformation.url}`
    }).delay(2000);
  }
}

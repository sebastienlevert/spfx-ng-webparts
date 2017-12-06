import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { DataService } from "./data-service";
import { ISitesService } from "./interfaces/sites-service.interface";
import { ConfigurationService } from "./configuration-service";
import { ISiteCreationInformation, ISiteCreationResponse } from "./../models";

/**
 * Implementation of the Sites Service
 */
@Injectable()
export class SitesService extends DataService implements ISitesService {
  constructor(private http: Http) {
    super();
  }

  /**
   * Creates a site based on the site information and the configuration values
   * @param siteInformation
   * @param configurationService
   */
  public createSite(siteInformation: ISiteCreationInformation, configurationService: ConfigurationService): Observable<ISiteCreationResponse> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    let functionUrl = `${configurationService.functionUrl}?code=${configurationService.functionKey}`;
    return this.http.post(functionUrl, siteInformation, options)
                    .map(this.extractData)
                    .catch(this.handleError);
  }
}

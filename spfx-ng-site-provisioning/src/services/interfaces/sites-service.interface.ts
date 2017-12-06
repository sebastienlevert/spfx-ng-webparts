import { ConfigurationService } from './../configuration-service';
import { ISiteCreationInformation, ISiteCreationResponse } from "./../../models";
import { Observable } from 'rxjs/Observable';

/**
 * Interface for Sites Service
 */
export interface ISitesService {
  /**
   * Creates a site based on the site information and the configuration values
   */
  createSite(siteInformation: ISiteCreationInformation, configurationService: ConfigurationService): Observable<ISiteCreationResponse>;
}

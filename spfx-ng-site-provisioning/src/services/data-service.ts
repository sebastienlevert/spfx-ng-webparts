import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from "rxjs/observable/ErrorObservable";

/**
 * Abstract class that simplifies the Data Management with rxjs
 */
export abstract class DataService {
  /**
   * Extracts the data from the response
   * @param res
   */
  protected extractData(res: Response) {
    let body = res.json();
    return body || { };
  }

  /**
   * Handles any error from the Response
   * @param error
   */
  protected handleError (error: Response | any) : Observable<string> {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}

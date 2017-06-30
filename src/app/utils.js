import Request from 'superagent';
import * as AuthActions from './actions/AuthActions';
import UrlStore from './stores/UrlStore';
import ScrapeStore from './stores/ScrapeStore';

const MERCURY_API_KEY = process.env.MERCURY_API_KEY;

/**
 * @export
 * @class Utils
 */
export default class Utils {
    /**
     * @description logs user out
     * @returns {void}
     * @static
     * @memberof Utils
     */
  static logout() {
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(() => {
      AuthActions.getAuth(null);
      location.reload();
    });
  }

  /**
   * @description makes an API call to get articles
   * @static
   * @returns {object} response
   * @memberof Utils
   */
  static search() {
    const url = UrlStore.getUrl();
    return Request.get(url).then(response => response);
  }

  /**
   * @description Makes an API call to get news sources
   * @static
   * @returns {object} response
   * @memberof Utils
   */
  static sources() {
    const url = UrlStore.getSourceUrl();
    return Request.get(url).then(response => response);
  }

  /**
   * @description Makes an API call to scrape url
   * @static
   * @returns {object} response
   * @memberof Utils
   */
  static scrape() {
    const url = ScrapeStore.getUrl();
    return Request.get(url)
      .set('x-api-key', MERCURY_API_KEY)
      .set('Content-Type', 'application/json')
      .then(response => response);
  }
}

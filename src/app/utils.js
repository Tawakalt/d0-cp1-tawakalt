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
     * @returns {void} returns nothing
     * @static logout
     * @memberof Utils
     */
  static logout() {
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(() => {
      // Fire off action getAuth
      AuthActions.getAuth(null);
      location.reload();
    });
  }

  /**
   * @static
   * @returns {object} response
   * @memberof Utils
   */
  static search() {
    // get url from store
    const url = UrlStore.getUrl();
    return Request.get(url).then(response => response);
  }

  /**
   * @static
   * @returns {object} response
   * @memberof Utils
   */
  static sources() {
    // get url from store
    const url = UrlStore.getSourceUrl();
    return Request.get(url).then(response => response);
  }

  /**
   * @static
   * @returns {object} response
   * @memberof Utils
   */
  static scrape() {
    // get url from store
    const url = ScrapeStore.getUrl();
    return Request.get(url)
      .set('x-api-key', MERCURY_API_KEY)
      .set('Content-Type', 'application/json')
      .then(response => response);
  }
}

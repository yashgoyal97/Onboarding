
import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import { setPassiveTouchGestures, setRootPath } from '@polymer/polymer/lib/utils/settings.js';
import '@polymer/app-route/app-location.js';
import '@polymer/app-route/app-route.js';
import '@polymer/iron-pages/iron-pages.js';

setPassiveTouchGestures(true);
setRootPath(MyAppGlobals.rootPath);
/**
 * @customElement
 * @polymer
 */
class OnboardingApp extends PolymerElement {
  static get template() {
    return html`
    <app-location route="{{route}}" url-space-regex="^[[rootPath]]" use-hash-as-path></app-location>
    <app-route route="{{route}}" pattern="[[rootPath]]:page" data="{{routeData}}" tail="{{subroute}}"></app-route>     
    <iron-pages selected="[[page]]" attr-for-selected="name" role="main">
      <registration-page name="registration"></registration-page>
      <login-page name="login"></login-page>
      <user-page name="user"></user-page>
      <view404-page name='view404'></view404-page>
    </iron-pages>
    `;
  }
  static get properties() {
    return {
      page: {
        type: String,
        reflectToAttribute: true,
        observer: '_pageChanged'
      },
      routeData: Object,
      subroute: Object
    };
  }

  static get observers() {
    return [
      '_routePageChanged(routeData.page)'
    ];
  }

  /**
  * 
  * @param {String} page 
  */
  _routePageChanged(page) {
    if (!page) {
      this.page = 'registration';
    } else if (['registration', 'login', 'user'].indexOf(page) !== -1) {
      this.page = page;
    } else {
      this.page = 'view404';
    }
  }

  /**
   * 
   * @param {String} page 
   */
  _pageChanged(page) {
    switch (page) {
      case 'registration':
        import('./registration-page.js');
        break;
      case 'user':
        import('./user-page.js');
        break;
      case 'login':
        import('./login-page.js');
        break;
      case 'view404':
        import('./view404-page.js');
        break;
    }
  }
}

window.customElements.define('onboarding-app', OnboardingApp);

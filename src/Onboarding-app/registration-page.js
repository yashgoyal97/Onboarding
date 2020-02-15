import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/paper-input/paper-input.js';

class RegistrationPage extends PolymerElement {
    static get template() {
        return html`
        <style>
        .container{
            display:grid;
            grid-template-rows:80px auto;
            grid-template-columns:1fr;
            grid-template-areas:"header" "main";
            grid-gap:2px;
           
        }
        header{
            grid-area:header;
            background-color:rgba(0,50,255,0.6);
            color:white;
            display:grid;
            grid-template-rows:1fr;
            grid-template-columns:1fr 1fr 1fr;
            grid-template-areas: "empty empty logo";
            padding:5px;
        }
        main{
            grid-area:main;
            display:flex;
            flex-direction:column;
        }
        #logo{
            grid-area: logo;
        }
        </style>
        <div class="container">
            <header>
                <div id="logo"><h2>Onboarding<iron-icon icon="assignment-ind"></iron-icon></h2></div>
            </header>
            <main>

            </main>
        </div>
        <iron-ajax id="ajax" handle-as="json" content-type="application/json" on-response="_handleResponse" on-error="_handleError"></iron-ajax>
        `;
    }

     /**
     * reusable function to make ajax calls
     * @param {String} url 
     * @param {String} method 
     * @param {Object} postObj 
     */
    _makeAjaxCall(url, method, postObj) {
        let ajax = this.$.ajax;
        ajax.url=url;
        ajax.method=method;
        ajax.body=postObj?JSON.stringify(postObj):undefined;
        ajax.generateRequest();
    }

}
window.customElements.define('registration-page', RegistrationPage);
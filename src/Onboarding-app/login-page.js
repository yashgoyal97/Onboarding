import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-dialog/paper-dialog.js';
import '@polymer/iron-form/iron-form.js';
import '@polymer/paper-toast/paper-toast.js';

class LoginPage extends PolymerElement {
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
        iron-icon{
            color:green;
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
        #loginButton{
            background-color:green;
            color:white;
            margin-top:10px;
            width:25%;
            border-radius:5px;
        }
      #loginForm{
          padding:20px;
          margin:10px auto;
          background-color:whitesmoke;
          border:1px ;
          border-radius:15px;
          width:40%;
          display:flex;
          flex-direction:column;
      }
      #toast1,toast0{
        margin: 8% 30% 60% 75%;
    }
      a{
          text-decoration:none;
      }
      h1{
          text-align:center;
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
            <iron-form id='loginForm'>
            <form>
                <div id='loginFields'>
                    <h1>Login</h1>
                    <paper-input id='username' name='username' label='Enter Phone No' allowed-pattern="[0-9]" maxlength="10" minlength="10" required ><iron-icon icon='perm-identity' slot='suffix'></iron-icon></paper-input>
                    <paper-input id='password' name='password' label='Enter Password' type='password' required ><iron-icon icon='lock' slot='suffix'></iron-icon></paper-input>
                    <paper-button name='loginButton' id='loginButton' on-click='_handleLogin' raised>Login</paper-button>                
                    <sub>New Here? <a href="#">Sign Up</a></sub>
                    </div>
                </form>
        </iron-form>
            </main>
        </div>
<paper-dialog id="colors" class="colored">
<h2><iron-icon icon="done-all" slot="prefix"></iron-icon>
  Logged In Successfully!!!</h2>
</paper-dialog>
        <paper-toast id='toast0' text='Invalid Credentials'></paper-toast>
        <paper-toast id='toast1' duration="5000" text='Connection Error'></paper-toast>

        <iron-ajax id='ajax' handle-as='json' on-response='_handleResponse' on-error='_handleError' content-type='application/json'></iron-ajax>
        `;
    }
    /**
     * Properties used here are defined here with some respective default value.
     */
    static get properties() {
        return {
            loggedInUser: {
                type: Array,
                value: []
            },
            action: {
                type: String,
                value: 'list'
            }
        };
    }



    /**
     *  Log In validations are implemented here
     *  validates if the user exist and logs in to the user portal
     */
    _handleLogin() {


        if (this.$.loginForm.validate()) {
            let loginPostObj = { phoneNumber: parseInt(this.$.username.value), password: this.$.password.value };
            this.$.loginForm.reset();
            this.action = 'list';
            this._makeAjaxCall(`http://10.117.189.181:9090/givetohand/login`, 'post', loginPostObj);
        }
    }


    /**
     * @param {*} event 
     * handling the response for the ajax request made
     */
    _handleResponse(event) {
        switch (this.action) {
            case 'list':
                this.loggedInUser = event.detail.response;
                /**
                 * if the successful response is returned
                 */
                if (this.loggedInUser.statusCode === 200) {
                    this.$.colors.open();
                    setTimeout(function () {
                        // sessionStorage.setItem('userId', this.loggedInUser.userId);
                        // sessionStorage.setItem('userName', this.loggedInUser.name);
                        // this.dispatchEvent(new CustomEvent('refresh-admin', { detail: {}, bubbles: true, composed: true }));
                        // window.history.pushState({}, null, '#/admin');
                        // window.dispatchEvent(new CustomEvent('location-changed'));
                    }, 3000);

                }

                /**
                 * handling the exception
                 */
                else {
                    this.$.toast0.open();
                }
                break;
            default: break;
        }
    }

    _handleError() {
        this.$.toast1.open();
    }

    /**
    * reusable function to make ajax calls
    * @param {String} url 
    * @param {String} method 
    * @param {Object} postObj 
    */
    _makeAjaxCall(url, method, postObj) {
        let ajax = this.$.ajax;
        ajax.url = url;
        ajax.method = method;
        ajax.body = postObj ? JSON.stringify(postObj) : undefined;
        ajax.generateRequest();
    }

}
window.customElements.define('login-page', LoginPage);
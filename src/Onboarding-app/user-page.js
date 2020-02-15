
import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/paper-button/paper-button.js';

/**
 * @customElement
 * @polymer
 */
class UserPage extends PolymerElement {
    static get template() {
        return html`
    <style>
    header{
        background-color:rgba(0,50,255,0.6);

        color:white;
        display:grid;
        grid-template-rows:1fr;
        grid-template-columns:1fr 1fr 1fr;
        grid-template-areas: "empty heading logo";
    }   
     iron-icon{
        color:green;
    }
    #logo{
        grid-area: logo;
    }
    #heading{
        grid-area: heading;
    }
    #tsms{
        width:100%;
    }
    #lms{
        width:100%;

    }
    #buttons{
        width:100%;
        margin-top:10px;
        display:flex;
        justify-content:space-evenly;
        flex-direction:row;
    }
    </style>
    <header>
    <div id="heading"><h2>Employee Portal</h2></div>
    <div id="logo"><h2>Onboarding<iron-icon icon="assignment-ind"></iron-icon></h2></div>
</header>
<main>
<div id="buttons">
<paper-button id="tsms" raised>Time Sheet Management System</paper-button>
<paper-button id="lms" raised>Leave Management System</paper-button>
</div>

</main>
    `;
    }
}

window.customElements.define('user-page', UserPage);

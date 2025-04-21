/**
 * A LitElement-based web component that displays a user profile card.
 * 
 * This component consumes user data from a context and displays the user's
 * ID, name, and email. If no user data is available, it shows a message indicating
 * that no context is available. The component uses Material Design's elevated
 * card component to create a visually appealing card layout.
 *     
 * @customElement user-profile
 * @extends {LitElement}
 * 
 * @property {UserData | null} userData - The user data consumed from the context.
 * 
 * @csspart card - Styles the card container.
 * @csspart headline - Styles the headline section of the card.
 * @csspart content - Styles the content section of the card.
 */
import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { consume } from '@lit/context';
import { userContext, UserData } from '../contexts/user-context';
import '@material/web/labs/card/elevated-card';

@customElement('user-profile')
export class UserProfile extends LitElement {
  @consume({ context: userContext, subscribe: true }) // Use the `consume` decorator to subscribe to the `userContext`.
  userData!: UserData | null; // The `userData` property is populated with the context's value.

  static styles = css`
    .card {
      width: 300px;
      margin: 16px;
    }
    .headline {
      font-size: 1rem;
      font-weight: bold;
      padding: .5rem;
    }
    .content {
      display: flex;
      flex-direction: column;
      flex: 1;
      justify-content: space-between;
      padding: 16px;
      gap: 16px;
    }
  `;

  render() {
    if (!this.userData) {
      // If no user data is available, just show a message.
      return html`
        <md-elevated-card class="card">
          <div class="headline">No Context Available</div>
          <div class="content">
            No user data available.
          </div>
        </md-elevated-card>
      `;
    }
    // If user data is available, display the user's profile information.
    return html`
      <md-elevated-card class="card">
        <div class="headline">${this.userData.id}</div>
        <div class="content">
          ${this.userData.name ? this.userData.name : 'Name not available'}<br>
          ${this.userData.email ? this.userData.email : 'Email not available'}
        </div>
      </md-elevated-card>
    `;
  }

}

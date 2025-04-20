/**
 * A LitElement-based web component that displays a user profile card.
 * 
 * This component consumes user data from a context and displays the user's
 * ID, name, and email. If no user data is available, it provides a button
 * to log in using Google authentication. When user data is available, it
 * displays the user's information along with a button to sign out.
 * 
 * @customElement user-profile
 * @extends {LitElement}
 * 
 * @property {UserData | null} userData - The user data consumed from the context.
 * 
 * @method login - Initiates the Google login process using Firebase authentication.
 * @method signOut - Signs the user out of the application.
 * 
 * @csspart card - Styles the card container.
 * @csspart headline - Styles the headline section of the card.
 * @csspart content - Styles the content section of the card.
 */
import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { consume } from '@lit/context';
import { userContext, UserData } from '../contexts/user-context';
import { auth } from '../libs/firebase-config';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import '@material/web/labs/card/elevated-card';
import '@material/web/button/filled-button.js';

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
      // If no user data is available, display a login button.
      return html`
        <p>No user data available.</p>
        <md-filled-button @click=${this.login}
          >Login with Google</md-filled-button
        >
      `;
    }
    // If user data is available, display the user's profile information and a sign-out button.
    return html`
      <md-elevated-card class="card">
        <div class="headline">${this.userData.id}</div>
        <div class="content">
          ${this.userData.name ? this.userData.name : 'Name not available'}<br>
          ${this.userData.email ? this.userData.email : 'Email not available'}
          <md-filled-button @click=${this.signOut}>Sign Out</md-filled-button>
        </div>
      </md-elevated-card>
    `;
  }

  private async login() {
    // Initiates the Google login process using Firebase authentication.
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Login failed:', error);
    }
  }

  private signOut() {
    // Signs the user out of the application.
    auth.signOut();
  }
}

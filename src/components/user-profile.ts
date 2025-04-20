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
  @consume({ context: userContext, subscribe: true })
  userData!: UserData | null;
  
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
      return html`
        <p>No user data available.</p>
        <md-filled-button @click=${this.login}
          >Login with Google</md-filled-button
        >
      `;
    }
    return html`
      <md-elevated-card class="card">
        <div class="headline">${this.userData.id}</div>
        <div class="content">
          ${this.userData.name}<br>
          ${this.userData.email}
          <md-filled-button @click=${this.signOut}>Sign Out</md-filled-button>
        </div>
      </md-elevated-card>
    `;
  }

  private async login() {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Login failed:', error);
    }
  }

  private signOut() {
    auth.signOut();
  }
}

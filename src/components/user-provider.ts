import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { onSnapshot, doc } from 'firebase/firestore';
import { auth, db } from '../libs/firebase-config';
import { userContext, UserData } from '../contexts/user-context';
import { provide } from '@lit/context';

@customElement('user-provider')
export class UserProvider extends LitElement {
  @provide({ context: userContext }) // Use the `provide` decorator here
  @state()
  userData: UserData | null = null;

  unsubscribeAuth: (() => void) | null = null;

  connectedCallback() {
    super.connectedCallback();
    this.unsubscribeAuth = auth.onAuthStateChanged((user) => {
      if (user) {
        const userDoc = doc(db, 'users', user.uid);
        onSnapshot(userDoc, (snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.data() as Partial<UserData>;
            this.userData = { id: snapshot.id, ...data } as UserData;
          } else {
            this.userData = null;
          }
        });
      } else {
        this.userData = null;
      }
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.unsubscribeAuth?.();
  }

  render() {
    return html`<slot></slot>`;
  }
}

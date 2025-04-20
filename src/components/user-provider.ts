/**
 * A LitElement-based custom element that provides user data to its child components
 * using the `@lit/context` library. It listens to Firebase Authentication state changes
 * and Firestore updates to manage the user data context.
 *
 * @customElement user-provider
 *
 * @property {UserData | null} userData - The current user data, or `null` if no user is authenticated.
 *
 * @method connectedCallback
 * - Lifecycle method called when the element is added to the DOM.
 * - Subscribes to Firebase Authentication state changes and Firestore updates for the authenticated user.
 *
 * @method disconnectedCallback
 * - Lifecycle method called when the element is removed from the DOM.
 * - Unsubscribes from Firebase Authentication state changes to prevent memory leaks.
 *
 * @method render
 * - Renders a `<slot>` element to allow child components to be projected into this element.
 *
 * @decorator @customElement - Registers the class as a custom element with the tag name `user-provider`.
 * @decorator @provide - Provides the `userContext` to child components.
 * @decorator @state - Marks `userData` as a reactive property.
 */
import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { onSnapshot, doc } from 'firebase/firestore';
import { auth, db } from '../libs/firebase-config';
import { userContext, UserData } from '../contexts/user-context';
import { provide } from '@lit/context';

@customElement('user-provider')
export class UserProvider extends LitElement {
  @provide({ context: userContext }) // Use the `provide` decorator here to make `userContext` available to child components.
  @state() // Marks `userData` as a reactive property, so changes to it will trigger re-renders.
  userData: UserData | null = null;

  unsubscribeAuth: (() => void) | null = null;

  connectedCallback() {
    super.connectedCallback();
    // Subscribe to Firebase Authentication state changes.
    this.unsubscribeAuth = auth.onAuthStateChanged((user) => {
      if (user) {
        // If a user is authenticated, subscribe to their Firestore document.
        const userDoc = doc(db, 'users', user.uid);
        onSnapshot(userDoc, (snapshot) => {
          if (snapshot.exists()) {
            // If the document exists, update `userData` with the document data.
            const data = snapshot.data() as Partial<UserData>;
            this.userData = { id: snapshot.id, ...data } as UserData;
          } else {
            // If the document does not exist, set `userData` to null.
            this.userData = null;
          }
        });
      } else {
        // If no user is authenticated, set `userData` to null.
        this.userData = null;
      }
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    // Unsubscribe from Firebase Authentication state changes to prevent memory leaks.
    this.unsubscribeAuth?.();
  }

  render() {
    // Render a slot to allow child components to be projected into this element.
    return html`<slot></slot>`;
  }
}

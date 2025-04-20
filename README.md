# Lit Context and Firebase POC 

This project demonstrates the use of the `@lit/context` library to manage and share context between components in a Lit-based application. The primary focus is on using the `@provide` and `@consume` decorators to create a reactive context that updates components dynamically based on changes to a Firebase Firestore document.

## Features
- **Context Management**: Uses `@lit/context` to provide and consume context between components.
- **Firebase Integration**: Connects to Firebase Firestore to fetch and update data in real-time.
- **Reactive Components**: Components automatically update when the Firestore document changes.

## Components

### `user-provider`
- Acts as the context provider.
- Uses the `@provide` decorator to make the user data available to its child components.
- Listens to changes in a Firestore document and updates the context accordingly.

### `user-profile`
- Acts as the context consumer.
- Uses the `@consume` decorator to access the user data provided by `user-provider`.
- Displays user information and provides login/logout functionality using Firebase Authentication.

## Setup Instructions

### Prerequisites
- Node.js (v16 or later)
- Firebase project with Firestore and Authentication enabled

### Steps
1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd context-poc
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:
   Create a `.env` file in the project root with the following content:
   ```env
   VITE_FIREBASE_API_KEY=<your-firebase-api-key>
   VITE_FIREBASE_AUTH_DOMAIN=<your-firebase-auth-domain>
   VITE_FIREBASE_PROJECT_ID=<your-firebase-project-id>
   VITE_FIREBASE_STORAGE_BUCKET=<your-firebase-storage-bucket>
   VITE_FIREBASE_MESSAGING_SENDER_ID=<your-firebase-messaging-sender-id>
   VITE_FIREBASE_APP_ID=<your-firebase-app-id>
   VITE_FIREBASE_MEASUREMENT_ID=<your-firebase-measurement-id>
   ```

4. **Start the Development Server**:
   ```bash
   npm run dev
   ```

5. **Open the Application**:
   Open your browser and navigate to `http://localhost:5173` (default Vite development server port).

## How It Works

1. **Context Provider (`user-provider`)**:
   - The `user-provider` component uses the `@provide` decorator to expose a `userContext`.
   - It listens to a Firestore document snapshot and updates the context whenever the document changes.

2. **Context Consumer (`user-profile`)**:
   - The `user-profile` component uses the `@consume` decorator to access the `userContext`.
   - It dynamically updates its UI based on the context data.
   - Provides login and logout functionality using Firebase Authentication.

3. **Firebase Integration**:
   - The Firebase configuration is stored in environment variables and accessed using `import.meta.env`.
   - Firestore is used to fetch and listen to real-time updates from a document.

## Example Usage

### Context Provider & Consumer
The following example shows how the `user-provider` and `user-profile` components work together:

```html
<user-provider>
  <user-profile></user-profile>
</user-provider>
```

### Standalone Consumer
The `user-profile` component will not work unless it is wrapped in a `user-provider`:

```html
<user-profile></user-profile> <!-- This will not work -->
```

## Project Structure
```
context-poc/
├── index.html
├── package.json
├── tsconfig.json
├── vite-env.d.ts
├── src/
│   ├── components/
│   │   ├── user-profile.ts
│   │   ├── user-provider.ts
│   ├── contexts/
│   │   ├── user-context.ts
│   ├── libs/
│       ├── firebase-config.ts
```

## Notes
- Ensure that your Firebase project is properly configured with Firestore and Authentication.
- The `.env` file should not be committed to version control. Add it to `.gitignore` to keep it secure.

## License
This project is licensed under the MIT License.

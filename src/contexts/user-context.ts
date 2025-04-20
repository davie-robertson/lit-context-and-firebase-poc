import { createContext } from '@lit/context';

export interface UserData {
  id: string;
  name: string;
  email: string;
  // add other fields as required
}

export const userContext = createContext<UserData | null>('user-context');

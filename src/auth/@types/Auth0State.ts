import { Auth0Client, LogoutOptions, RedirectLoginOptions, User } from "@auth0/auth0-spa-js";

export interface Auth0State {
  auth0Client: () => Auth0Client | undefined;
  isInitialized: () => boolean;
  isAuthenticated: () => boolean;
  user: () => User | undefined;
  loginWithRedirect: (options?: RedirectLoginOptions) => Promise<void>;
  logout: (options?: LogoutOptions) => Promise<void>;
  getToken(): Promise<string>;
}

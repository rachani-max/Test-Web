export interface User {
  username: string;
  email: string;
}

export enum AuthStatus {
  IDLE = 'IDLE',
  AUTHENTICATING = 'AUTHENTICATING',
  AUTHENTICATED = 'AUTHENTICATED',
  ERROR = 'ERROR'
}

export interface Recommendation {
  title: string;
  reason: string;
}

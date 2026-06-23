import type { Job } from "./job";

export interface AuthState {
  isLoggedIn: boolean;
  user: string | null;
}

export interface AppState {
  jobs: Job[];
  auth: AuthState;
}

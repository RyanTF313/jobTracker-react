import React, { useReducer, useEffect } from "react";
import type { Job } from "../types";
import type { AppState, AuthState } from "../types";
import { appReducer } from "./appReducer";
import { AppContext } from "./appContextDef";

const JOBS_KEY = "jobTracker_jobs";
const AUTH_KEY = "jobTracker_auth";

const initialState: AppState = {
  jobs: [],
  filteredJobs: [],
  auth: { isLoggedIn: false, user: null, isReturning: false },
};

function loadJobsFromStorage(): Job[] {
  try {
    const raw = localStorage.getItem(JOBS_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as Job[]) : [];
  } catch {
    return [];
  }
}

function loadAuthFromStorage(): AuthState {
  const fallback: AuthState = { isLoggedIn: false, user: null, isReturning: false };
  try {
    const raw = sessionStorage.getItem(AUTH_KEY);
    if (!raw) return fallback;
    const parsed: unknown = JSON.parse(raw);
    if (
      typeof parsed !== "object" ||
      parsed === null ||
      typeof (parsed as Record<string, unknown>).isLoggedIn !== "boolean"
    ) {
      return fallback;
    }
    const auth = parsed as AuthState;
    if (auth.isLoggedIn && auth.user) {
      const knownRaw = localStorage.getItem("jobTracker_known_users");
      const known: string[] = knownRaw ? (JSON.parse(knownRaw) as string[]) : [];
      auth.isReturning = known.includes(auth.user);
    }
    return auth;
  } catch {
    return fallback;
  }
}

function buildInitialState(): AppState {
  const jobs = loadJobsFromStorage();
  const auth = loadAuthFromStorage();
  const filteredJobs =
    auth.isLoggedIn && auth.user
      ? jobs.filter((j) => j.owner === auth.user)
      : [];
  return { ...initialState, jobs, filteredJobs, auth };
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, undefined, buildInitialState);

  useEffect(() => {
    localStorage.setItem(JOBS_KEY, JSON.stringify(state.jobs));
  }, [state.jobs]);

  useEffect(() => {
    if (state.auth.isLoggedIn) {
      sessionStorage.setItem(AUTH_KEY, JSON.stringify(state.auth));
    } else {
      sessionStorage.removeItem(AUTH_KEY);
    }
  }, [state.auth]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

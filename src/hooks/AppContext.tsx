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
  auth: { isLoggedIn: false, user: null },
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
  const fallback: AuthState = { isLoggedIn: false, user: null };
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
    return parsed as AuthState;
  } catch {
    return fallback;
  }
}

function buildInitialState(): AppState {
  const jobs = loadJobsFromStorage();
  const auth = loadAuthFromStorage();
  return { ...initialState, jobs, filteredJobs: jobs, auth };
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, undefined, buildInitialState);

  useEffect(() => {
    localStorage.setItem(JOBS_KEY, JSON.stringify(state.jobs));
  }, [state.jobs]);

  useEffect(() => {
    sessionStorage.setItem(AUTH_KEY, JSON.stringify(state.auth));
  }, [state.auth]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

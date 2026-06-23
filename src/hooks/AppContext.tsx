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
  try {
    const raw = sessionStorage.getItem(AUTH_KEY);
    if (!raw) return { isLoggedIn: false, user: null };
    return JSON.parse(raw) as AuthState;
  } catch {
    return { isLoggedIn: false, user: null };
  }
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    const jobs = loadJobsFromStorage();
    const auth = loadAuthFromStorage();
    dispatch({ type: "LOAD_STATE", payload: { jobs, filteredJobs: jobs, auth } });
  }, []);

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

import React, { useReducer, useEffect } from "react";
import type { Job } from "../types";
import type { AppState, AuthState } from "../types";
import { appReducer } from "./appReducer";
import { AppContext } from "./appContextDef";
import { COLUMNS } from "../constants";
import { readKnownUsers } from "./knownUsers";

const JOBS_KEY = "jobTracker_jobs";
const AUTH_KEY = "jobTracker_auth";

const VALID_STATUSES = new Set(COLUMNS);

const initialState: AppState = {
  jobs: [],
  searchQuery: "",
  auth: { isLoggedIn: false, user: null, isReturning: false },
};

function isJobRecord(value: unknown): value is Job {
  if (typeof value !== "object" || value === null) return false;
  const job = value as Record<string, unknown>;
  return (
    typeof job.id === "string" &&
    typeof job.position === "string" &&
    typeof job.company === "string" &&
    typeof job.status === "string" &&
    VALID_STATUSES.has(job.status as Job["status"]) &&
    (typeof job.owner === "string" || job.owner === null)
  );
}

function loadJobsFromStorage(): Job[] {
  try {
    const raw = localStorage.getItem(JOBS_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed)
      ? parsed.filter(isJobRecord).map((job) => ({
          ...job,
          notes: typeof job.notes === "string" ? job.notes : "",
          salary:
            typeof job.salary === "string"
              ? job.salary
              : String(job.salary ?? ""),
        }))
      : [];
  } catch {
    return [];
  }
}

function loadAuthFromStorage(): AuthState {
  const fallback: AuthState = {
    isLoggedIn: false,
    user: null,
    isReturning: false,
  };
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
      auth.isReturning = readKnownUsers().includes(auth.user);
    }
    return auth;
  } catch {
    return fallback;
  }
}

function buildInitialState(): AppState {
  const jobs = loadJobsFromStorage();
  const auth = loadAuthFromStorage();
  return { ...initialState, jobs, searchQuery: "", auth };
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, undefined, buildInitialState);

  useEffect(() => {
    try {
      localStorage.setItem(JOBS_KEY, JSON.stringify(state.jobs));
    } catch {
      // Quota or private-mode write failures should not crash the app.
    }
  }, [state.jobs]);

  useEffect(() => {
    try {
      if (state.auth.isLoggedIn) {
        sessionStorage.setItem(AUTH_KEY, JSON.stringify(state.auth));
      } else {
        sessionStorage.removeItem(AUTH_KEY);
      }
    } catch {
      // Ignore storage write failures.
    }
  }, [state.auth]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

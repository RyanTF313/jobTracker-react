import type { Job } from "../types";
import type { AppState } from "../types";

export type AppAction =
  | { type: "ADD_JOB"; payload: Omit<Job, "id"> }
  | { type: "REMOVE_JOB"; payload: string }
  | { type: "UPDATE_JOB"; payload: Job }
  | { type: "SET_FILTERED_JOBS"; payload: Job[] }
  | { type: "CLEAR_JOBS" }
  | { type: "LOGIN"; payload: { user: string } }
  | { type: "LOGOUT" };

const ownerJobs = (jobs: Job[], user: string | null): Job[] =>
  user ? jobs.filter((j) => j.owner === user) : [];

export const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case "ADD_JOB": {
      const newJob: Job = { ...action.payload, id: crypto.randomUUID() };
      const updatedJobs = [...state.jobs, newJob];
      return {
        ...state,
        jobs: updatedJobs,
        filteredJobs: ownerJobs(updatedJobs, state.auth.user),
      };
    }
    case "REMOVE_JOB": {
      const updatedJobs = state.jobs.filter(
        (j) => !(j.id === action.payload && j.owner === state.auth.user),
      );
      return {
        ...state,
        jobs: updatedJobs,
        filteredJobs: ownerJobs(updatedJobs, state.auth.user),
      };
    }
    case "UPDATE_JOB": {
      const updatedJobs = state.jobs.map((j) =>
        j.id === action.payload.id && j.owner === state.auth.user
          ? action.payload
          : j,
      );
      return {
        ...state,
        jobs: updatedJobs,
        filteredJobs: ownerJobs(updatedJobs, state.auth.user),
      };
    }
    case "SET_FILTERED_JOBS":
      return { ...state, filteredJobs: action.payload };
    case "CLEAR_JOBS":
      return { ...state, jobs: [], filteredJobs: [] };
    case "LOGIN": {
      const username = action.payload.user;
      const knownRaw = localStorage.getItem("jobTracker_known_users");
      const known: string[] = knownRaw
        ? (JSON.parse(knownRaw) as string[])
        : [];
      return {
        ...state,
        filteredJobs: ownerJobs(state.jobs, username),
        auth: {
          isLoggedIn: true,
          user: username,
          isReturning: known.includes(username),
        },
      };
    }
    case "LOGOUT":
      return {
        ...state,
        auth: { isLoggedIn: false, user: null, isReturning: false },
        filteredJobs: [],
      };
    default:
      return state;
  }
};

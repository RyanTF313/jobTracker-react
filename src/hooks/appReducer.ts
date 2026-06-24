import type { Job } from "../types";
import type { AppState } from "../types";

export type AppAction =
  | { type: "ADD_JOB"; payload: Omit<Job, "id"> }
  | { type: "REMOVE_JOB"; payload: string }
  | { type: "UPDATE_JOB"; payload: Job }
  | { type: "SET_FILTERED_JOBS"; payload: Job[] }
  | { type: "LOGIN"; payload: { user: string } }
  | { type: "LOGOUT" };

export const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case "ADD_JOB": {
      const newJob = { ...action.payload, id: crypto.randomUUID() };
      return {
        ...state,
        jobs: [...state.jobs, newJob],
        filteredJobs: [...state.filteredJobs, newJob],
      };
    }
    case "REMOVE_JOB":
      return {
        ...state,
        jobs: state.jobs.filter((j) => j.id !== action.payload),
        filteredJobs: state.filteredJobs.filter((j) => j.id !== action.payload),
      };
    case "UPDATE_JOB":
      return {
        ...state,
        jobs: state.jobs.map((j) =>
          j.id === action.payload.id ? action.payload : j,
        ),
        filteredJobs: state.filteredJobs.map((j) =>
          j.id === action.payload.id ? action.payload : j,
        ),
      };
    case "SET_FILTERED_JOBS":
      return { ...state, filteredJobs: action.payload };
    case "LOGIN": {
      const username = action.payload.user;
      const knownRaw = localStorage.getItem("jobTracker_known_users");
      const known: string[] = knownRaw ? (JSON.parse(knownRaw) as string[]) : [];
      return {
        ...state,
        auth: { isLoggedIn: true, user: username, isReturning: known.includes(username) },
      };
    }
    case "LOGOUT":
      return {
        ...state,
        auth: { isLoggedIn: false, user: null, isReturning: false },
        filteredJobs: state.jobs,
      };
    default:
      return state;
  }
};

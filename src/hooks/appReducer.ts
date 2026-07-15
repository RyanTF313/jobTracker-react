import type { Job } from "../types";
import type { AppState } from "../types";

export type AppAction =
  | { type: "ADD_JOB"; payload: Omit<Job, "id"> }
  | { type: "REMOVE_JOB"; payload: string }
  | { type: "UPDATE_JOB"; payload: Job }
  | { type: "SET_SEARCH_QUERY"; payload: string }
  | { type: "CLEAR_CURRENT_USER_JOBS" }
  | {
      type: "LOGIN";
      payload: { user: string; isReturning: boolean };
    }
  | { type: "LOGOUT" };

export const ownerJobs = (jobs: Job[], user: string | null): Job[] =>
  user ? jobs.filter((j) => j.owner === user) : [];

export const filterJobs = (jobs: Job[], query: string): Job[] => {
  const term = query.trim().toLowerCase();
  if (!term) return jobs;
  return jobs.filter(
    (job) =>
      (typeof job.company === "string" &&
        job.company.toLowerCase().includes(term)) ||
      (typeof job.position === "string" &&
        job.position.toLowerCase().includes(term)),
  );
};

export const selectVisibleJobs = (state: AppState): Job[] =>
  filterJobs(ownerJobs(state.jobs, state.auth.user), state.searchQuery);

export const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case "ADD_JOB": {
      const newJob: Job = { ...action.payload, id: crypto.randomUUID() };
      return {
        ...state,
        jobs: [...state.jobs, newJob],
      };
    }
    case "REMOVE_JOB": {
      return {
        ...state,
        jobs: state.jobs.filter(
          (j) => !(j.id === action.payload && j.owner === state.auth.user),
        ),
      };
    }
    case "UPDATE_JOB": {
      return {
        ...state,
        jobs: state.jobs.map((j) =>
          j.id === action.payload.id && j.owner === state.auth.user
            ? { ...action.payload, owner: j.owner, id: j.id }
            : j,
        ),
      };
    }
    case "SET_SEARCH_QUERY":
      return { ...state, searchQuery: action.payload };
    case "CLEAR_CURRENT_USER_JOBS":
      return {
        ...state,
        jobs: state.jobs.filter((j) => j.owner !== state.auth.user),
        searchQuery: "",
      };
    case "LOGIN":
      return {
        ...state,
        searchQuery: "",
        auth: {
          isLoggedIn: true,
          user: action.payload.user,
          isReturning: action.payload.isReturning,
        },
      };
    case "LOGOUT":
      return {
        ...state,
        searchQuery: "",
        auth: { isLoggedIn: false, user: null, isReturning: false },
      };
    default:
      return state;
  }
};

import { createContext } from "react";
import type React from "react";
import type { AppState } from "../types";
import type { AppAction } from "./appReducer";

export interface AppContextValue {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}

export const AppContext = createContext<AppContextValue | null>(null);

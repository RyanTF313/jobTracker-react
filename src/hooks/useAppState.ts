import { useContext } from "react";
import { AppContext } from "./appContextDef";
import type { AppContextValue } from "./appContextDef";

export function useAppState(): AppContextValue {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppState must be used within an AppProvider");
  }
  return context;
}

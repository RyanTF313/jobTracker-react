import { createContext } from "react";
import type { Job, JobStatus } from "../types";

export type ModalState =
  | { type: null }
  | { type: "create"; column: JobStatus }
  | { type: "edit"; job: Job };

export type OpenModalArg = Exclude<ModalState, { type: null }>;

export interface ModalContextValue {
  modal: ModalState;
  openModal: (state: OpenModalArg) => void;
  closeModal: () => void;
}

export const ModalContext = createContext<ModalContextValue | null>(null);

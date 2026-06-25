import React, { useState } from "react";
import { ModalContext } from "./modalContextDef";
import type { ModalState, OpenModalArg } from "./modalContextDef";

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [modal, setModal] = useState<ModalState>({ type: null });

  const openModal = (state: OpenModalArg) => setModal(state);
  const closeModal = () => setModal({ type: null });

  return (
    <ModalContext.Provider value={{ modal, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
}

import type { SubmitEvent } from "react";
import { useAppState } from "./../hooks";

import { WelcomeBar } from "./ui/WelcomeBar";

export const WelcomeSection = () => {
  const { state, dispatch } = useAppState();
  const { auth } = state;
  const logout = () => dispatch({ type: "LOGOUT" });

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>): void => {
    event.preventDefault();
    logout();
  };

  const handleClearData = (): void => {
    if (!confirm("This will permanently delete all your job data. Continue?")) {
      return;
    }
    dispatch({ type: "CLEAR_CURRENT_USER_JOBS" });
  };

  return (
    <>
      <section id="welcome-section">
        <WelcomeBar user={auth.user} isReturning={auth.isReturning} />
        <form id="logout-form" onSubmit={handleSubmit}>
          <button type="submit" id="logout-button" className="btn">
            Logout
          </button>
          <button
            type="button"
            id="clear-storage-button"
            className="btn danger"
            onClick={handleClearData}
          >
            Clear Data
          </button>
        </form>
      </section>
    </>
  );
};

import type { SubmitEvent } from "react";
import { useEffect } from "react";
import { useAppState } from "./../hooks";
import { WelcomeBar } from "./ui/WelcomeBar";

const JOBS_KEY = "jobTracker_jobs";

export const WelcomeSection = () => {
  const { state, dispatch } = useAppState();
  const { auth } = state;
  const logout = () => dispatch({ type: "LOGOUT" });

  useEffect(() => {
    if (auth.user) {
      const knownRaw = localStorage.getItem("jobTracker_known_users");
      const known: string[] = knownRaw ? (JSON.parse(knownRaw) as string[]) : [];
      if (!known.includes(auth.user)) {
        localStorage.setItem("jobTracker_known_users", JSON.stringify([...known, auth.user]));
      }
    }
  }, [auth.user]);

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>): void => {
    event.preventDefault();
    logout();
  };

  const handleClearData = (): void => {
    if (!confirm("This will permanently delete all your job data. Continue?")) {
      return;
    }
    localStorage.removeItem(JOBS_KEY);
    dispatch({ type: "CLEAR_JOBS" });
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

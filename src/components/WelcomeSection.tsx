import type { SubmitEvent, MouseEvent } from "react";
import { useEffect } from "react";
import { useAppState } from "./../hooks";
import { WelcomeBar } from "./WelcomeBar";

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

  const handleClick = (event: MouseEvent<HTMLButtonElement>): void => {
    console.log(event);
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
            onClick={handleClick}
          >
            Clear Data
          </button>
        </form>
      </section>
    </>
  );
};

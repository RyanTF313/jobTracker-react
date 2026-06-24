import type { SubmitEvent, MouseEvent } from "react";
import { useAppState } from "./../hooks";

export const WelcomeSection = () => {
  const { dispatch } = useAppState();
  const logout = () => dispatch({ type: "LOGOUT" });

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>): void => {
    event.preventDefault();
    logout();
  };

  const handleClick = (event: MouseEvent<HTMLButtonElement>): void => {
    console.log(event)
  };

  return (
    <>
      <section id="welcome-section">
        <h3 id="welcome-message"></h3>
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

import type { ChangeEvent, SubmitEvent } from "react";
import { useState } from "react";
import { useAppState } from "@hooks/useAppState";
import { readKnownUsers, rememberKnownUser } from "@hooks/knownUsers";

export const LoginModal = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const { dispatch } = useAppState();

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const user = inputValue.trim();
    if (!user) return;
    const isReturning = readKnownUsers().includes(user);
    rememberKnownUser(user);
    dispatch({ type: "LOGIN", payload: { user, isReturning } });
  };

  return (
    <div>
      <dialog id="login-modal" open>
        <form id="login-form" onSubmit={handleSubmit}>
          <h2>Login</h2>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            onChange={handleChange}
            value={inputValue}
            required
          />
          <button type="submit" id="login-button" className="btn">
            Login
          </button>
        </form>
      </dialog>
    </div>
  );
};

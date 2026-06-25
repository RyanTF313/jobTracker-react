import type { ChangeEvent, SubmitEvent } from "react";
import { useState } from "react";
import { useAppState } from "@hooks/useAppState";

export const LoginModal = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const { dispatch } = useAppState();
  const login = () =>
    dispatch({ type: "LOGIN", payload: { user: inputValue } });

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>): void => {
    event.preventDefault();
    login();
  };
  
  return (
    <div>
      <dialog
        id="login-modal"
        open
      >
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

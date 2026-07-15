import type { ChangeEvent } from "react";
import { useAppState } from "@hooks/useAppState";

export const SearchBar = () => {
  const { state, dispatch } = useAppState();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "SET_SEARCH_QUERY", payload: event.target.value });
  };

  return (
    <section id="job-search-form-section">
      <form id="job-search-form" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="job-search">Search </label>
        <input
          id="job-search"
          name="jobSearch"
          type="search"
          value={state.searchQuery}
          onChange={handleChange}
        />
      </form>
    </section>
  );
};

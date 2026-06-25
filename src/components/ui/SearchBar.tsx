import { useState, type ChangeEvent } from "react";
import { useAppState } from "@hooks/useAppState";
import type { Job } from "src/types";

export const SearchBar = () => {
  const { state, dispatch } = useAppState();
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    setSearchTerm(term);

    const myJobs = state.jobs.filter((j) => j.owner === state.auth.user);
    if (!term) {
      dispatch({ type: "SET_FILTERED_JOBS", payload: myJobs });
    } else {
      const lower = term.toLowerCase();
      dispatch({
        type: "SET_FILTERED_JOBS",
        payload: myJobs.filter(
          (job: Job) =>
            job.company.toLowerCase().includes(lower) ||
            job.position.toLowerCase().includes(lower),
        ),
      });
    }
  };

  return (
    <section id="job-search-form-section">
      <form id="job-search-form" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="job-search">Search </label>
        <input
          id="job-search"
          name="jobSearch"
          type="search"
          value={searchTerm}
          onChange={handleChange}
        />
      </form>
    </section>
  );
};

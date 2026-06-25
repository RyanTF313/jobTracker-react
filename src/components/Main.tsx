import { JobBoard } from "./JobBoard";
import { WelcomeSection } from "./WelcomeSection";

export const Main = () => {
  return (
    <>
      <div className="container">
        <WelcomeSection />

        <nav id="view-nav">
          <button className="btn view-tab active" data-view="board">
            Board View
          </button>
          <button className="btn view-tab" data-view="analytics">
            Analytics View
          </button>
        </nav>

        <section id="job-search-form-section">
          <form id="job-search-form">
            <label htmlFor="job-search">Search</label>
            <input
              id="job-search"
              name="jobSearch"
              type="search"
              //   incremental="true"
            />
          </form>
        </section>
        <JobBoard />

        <section id="analytics-section"></section>
      </div>
    </>
  );
};

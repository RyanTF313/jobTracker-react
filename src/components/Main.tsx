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

        <section id="job-board">
          <table>
            <thead>
              <tr>
                <th>
                  <p>Wishlist</p>
                  <button className="btn table-column" data-column="wishlist">
                    +
                  </button>
                </th>
                <th>
                  <p>Applied</p>
                  <button className="btn table-column" data-column="applied">
                    +
                  </button>
                </th>
                <th>
                  <p>Interviewing</p>
                  <button
                    className="btn table-column"
                    data-column="interviewing"
                  >
                    +
                  </button>
                </th>
                <th>
                  <p>Offer</p>
                  <button className="btn table-column" data-column="offer">
                    +
                  </button>
                </th>
                <th>
                  <p>Rejected</p>
                  <button className="btn table-column" data-column="rejected">
                    +
                  </button>
                </th>
              </tr>
            </thead>
            <tbody id="job-board-body"></tbody>
          </table>
        </section>

        <section id="analytics-section"></section>
      </div>
    </>
  );
};

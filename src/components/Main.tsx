import { useState } from "react";
import { JobBoard } from "./JobBoard";
import { WelcomeSection } from "./WelcomeSection";
import { SearchBar } from "./ui";

type View = "board" | "analytics";

export const Main = () => {
  const [activeView, setActiveView] = useState<View>("board");

  return (
    <>
      <div className="container">
        <WelcomeSection />

        <nav id="view-nav">
          <button
            className={`btn view-tab${activeView === "board" ? " active" : ""}`}
            data-view="board"
            onClick={() => setActiveView("board")}
          >
            Board View
          </button>
          <button
            className={`btn view-tab${activeView === "analytics" ? " active" : ""}`}
            data-view="analytics"
            onClick={() => setActiveView("analytics")}
          >
            Analytics View
          </button>
        </nav>

        {activeView === "board" && <SearchBar />}
        {activeView === "board" && <JobBoard />}

        {activeView === "analytics" && <section id="analytics-section"></section>}
      </div>
    </>
  );
};

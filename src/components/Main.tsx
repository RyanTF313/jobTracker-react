import { useState } from "react";
import { JobBoard } from "./JobBoard";
import { ViewNav } from "./ViewNav";
import { AnalyticsView } from "./AnalyticsView";
import { WelcomeSection } from "./WelcomeSection";
import { SearchBar } from "./ui";
import type { View } from "src/types";
import { useAppState } from "@hooks/useAppState";

export const Main = () => {
  const [activeView, setActiveView] = useState<View>("board");
  const {
    state: { filteredJobs },
  } = useAppState();
  return (
    <>
      <div className="container">
        <WelcomeSection />
        <ViewNav activeView={activeView} setActiveView={setActiveView} />
        {activeView === "board" && <SearchBar />}
        {activeView === "board" && <JobBoard />}

        {activeView === "analytics" && <AnalyticsView jobs={filteredJobs} />}
      </div>
    </>
  );
};

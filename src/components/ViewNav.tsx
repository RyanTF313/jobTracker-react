import type { Dispatch, SetStateAction } from "react";
import type { View } from "src/types";

type ViewNavProps = {
  activeView: "board" | "analytics";
  setActiveView: Dispatch<SetStateAction<View>>;
};

export const ViewNav = ({ activeView, setActiveView }: ViewNavProps) => {
  return (
    <>
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
    </>
  );
};

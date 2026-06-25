import type { MouseEvent } from "react";
import { EmptyColoumnCard, JobCard } from "./ui";
import { COLUMNS, COLUMN_LABELS } from "./../constants";
import { useAppState } from "@hooks/useAppState";
import type { Job } from "src/types";

export const JobBoard = () => {
  const {
    state: { filteredJobs },
  } = useAppState();

  const handleClick = (event: MouseEvent<HTMLButtonElement>): void => {
    console.log("open add modal: ", event.currentTarget.dataset["column"]);
  };

  const columns = COLUMNS.map((column) => {
    return (
      <th key={column}>
        <p>{COLUMN_LABELS[column]}</p>
        <button
          className="btn table-column"
          data-column={column}
          onClick={handleClick}
        >
          +
        </button>
      </th>
    );
  });

  const occupiedStatuses = new Set(filteredJobs.map((j: Job) => j.status));
  const emptyStatuses = COLUMNS.filter((s) => !occupiedStatuses.has(s));

  return (
    <>
      <section id="job-board">
        <table>
          <thead>
            <tr>{columns}</tr>
          </thead>
          <tbody id="job-board-body">
            {filteredJobs.map((job: Job) => <JobCard job={job} />)}
            <tr>
              {COLUMNS.map((column) => (
                <td key={column}>
                  {emptyStatuses.includes(column) && <EmptyColoumnCard />}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </section>
    </>
  );
};

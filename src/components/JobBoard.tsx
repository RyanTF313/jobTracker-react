import { type MouseEvent } from "react";
import { EmptyColoumnCard, JobCard } from "./ui";
import { COLUMNS, COLUMN_LABELS } from "./../constants";
import { useAppState } from "@hooks/useAppState";
import { useModal } from "@hooks/useModal";
import { selectVisibleJobs } from "@hooks/appReducer";
import type { Job, JobStatus } from "src/types";

export const JobBoard = () => {
  const { openModal } = useModal();
  const { state } = useAppState();
  const visibleJobs = selectVisibleJobs(state);

  const handleClick = (event: MouseEvent<HTMLButtonElement>): void => {
    const col = event.currentTarget.dataset["column"] as JobStatus | undefined;
    if (!col) return;
    openModal({ type: "create", column: col });
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

  const occupiedStatuses = new Set(visibleJobs.map((j: Job) => j.status));
  const emptyStatuses = COLUMNS.filter((s) => !occupiedStatuses.has(s));

  return (
    <section id="job-board">
      <table>
        <thead>
          <tr>{columns}</tr>
        </thead>
        <tbody id="job-board-body">
          {visibleJobs.map((job: Job) => (
            <JobCard job={job} key={job.id} />
          ))}
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
  );
};

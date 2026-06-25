import { type MouseEvent, useState } from "react";
import { EmptyColoumnCard, JobCard } from "./ui";
import { CreateJobModal } from "./forms";
import { COLUMNS, COLUMN_LABELS } from "./../constants";
import { useAppState } from "@hooks/useAppState";
import type { Job, JobStatus } from "src/types";

export const JobBoard = () => {
  const [modalOpen, setModalopen] = useState<boolean>(false);
  const [currentCol, setCurrentCol] = useState<JobStatus>("wishlist");
  const {
    state: { filteredJobs },
  } = useAppState();

  const handleClick = (event: MouseEvent<HTMLButtonElement>): void => {
    const col = event.currentTarget.dataset["column"] as JobStatus | undefined;

    if (!col) return;

    setCurrentCol(col);
    setModalopen(true);
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
      {modalOpen && (
        <CreateJobModal
          key={currentCol}
          column={currentCol}
          closeModal={() => setModalopen(false)}
        />
      )}
      <section id="job-board">
        <table>
          <thead>
            <tr>{columns}</tr>
          </thead>
          <tbody id="job-board-body">
            {filteredJobs.map((job: Job) => (
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
    </>
  );
};

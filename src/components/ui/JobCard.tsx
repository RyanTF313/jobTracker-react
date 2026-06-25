import type { Job, JobStatus } from "src/types";
import { COLUMNS } from "./../../constants";
import { type DragEvent, type MouseEvent } from "react";
import { useModal } from "@hooks/useModal";
import { useAppState } from "@hooks/useAppState";

type JobCardProps = {
  job: Job;
};

export const JobCard = ({ job }: JobCardProps) => {
  const { openModal } = useModal();
  const { state: { jobs }, dispatch } = useAppState();
  const { company, status, id } = job;

  const handleClick = (event: MouseEvent<HTMLParagraphElement>) => {
    event.preventDefault();
    openModal({ type: "edit", job });
  };

  const handleDragStart = (event: DragEvent<HTMLTableCellElement>) => {
    event.dataTransfer.setData("text/plain", id);
  };

  const handleDragOver = (event: DragEvent<HTMLTableCellElement>) => {
    event.preventDefault();
  };

  const handleDragDrop = (event: DragEvent<HTMLTableCellElement>, targetStatus: JobStatus) => {
    event.preventDefault();
    const jobId = event.dataTransfer.getData("text/plain");
    const draggedJob = jobs.find((j) => j.id === jobId);
    if (!draggedJob || draggedJob.status === targetStatus) return;
    dispatch({ type: "UPDATE_JOB", payload: { ...draggedJob, status: targetStatus } });
  };

  return (
    <tr>
      {COLUMNS.map((column: JobStatus, idx: number) => {
        const isCard = status === column;
        return (
          <td
            className={isCard ? "card" : ""}
            draggable={isCard}
            key={`${id}-${idx}`}
            onDragStart={isCard ? handleDragStart : undefined}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDragDrop(e, column)}
          >
            <p onClick={handleClick} data-id={id}>
              {isCard ? company : ""}
            </p>
          </td>
        );
      })}
    </tr>
  );
};

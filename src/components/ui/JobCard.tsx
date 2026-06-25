import type { Job, JobStatus } from "src/types";
import { COLUMNS } from "./../../constants";
import type { MouseEvent } from "react";

type JobCardProps = {
  job: Job;
};
export const JobCard = ({ job }: JobCardProps) => {
  const { company, status, id } = job;
  const handleClick = (event: MouseEvent<HTMLParagraphElement>) => {
    console.log("open edit modal: ", event.currentTarget.dataset["id"]);
  };
  return (
    <>
      <tr>
        {COLUMNS.map((column: JobStatus, idx: number) => (
          <td
            className={status === column ? "card" : ""}
            draggable
            key={`${id}-${idx}`}
          >
            <p onClick={handleClick} data-id={id}>
              {status === column ? company : ""}
            </p>
          </td>
        ))}
      </tr>
    </>
  );
};

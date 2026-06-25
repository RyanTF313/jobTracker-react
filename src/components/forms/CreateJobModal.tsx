import { useAppState } from "@hooks/useAppState";
import { useEffect, useRef, useState, type ChangeEvent, type SubmitEvent } from "react";
import type { Job, JobStatus } from "src/types";

type CreateJobModalProps = {
  column: JobStatus;
  closeModal: () => void;
};

export const CreateJobModal = ({
  column,
  closeModal,
}: CreateJobModalProps) => {
  const { state, dispatch } = useAppState();
  const [createFormData, setCreateFormData] = useState<Omit<Job, "id">>({
    position: "",
    company: "",
    notes: "",
    salary: "",
    status: column,
    owner: state.auth.user,
  });
  const { position, company, notes, salary } = createFormData;

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setCreateFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    createJob();
    closeModal();
  };

  const handleCancel = () => {
    closeModal();
  };

  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    dialog?.showModal();
    return () => { dialog?.close(); };
  }, []);

  const createJob = () => {
    dispatch({ type: "ADD_JOB", payload: createFormData });
  };

  return (
    <>
      <dialog ref={dialogRef} id="create-job-modal" onCancel={handleCancel}>
        <form id="create-job-form" onSubmit={handleSubmit}>
          <h2>Create Job</h2>
          <label htmlFor="position">Position:</label>
          <input
            type="text"
            id="position"
            name="position"
            required
            onChange={handleChange}
            value={position}
          />
          <label htmlFor="company">Company:</label>
          <input
            type="text"
            id="company"
            name="company"
            required
            onChange={handleChange}
            value={company}
          />
          <label htmlFor="notes">Notes:</label>
          <textarea
            id="notes"
            name="notes"
            onChange={handleChange}
            value={notes}
          ></textarea>
          <label htmlFor="salary">Salary:</label>
          <input
            type="number"
            id="salary"
            name="salary"
            step="1000"
            onChange={handleChange}
            value={salary}
          />
          <button
            type="button"
            id="cancel-create-job-button"
            className="btn danger"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button type="submit" id="create-job-button" className="btn">
            Create Job
          </button>
        </form>
      </dialog>
    </>
  );
};

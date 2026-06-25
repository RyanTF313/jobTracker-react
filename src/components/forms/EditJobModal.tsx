import { useAppState } from "@hooks/useAppState";
import { useModal } from "@hooks/useModal";
import { COLUMNS, COLUMN_LABELS } from "../../constants";
import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type SubmitEvent,
} from "react";
import type { Job } from "src/types";

type EditJobModalProps = {
  job: Job;
};

export const EditJobModal = ({ job }: EditJobModalProps) => {
  const { dispatch } = useAppState();
  const { closeModal } = useModal();
  const [createFormData, setCreateFormData] = useState<Job>(job);
  const { position, company, notes, salary, status, id } = createFormData;

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    setCreateFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch({ type: "UPDATE_JOB", payload: createFormData });
    closeModal();
  };

  const handleRemove = () => {
    dispatch({ type: "REMOVE_JOB", payload: id });
    closeModal();
  };

  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    dialog?.showModal();
    return () => {
      dialog?.close();
    };
  }, []);

  return (
    <dialog ref={dialogRef} id="job-details-modal" onCancel={closeModal}>
      <form id="job-edit-form" onSubmit={handleSubmit}>
        <label htmlFor="edit-position">Role:</label>
        <input
          type="text"
          id="edit-position"
          name="position"
          required
          onChange={handleChange}
          value={position}
        />
        <label htmlFor="edit-company">Company:</label>
        <input
          type="text"
          id="edit-company"
          name="company"
          required
          onChange={handleChange}
          value={company}
        />
        <label htmlFor="edit-status">Status:</label>
        <select
          id="edit-status"
          name="status"
          required
          onChange={handleChange}
          value={status}
        >
          {COLUMNS.map((col) => (
            <option key={col} value={col}>
              {COLUMN_LABELS[col]}
            </option>
          ))}
        </select>
        <label htmlFor="edit-salary">Salary:</label>
        <input
          type="text"
          id="edit-salary"
          name="salary"
          required
          onChange={handleChange}
          value={salary}
        />
        <label htmlFor="edit-notes">Notes:</label>
        <textarea
          name="notes"
          id="edit-notes"
          onChange={handleChange}
          value={notes}
        ></textarea>
        <button
          type="button"
          id="job-remove-button"
          className="btn danger"
          onClick={handleRemove}
        >
          Remove Job
        </button>
        <button
          type="button"
          id="job-cancel-button"
          className="btn cancel"
          onClick={closeModal}
        >
          Cancel
        </button>
        <button type="submit" id="job-save-button" className="btn">
          Save
        </button>
      </form>
    </dialog>
  );
};

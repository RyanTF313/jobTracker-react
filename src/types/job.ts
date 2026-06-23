export interface Job {
  id: string;
  position: string;
  company: string;
  status: JobStatus;
  notes: string;
  salary: string;
};

export type JobStatus =
  | "wishlist"
  | "applied"
  | "interviewing"
  | "offer"
  | "rejected";

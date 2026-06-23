import type { JobStatus } from "../types";

export const COLUMNS: JobStatus[] = [
  "wishlist",
  "applied",
  "interviewing",
  "offer",
  "rejected",
];

export const COLUMN_LABELS: Record<JobStatus, string> = {
  wishlist: "Wishlist",
  applied: "Applied",
  interviewing: "Interviewing",
  offer: "Offer",
  rejected: "Rejected",
};

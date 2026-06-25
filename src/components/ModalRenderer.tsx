import { useModal } from "@hooks/useModal";
import { CreateJobModal } from "./forms/CreateJobModal";
import { EditJobModal } from "./forms/EditJobModal";

export const ModalRenderer = () => {
  const { modal } = useModal();

  if (modal.type === "create") return <CreateJobModal column={modal.column} />;
  if (modal.type === "edit") return <EditJobModal job={modal.job} />;
  return null;
};

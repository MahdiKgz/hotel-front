import React, { Dispatch, SetStateAction } from "react";
import { Modal } from "antd";
import AddOrEditDomainForm, { initialValuesType } from "./AddOrEditDomainForm";

interface AddOrEditDomainModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  initialValues: initialValuesType | null;
  onCloseModal: Dispatch<SetStateAction<initialValuesType | null>>;
}

function AddOrEditDomainModal({
  open,
  setOpen,
  initialValues,
  onCloseModal,
}: AddOrEditDomainModalProps) {
  const title = initialValues !== null ? "ویرایش امکانات" : "افزودن امکانات";
  const handleCancelModal = () => {
    setOpen(() => false);
    onCloseModal(null);
  };
  return (
    <Modal
      open={open}
      onCancel={handleCancelModal}
      title={title}
      footer={null}
      width={1000}
    >
      <AddOrEditDomainForm initialValues={initialValues} />
    </Modal>
  );
}

export default AddOrEditDomainModal;

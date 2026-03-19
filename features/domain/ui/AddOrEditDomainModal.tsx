import React, { Dispatch, SetStateAction } from "react";
import { Modal } from "antd";
import AddOrEditDomainForm from "./AddOrEditDomainForm";

interface AddOrEditDomainModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

function AddOrEditDomainModal({ open, setOpen }: AddOrEditDomainModalProps) {
  const title = true ? "افزودن امکانات" : "ویرایش امکانات";
  return (
    <Modal
      open={open}
      onCancel={() => setOpen(() => false)}
      title={title}
      footer={null}
      width={1000}
    >
      <AddOrEditDomainForm initialValues={null} />
    </Modal>
  );
}

export default AddOrEditDomainModal;

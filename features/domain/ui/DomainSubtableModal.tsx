import React, { Dispatch, SetStateAction, useState } from "react";
import { Button, Modal } from "antd";
import DomainSubtable from "./DomainSubtable";
import AddOrEditDomainModal from "./AddOrEditDomainModal";
import { TbCirclePlus } from "react-icons/tb";

interface DomainSubtableModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

function DomainSubtableModal({
  open = false,
  setOpen,
}: DomainSubtableModalProps) {
  const [openSubtableModal, setOpenSubtableModal] = useState<boolean>(false);
  return (
    <>
      <Modal
        title="مدیریت امکانات"
        open={open}
        onCancel={() => setOpen(() => false)}
        width={1000}
        footer={null}
      >
        <div className="w-full flex justify-end">
          <Button
            onClick={() => setOpenSubtableModal(() => true)}
            type="text"
            variant="filled"
          >
            <TbCirclePlus size={18} />
          </Button>
        </div>
        <DomainSubtable />
        <AddOrEditDomainModal
          open={openSubtableModal}
          setOpen={setOpenSubtableModal}
        />
      </Modal>
    </>
  );
}

export default DomainSubtableModal;

import { Modal } from "antd";
import React, { Dispatch, SetStateAction } from "react";
import ResetPasswordForm from "./ResetPasswordForm";
import { ToastContainer } from "react-toastify";

interface ResetPasswordModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

function ResetPasswordModal({
  open = false,
  setOpen,
}: ResetPasswordModalProps) {
  return (
    <Modal
      open={open}
      footer={null}
      onCancel={() => setOpen(() => false)}
      title="بازنشانی رمز عبور"
    >
      <ResetPasswordForm setOpen={setOpen} />
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={true}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Modal>
  );
}

export default ResetPasswordModal;

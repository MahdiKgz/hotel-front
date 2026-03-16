"use client";
import React, { useState } from "react";
import { Button, Drawer, Modal } from "antd";

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <div className="container flex items-center justify-between top-8 p-4 text-white fixed inset-x-0 rounded bg-gray-900">
      Header
      <Button
        onClick={() => setOpen(() => true)}
        color="primary"
        variant="filled"
      >
        Open menu
      </Button>
    </div>
  );
}

export default Header;

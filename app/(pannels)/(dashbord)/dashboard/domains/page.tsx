import React from "react";
import DomainTable from "@/features/domain/ui/DomainTable";

function DomainManagement() {
  return (
    <div className="w-full h-full flex flex-col items-start gap-6">
      <h1 className="font-bold text-xl">مدیریت دامنه ها</h1>
      <DomainTable />
    </div>
  );
}

export default DomainManagement;

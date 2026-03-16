import React from "react";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-screen! bg-[#F5F5F4] flex flex-col items-center justify-center gap-14">
      <div className="auht-header flex items-center text-4xl font-bold">
        مستر هتل
      </div>
      {children}
    </div>
  );
}

export default layout;

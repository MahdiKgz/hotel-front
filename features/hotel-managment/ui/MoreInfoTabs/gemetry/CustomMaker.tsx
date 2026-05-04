import React from "react";
import { ImLocation } from "react-icons/im";

function CustomMaker({ mapRef }: { mapRef: maplibregl.Map }) {
  if (!mapRef) return;

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="w-8 h-8 bg-brand rounded-full flex items-center justify-center">
        <ImLocation size={18} className="fill-blue-200" />
      </div>
    </div>
  );
}

export default CustomMaker;

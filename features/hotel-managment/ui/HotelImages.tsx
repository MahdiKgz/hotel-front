import React from "react";
import UploadHotelCover from "./UploadHotelCover";
import UploadHotelImages from "./UploadHotelImages";

function HotelImages({ slug }: { slug: string }) {
  return (
    <div className="w-full flex flex-col items-start gap-5">
      <div className="w-full flex flex-col items-start gap-3.5">
        <h1 className="text-sm font-bold">آپلود کاور</h1>
        <UploadHotelCover slug={slug} />
      </div>
      <div className="w-full flex flex-col items-start gap-3.5">
        <h1 className="text-sm font-bold">آپلود گالری</h1>
        <UploadHotelImages slug={slug} />
      </div>
    </div>
  );
}

export default HotelImages;

import React from "react";
import { format } from "date-fns";
import { IAuction } from "@/interfaces/auction.interface";

interface Props {
  auction: IAuction;
}

export const AuctionCard: React.FC<Props> = ({ auction }) => {
  return (
    <div key={auction.id} className="flex cursor-pointer">
      <div className="w-[185px] h-[44px]">
        <span className="italic font-normal text-xs text-[#394046]">
          {auction.city}
        </span>
        <div className="overflow-hidden line-clamp-2 text-sm">
          {auction.title}
        </div>
      </div>

      <div className="flex flex-col items-end w-[95px] ml-5 ">
        <div className="bg-primary-1 font-bold text-center uppercase text-white py-[2px] px-[5px] text-[10px] w-[95px] mb-1 whitespace-nowrap">
          {auction?.starts && format(auction?.starts, "M/d/yy")} -{" "}
          {auction?.ends && format(auction?.ends, "M/d/yy")}
        </div>
        <span className="text-primary bg-gray-3 px-1 py-[2px] text-sm">
          {auction.item_count} Lots
        </span>
      </div>
    </div>
  );
};

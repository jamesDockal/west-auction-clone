import { ILot } from "@/interfaces/auction.interface";
import React from "react";
import { format } from "date-fns";

interface Props {
  lot: ILot;
}

export const LotCard: React.FC<Props> = ({ lot }) => {
  const currentbid = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(lot.current_bid);

  return (
    <div className="flex h-[60px]">
      <img className="w-[60px]  rounded-[6px] mr-[10px]" src={lot.thumb_url} />
      <div className="w-[99px] overflow-hidden line-clamp-3 text-sm h-full">
        {lot.title}
      </div>

      <div className="ml-[20px] text-xs text-[#394046] font-normal w-[111px]">
        <div className="flex flex-col items-end">
          <div className="bg-primary-1 font-bold text-center uppercase text-white py-[2px] px-[5px] text-[10px] w-[95px] mb-1">
            {format(lot?.availabilityStarts, "M/d/yy")} -{" "}
            {format(lot?.availabilityEnds, "M/d/yy")}
          </div>
          <div>
            <span>Current: </span>
            <span className="text-primary font-bold">{currentbid}</span>
          </div>
          <div className="mt-[2px]">{lot.mapping_city}</div>
        </div>
      </div>
    </div>
  );
};

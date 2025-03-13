import { ILot, IOffer } from "@/interfaces/auction.interface";
import React from "react";
import { format } from "date-fns";

interface Props {
  lot: ILot;
  offer: IOffer;
}

export const LotCard: React.FC<Props> = ({ lot, offer }) => {
  return (
    <div className="flex h-[60px]">
      <img className="w-[60px]  rounded-[6px] mr-[10px]" src={lot.thumb_url} />
      <div className="w-[99px] overflow-hidden line-clamp-3 text-sm h-full">
        {lot.title}
      </div>

      <div className="ml-[20px] text-xs text-[#394046] font-normal w-[111px]">
        <div className="flex flex-col items-end">
          <div className="bg-primary-1 font-bold text-center uppercase text-white py-[2px] px-[5px] text-[10px] w-[95px] mb-1">
            {format(offer?.availabilityStarts, "M/d/yy")} -{" "}
            {format(offer?.availabilityEnds, "M/d/yy")}
          </div>
          <div>
            <span>Current: </span>
            <span className="text-primary font-bold">$ {lot.current_bid}</span>
          </div>
          <div className="mt-[2px]">{lot.mapping_city}</div>
        </div>
      </div>
    </div>
  );
};

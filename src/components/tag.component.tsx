import { CircleX } from "lucide-react";
import React from "react";

type Props = {
  text: string;
};

export const Tag: React.FC<Props> = ({ text }) => {
  return (
    <div className="flex items-center bg-gray-3 text-gray-1 font text-[10px] gap-1 px-1.5 py-[3px] rounded-[10px]">
      {text}
      <CircleX className="text-gray-1 cursor-pointer" height={13} width={13} />
    </div>
  );
};

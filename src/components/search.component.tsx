import { Search as SearchIcon } from "lucide-react";
import React from "react";

export const Search: React.FC = () => {
  return (
    <>
      <SearchIcon className="absolute text-gray-2 w-[24px] h-[24px] ml-[12px]" />
      <input
        className="w-[130px] h-[44px] rounded-[30px] border-2 flex cursor-pointer pl-[52px] font-semibold placeholder-gray-2 pt-[1px]"
        placeholder="Search"
      />
    </>
  );
};

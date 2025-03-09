import { CircleX, Search as SearchIcon } from "lucide-react";
import React, { useEffect, useState } from "react";

interface Props {
  isFocusedCallback: (value: boolean) => void;
}

export const Search: React.FC<Props> = ({ isFocusedCallback }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  useEffect(() => {
    isFocusedCallback(isFocused);
  }, [isFocused, isFocusedCallback]);

  return (
    <div className="relative">
      <SearchIcon className="absolute left-[12px] top-1/2 transform -translate-y-1/2 text-gray-2 w-[24px] h-[24px]" />
      <input
        className={`
          transition-all duration-300
          ${isFocused ? "w-[640px]" : "w-[130px]"}
          font-semibold placeholder-gray-2 pt-[1px] rounded-[30px] border-2 cursor-pointer pl-[52px] h-[44px]
        `}
        placeholder={isFocused ? "What are you looking for?" : "Search"}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      {isFocused && (
        <CircleX className="absolute right-[12px] top-1/2 transform -translate-y-1/2 text-gray-2 w-[24px] h-[24px] " />
      )}
    </div>
  );
};

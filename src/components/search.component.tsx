import { CircleX, LoaderCircle, Search as SearchIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Tag } from "./tag.component";
import Skeleton from "react-loading-skeleton";

const renderCardElement = () => (
  <div className="flex gap-[10px] ">
    <Skeleton width={60} height={60} borderRadius={6} />
    <div className="flex gap-5">
      <div className="flex flex-col gap-1">
        <div className="w-[70px] h-[15px]">
          <Skeleton borderRadius={10} />
        </div>
        <div className="w-[110px] h-[15px]">
          <Skeleton borderRadius={10} />
        </div>
        <div className="w-[90px] h-[15px]">
          <Skeleton borderRadius={10} />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <div className="w-[100px] h-[15px]">
          <Skeleton borderRadius={10} />
        </div>
        <div className="w-[100px] h-[15px]">
          <Skeleton borderRadius={10} />
        </div>
        <div className="w-[100px] h-[15px]">
          <Skeleton borderRadius={10} />
        </div>
      </div>
    </div>
  </div>
);

const renderLoadingSkeletons = () => (
  <>
    <Skeleton width={120} height={15} borderRadius={12} />

    <div className="flex gap-5 mt-5">
      {renderCardElement()}
      {renderCardElement()}
    </div>

    <div className="flex gap-5 mt-5 mb-5">
      {renderCardElement()}
      {renderCardElement()}
    </div>

    <Skeleton width={120} height={15} borderRadius={12} />
  </>
);

interface Props {
  isFocusedCallback: (value: boolean) => void;
}

export const Search: React.FC<Props> = ({ isFocusedCallback }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isSearchingResults, setIsSearchingResults] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const searchResults = (searchParam: string) => {
    setIsSearchingResults(searchParam.length !== 0);
  };

  useEffect(() => {
    isFocusedCallback(isFocused);
  }, [isFocused, isFocusedCallback]);

  const isFocusedOrIsSearchingResult = isFocused || isSearchingResults;

  return (
    <div className="">
      <div
        className={`fixed inset-0 z-0 transition-all duration-300 select-none pointer-events-none bg-[#5C6670] ${
          isSearchingResults ? "opacity-30" : "opacity-0"
        }`}
      />

      <div
        className={`relative transition-all duration-300 ${
          isFocusedOrIsSearchingResult ? "w-[640px]" : "w-[130px]"
        } h-[44px]`}
      >
        <div className="absolute z-10 w-full">
          {isSearchingResults ? (
            <LoaderCircle className="absolute left-[12px] top-1/2 transform -translate-y-1/2 text-gray-2 w-[24px] h-[24px] animate-spin" />
          ) : (
            <SearchIcon className="absolute left-[12px] top-1/2 transform -translate-y-1/2 text-gray-2 w-[24px] h-[24px]" />
          )}
          <input
            className={`w-full font-semibold placeholder-gray-2 pt-[1px] rounded-[30px] border-2 cursor-pointer pl-[52px] h-[44px] bg-white outline-none`}
            placeholder={isFocused ? "What are you looking for?" : "Search"}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={(e) => searchResults(e.target.value)}
          />
          {isFocused && (
            <CircleX className="absolute right-[12px] top-1/2 transform -translate-y-1/2 text-gray-2 w-[24px] h-[24px] " />
          )}
        </div>

        <div
          className={`absolute bg-white z-9 absolute top-[-12px] w-[680px] h-[386px] left-1/2 transform -translate-x-1/2 ${
            isSearchingResults ? "opacity-100" : "opacity-0"
          } shadow-[0px_4px_10px_0px_rgba(0,0,0,0.25)] rounded-[30px]`}
          style={{
            padding: "77px 20px 40px 20px",
          }}
        >
          <div className="flex gap-1 items-center">
            <span className="font-semibold text-[10px]">Displaying:</span>
            <Tag text="Upcoming" />
            <Tag text="Bidding" />
            <a className="font-semibold text-primary text-[10px] cursor-pointer">
              Add
            </a>
          </div>

          <div className="w-full bg-[#E3E5E8] h-[1px] my-5" />

          {renderLoadingSkeletons()}
        </div>
      </div>
    </div>
  );
};

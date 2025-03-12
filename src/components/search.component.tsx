import { CircleX, LoaderCircle, Search as SearchIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Tag } from "./tag.component";
import Skeleton from "react-loading-skeleton";
import { mockAuction, mockItem } from "@/mockdata";
import { format } from "date-fns";

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
  // const [auctions, setAuctions] = useState([]);
  const [lots, setLots] = useState({});
  const [auctions, setAuction] = useState({});

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => {
    setIsFocused(false);
    setIsSearchingResults(false);
    setLots({} as any);
    setAuction({} as any);
  };

  const searchResults = (searchParam: string) => {
    setIsSearchingResults(searchParam.length !== 0);

    setTimeout(() => {
      setLots(mockItem);
      setAuction(mockAuction);
      setIsSearchingResults(false);
    }, 1000);
  };

  useEffect(() => {
    isFocusedCallback(isFocused);
  }, [isFocused, isFocusedCallback]);

  const isSearchingOrHasResult = lots?.items?.length || isSearchingResults;

  return (
    <div className="">
      <div
        className={`fixed inset-0 z-0 transition-all duration-300 select-none pointer-events-none bg-[#5C6670] ${
          isSearchingOrHasResult ? "opacity-30" : "opacity-0"
        }`}
      />

      <div
        className={`relative transition-all duration-300 ${
          isSearchingOrHasResult || isFocused ? "w-[640px]" : "w-[130px]"
        } h-[44px]`}
      >
        <div className="absolute z-10 w-full">
          {isSearchingResults ? (
            <LoaderCircle className="absolute left-[12px] top-1/2 transform -translate-y-1/2 text-gray-2 w-[24px] h-[24px] animate-spin" />
          ) : (
            <SearchIcon className="absolute left-[12px] top-1/2 transform -translate-y-1/2 text-gray-2 w-[24px] h-[24px]" />
          )}
          <input
            className={`w-full placeholder-gray-2 pt-[1px] rounded-[30px] border-2 cursor-pointer pl-[52px] h-[44px] bg-white outline-none`}
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
          className={`absolute bg-white z-9 absolute top-[-12px] w-[680px] min-h-[386px] left-1/2 transform -translate-x-1/2 ${
            isSearchingOrHasResult ? "opacity-100" : "opacity-0"
          } shadow-[0px_4px_10px_0px_rgba(0,0,0,0.25)] rounded-[30px]`}
          style={{
            padding: "77px 30px 40px 30px",
          }}
        >
          <div className="flex gap-1 items-center">
            <span className="text-[10px]">Displaying:</span>
            <Tag text="Upcoming" />
            <Tag text="Bidding" />
            <a className="text-primary text-[10px] cursor-pointer">Add</a>
          </div>

          <div className="w-full bg-[#E3E5E8] h-[1px] my-5" />

          {isSearchingResults && renderLoadingSkeletons()}
          {!isSearchingResults && (
            <>
              <span className="font-bold text-gray-2 text-sm">
                Matching Lots
              </span>

              <div className="flex flex-wrap gap-[20px] mt-[20px] ">
                {lots.items?.map((item) => {
                  const offer = lots.items_offers.find(
                    (offer) => offer.name === item.title
                  )!;

                  return (
                    <div key={item.id} className="flex h-[60px]">
                      <img
                        className="w-[60px]  rounded-[6px] mr-[10px]"
                        src={item.thumb_url}
                      />
                      <div className="w-[99px] overflow-hidden line-clamp-3 text-sm h-full">
                        {item.title}
                      </div>

                      <div className="ml-[20px] text-xs text-[#394046] font-normal w-[111px]">
                        <div className="flex flex-col items-end">
                          <div className="bg-primary-1 font-bold text-center uppercase text-white py-[2px] px-[5px] text-[10px] w-[95px] mb-1">
                            {format(offer?.availabilityStarts, "M/d/yy")} -{" "}
                            {format(offer?.availabilityEnds, "M/d/yy")}
                          </div>
                          <div>
                            <span>Current: </span>
                            <span className="text-primary font-bold">
                              $ {item.current_bid}
                            </span>
                          </div>
                          <div className="mt-[2px]">{item.mapping_city}</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="text-primary text-sm mt-5 cursor-pointer">
                Show all 12 matching lots »
              </div>

              <div className="w-full bg-[#E3E5E8] h-[1px] my-5" />

              <span className="font-bold text-gray-2 text-sm">
                Matching Auctions
              </span>

              <div className="flex flex-wrap gap-[20px] mt-[20px] ">
                {auctions?.data?.map((auction) => {
                  console.log("auction?.starts", auction?.starts);
                  return (
                    <div key={auction.id} className="flex">
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
                          {auction?.starts && format(auction?.starts, "M/d/yy")}{" "}
                          - {auction?.ends && format(auction?.ends, "M/d/yy")}
                        </div>
                        <span className="text-primary bg-gray-3 px-1 py-[2px] text-sm">
                          {auction.item_count} Lots
                        </span>
                      </div>
                    </div>
                  );
                })}
                <div className="text-primary text-sm mt-5 cursor-pointer">
                  Show all 12 matching lots »
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

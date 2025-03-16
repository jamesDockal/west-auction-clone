import { CircleX, LoaderCircle, Search as SearchIcon } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Tag } from "./tag.component";
import Skeleton from "react-loading-skeleton";
import { LotCard } from "./lot-card.component";
import { AuctionCard } from "./auction-card.component";
import { AuctionService } from "@/services/auction.service";
import { IGetAuctionsDTO, IGetLotsDTO } from "@/interfaces/auction.interface";
import { debounce } from "@/utils/debounce.util";
import { NoResultFound } from "./no-result-found.component";

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
  const [lotsData, setLotsData] = useState({} as IGetLotsDTO);
  const [auctionsData, setAuctionsData] = useState({} as IGetAuctionsDTO);
  const [wasNoLotFound, setWasNoLotFound] = useState(false);

  const searchInputRef = useRef<HTMLInputElement>(null);

  const auctionService = new AuctionService();

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => {
    setIsFocused(false);
    setIsSearchingResults(false);
  };

  const debouncedSearch = useRef(
    debounce(async (searchParam: string) => {
      const _lotData = await auctionService.getLots({
        search: searchParam,
        limit: 4,
      });
      setLotsData(_lotData);

      const _auctionsData = await auctionService.getAuctions({
        search: searchParam,
        limit: 4,
      });
      setAuctionsData(_auctionsData);
      setIsSearchingResults(false);
      setWasNoLotFound(_lotData.lots.length === 0);
    }, 500)
  ).current;

  const searchResults = async (searchParam: string) => {
    const newIsSearchingResults = searchParam.length !== 0;
    if (newIsSearchingResults !== isSearchingResults) {
      setIsSearchingResults(newIsSearchingResults);
    }

    if (searchParam) {
      debouncedSearch(searchParam);
    } else {
      setLotsData({} as IGetLotsDTO);
      setAuctionsData({} as IGetAuctionsDTO);
      setWasNoLotFound(false);
    }
  };

  const clearSearchInput = () => {
    searchInputRef.current!.value = "";
  };

  useEffect(() => {
    isFocusedCallback(isFocused);
  }, [isFocused, isFocusedCallback]);

  const isSearchingOrHasLots = lotsData.lots?.length || isSearchingResults;

  return (
    <div className="">
      <div
        className={`fixed inset-0 z-0 transition-all duration-300 select-none pointer-events-none bg-[#5C6670] ${
          isFocused && (isSearchingOrHasLots || wasNoLotFound)
            ? "opacity-30"
            : "opacity-0"
        }`}
      />

      <div
        className={`relative transition-all duration-300 ${
          isFocused || isSearchingOrHasLots || wasNoLotFound
            ? "w-[640px]"
            : "w-[130px]"
        } h-[44px]`}
      >
        <div className="absolute z-10 w-full">
          {isSearchingResults ? (
            <LoaderCircle className="absolute left-[12px] top-1/2 transform -translate-y-1/2 text-gray-2 w-[24px] h-[24px] animate-spin" />
          ) : (
            <SearchIcon className="absolute left-[12px] top-1/2 transform -translate-y-1/2 text-gray-2 w-[24px] h-[24px]" />
          )}
          <input
            ref={searchInputRef}
            className={`w-full placeholder-gray-2 pt-[1px] rounded-[30px] border-2 cursor-pointer pl-[52px] h-[44px] bg-white outline-none`}
            placeholder={isFocused ? "What are you looking for?" : "Search"}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={(e) => searchResults(e.target.value)}
          />
          {isFocused && (
            <CircleX
              onMouseDown={clearSearchInput}
              className="absolute right-[12px] top-1/2 transform -translate-y-1/2 text-gray-2 hover:text-primary w-[24px] h-[24px] cursor-pointer"
            />
          )}
        </div>

        <div
          className={`absolute bg-white z-9 absolute top-[-12px] w-[680px] min-h-[386px] transform pt-[77px] pr-[30px] pb-[40px] pl-[30px] left-[-20px] shadow-[0px_4px_10px_0px_rgba(0,0,0,0.25)] rounded-[30px] flex flex-col ${
            isFocused && (isSearchingOrHasLots || wasNoLotFound)
              ? "opacity-100"
              : "opacity-0"
          }`}
        >
          <div className="flex gap-1 items-center">
            <span className="text-[10px]">Displaying:</span>
            <Tag text="Upcoming" />
            <Tag text="Bidding" />
            <a className="text-primary text-[10px] cursor-pointer">Add</a>
          </div>

          <div className="w-full bg-[#E3E5E8] h-[1px] my-5" />

          {isSearchingResults && renderLoadingSkeletons()}

          {!isSearchingResults &&
            (wasNoLotFound ? (
              <NoResultFound />
            ) : (
              <>
                <span className="font-bold text-gray-2 text-sm">
                  Matching Lots
                </span>

                <div className="flex flex-wrap gap-[20px] mt-[20px] ">
                  {lotsData?.lots?.map((lot) => (
                    <LotCard key={lot.id} lot={lot} />
                  ))}
                </div>
                <div className="text-primary text-sm mt-5 cursor-pointer">
                  Show all {lotsData.total} matching lots »
                </div>

                <div className="w-full bg-[#E3E5E8] h-[1px] my-5" />

                <span className="font-bold text-gray-2 text-sm">
                  Matching Auctions
                </span>

                <div className="flex flex-wrap gap-[20px] mt-[20px] ">
                  {auctionsData?.auctions?.map((auction) => (
                    <AuctionCard key={auction.id} auction={auction} />
                  ))}
                  <div className="text-primary text-sm mt-5 cursor-pointer">
                    Show all {auctionsData?.total} matching lots »
                  </div>
                </div>
              </>
            ))}
        </div>
      </div>
    </div>
  );
};

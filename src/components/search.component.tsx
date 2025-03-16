import { CircleX, LoaderCircle, Search as SearchIcon } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Tag } from "./tag.component";
import { AuctionService } from "@/services/auction.service";
import { IGetAuctionsDTO, IGetLotsDTO } from "@/interfaces/auction.interface";
import { SearchBarOverlay } from "./search-bar-overlay.component";
import { FilterOverlay } from "./filter-overlay.component";
import debounce from "lodash/debounce";
import { DebouncedFunc } from "lodash";

interface Props {
  isFocusedCallback: (value: boolean) => void;
}

export const Search: React.FC<Props> = ({ isFocusedCallback }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isSearchingResults, setIsSearchingResults] = useState(false);
  const [lotsData, setLotsData] = useState({} as IGetLotsDTO);
  const [auctionsData, setAuctionsData] = useState({} as IGetAuctionsDTO);
  const [wasNoDataFound, setWasNoDataFound] = useState(false);
  const [filters, setFilters] = useState({
    Upcoming: true,
    "Bidding Now": true,
    Closed: false,
  });
  const [showFilters, setShowFilters] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const filterOverlayRef = useRef<HTMLDivElement>(null);
  const auctionService = new AuctionService();

  const activeFilters = Object.entries(filters)
    .filter(([, value]) => value === true)
    .map(([key]) => key);

  const focusOnSearch = () => {
    setIsFocused(true);
  };

  const debouncedSearch = useRef<
    DebouncedFunc<(searchParam: string) => Promise<void>>
  >(
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
      setWasNoDataFound(_lotData.lots.length === 0);
    }, 500)
  ).current;

  const searchResults = async (searchParam: string) => {
    const newIsSearchingResults = searchParam.length !== 0;
    if (newIsSearchingResults !== isSearchingResults) {
      setIsSearchingResults(newIsSearchingResults);
    }

    debouncedSearch.cancel();

    if (searchParam) {
      debouncedSearch(searchParam);
    } else {
      setLotsData({} as IGetLotsDTO);
      setAuctionsData({} as IGetAuctionsDTO);
      setWasNoDataFound(false);
    }
  };

  const clearSearchInput = () => {
    if (!searchInputRef.current!.value) {
      return setIsFocused(false);
    }

    searchInputRef.current!.value = "";
  };

  const onFiltersChanged = (key: string, newValue: boolean) => {
    let newFilters;
    if (key === "Closed") {
      newFilters = {
        Upcoming: false,
        "Bidding Now": false,
        Closed: newValue,
      };
    } else {
      newFilters = {
        ...filters,
        Closed: false,
        [key]: newValue,
      };
    }

    setFilters(newFilters);
    setIsSearchingResults(true);

    debouncedSearch(searchInputRef.current!.value);
  };

  useEffect(() => {
    isFocusedCallback(isFocused);
    if (!isFocused && !searchInputRef.current!.value) {
      setLotsData({} as IGetLotsDTO);
      setAuctionsData({} as IGetAuctionsDTO);
      setWasNoDataFound(false);
    }
  }, [isFocused, isFocusedCallback]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterOverlayRef.current &&
        !filterOverlayRef.current.contains(event.target as Node)
      ) {
        setShowFilters(false);
      }

      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsFocused(false);
        setIsSearchingResults(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const isSearchingOrHasLots = lotsData.lots?.length || isSearchingResults;
  const shouldRenderOverlay =
    isFocused && (isSearchingOrHasLots || wasNoDataFound);

  return (
    <>
      <div ref={containerRef} className="w-full sm:w-auto">
        <div
          className={`transition-all duration-300  relative flex items-center w-full 
            ${isFocused ? "sm:w-[640px]" : "sm:w-[130px]"}
          `}
        >
          <div className="absolute z-10 w-full">
            <div
              className={`
              absolute  top-1/2 transform -translate-y-1/2 text-gray-2 w-[24px] h-[24px]
              ${isFocused ? "left-[12px]" : "left-[-24px] sm:left-[12px]"}
              `}
            >
              {isSearchingResults ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                <SearchIcon
                  className="cursor-pointer"
                  onClick={focusOnSearch}
                />
              )}
            </div>
            <input
              ref={searchInputRef}
              className={`w-full placeholder-gray-2 pt-[1px] rounded-[30px] sm:border-2 cursor-pointer pl-[52px] h-[44px]  outline-none ${
                isFocused && "border-2"
              }`}
              placeholder={isFocused ? "What are you looking for?" : "Search"}
              onKeyDown={focusOnSearch}
              onClick={focusOnSearch}
              onChange={(e) => searchResults(e.target.value)}
            />
            {isFocused && (
              <CircleX
                onMouseDown={(e) => {
                  e.stopPropagation();
                  clearSearchInput();
                }}
                className="absolute right-[12px] top-1/2 transform -translate-y-1/2 text-gray-2 hover:text-primary w-[24px] h-[24px] cursor-pointer"
              />
            )}
          </div>

          {shouldRenderOverlay && (
            <div
              className={`absolute bg-white z-9 top-[-38px] min-h-[386px] transform pt-[77px] pr-[30px] pb-[40px] pl-[30px] left-[-34px] shadow-[0px_4px_10px_0px_rgba(0,0,0,0.25)] flex flex-col w-[100vw] rounded-none md:max-w-[680px] md:rounded-[30px]`}
            >
              <div className="flex gap-1 items-center">
                <span className="text-[10px]">Displaying:</span>
                {activeFilters.map((key) => (
                  <Tag key={key} text={key} />
                ))}

                <div className="relative">
                  <span
                    className="text-primary text-[10px] cursor-pointer"
                    onClick={() => setShowFilters(true)}
                  >
                    Add
                  </span>
                  {showFilters && (
                    <div ref={filterOverlayRef}>
                      <FilterOverlay
                        filters={filters}
                        setFilters={onFiltersChanged}
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="w-full bg-[#E3E5E8] h-[1px] my-5" />

              <SearchBarOverlay
                isSearchingResults={isSearchingResults}
                wasNoLotFound={wasNoDataFound}
                lotsData={lotsData}
                auctionsData={auctionsData}
              />
            </div>
          )}
        </div>
      </div>

      <div
        className={`fixed inset-0 z-0 transition-all duration-300 select-none pointer-events-none bg-[#5C6670] ${
          shouldRenderOverlay ? "opacity-30" : "opacity-0"
        }`}
      />
    </>
  );
};

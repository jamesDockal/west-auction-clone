import { CircleX, LoaderCircle, Search as SearchIcon } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Tag } from "./tag.component";
import { AuctionService } from "@/services/auction.service";
import { IGetAuctionsDTO, IGetLotsDTO } from "@/interfaces/auction.interface";
import { debounce } from "@/utils/debounce.util";
import { SearchBarOverlay } from "./search-bar-overlay.component";
import { FilterOverlay } from "./filter-overlay.component";

interface Props {
  isFocusedCallback: (value: boolean) => void;
}

export const Search: React.FC<Props> = ({ isFocusedCallback }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isSearchingResults, setIsSearchingResults] = useState(false);
  const [lotsData, setLotsData] = useState({} as IGetLotsDTO);
  const [auctionsData, setAuctionsData] = useState({} as IGetAuctionsDTO);
  const [wasNoLotFound, setWasNoLotFound] = useState(false);
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

  const handleFocus = () => setIsFocused(true);

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

  useEffect(() => {
    setIsSearchingResults(true);
    debouncedSearch(searchInputRef.current!.value!);
  }, [filters]);

  const isSearchingOrHasLots = lotsData.lots?.length || isSearchingResults;
  const shouldRenderOverlay =
    isFocused && (isSearchingOrHasLots || wasNoLotFound);
  const shouldIncreaseSearchBar =
    isFocused || isSearchingOrHasLots || wasNoLotFound;

  return (
    <>
      <div ref={containerRef}>
        <div
          className={`relative transition-all duration-300 h-[44px] ${
            shouldIncreaseSearchBar ? "w-[640px]" : "w-[130px]"
          } `}
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
              // onBlur={handleBlur}
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
              shouldRenderOverlay ? "opacity-100" : "opacity-0"
            }`}
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
                    <FilterOverlay filters={filters} setFilters={setFilters} />
                  </div>
                )}
              </div>
            </div>

            <div className="w-full bg-[#E3E5E8] h-[1px] my-5" />

            <SearchBarOverlay
              isSearchingResults={isSearchingResults}
              wasNoLotFound={wasNoLotFound}
              lotsData={lotsData}
              auctionsData={auctionsData}
            />
          </div>
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

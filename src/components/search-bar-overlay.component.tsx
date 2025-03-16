import React from "react";
import { NoResultFound } from "./no-result-found.component";
import Skeleton from "react-loading-skeleton";
import { LotCard } from "./lot-card.component";
import { AuctionCard } from "./auction-card.component";
import { IGetAuctionsDTO, IGetLotsDTO } from "@/interfaces/auction.interface";

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

    <div className="flex flex-col sm:flex-row gap-5 mt-5">
      {renderCardElement()}
      {renderCardElement()}
    </div>

    <div className="flex flex-col sm:flex-row gap-5 mt-5 mb-5">
      {renderCardElement()}
      {renderCardElement()}
    </div>

    <Skeleton width={120} height={15} borderRadius={12} />
  </>
);

type Props = {
  isSearchingResults: boolean;
  wasNoLotFound: boolean;
  lotsData: IGetLotsDTO;
  auctionsData: IGetAuctionsDTO;
};

export const SearchBarOverlay: React.FC<Props> = ({
  isSearchingResults,
  wasNoLotFound,
  auctionsData,
  lotsData,
}) => {
  if (isSearchingResults) {
    return renderLoadingSkeletons();
  }

  if (wasNoLotFound) {
    return <NoResultFound />;
  }

  return (
    <>
      <span className="font-bold text-gray-2 text-sm">Matching Lots</span>

      <div className="flex flex-wrap gap-[20px] mt-[20px] ">
        {lotsData?.lots?.map((lot) => (
          <LotCard key={lot.id} lot={lot} />
        ))}
      </div>
      <div className="text-primary text-sm mt-5 cursor-pointer">
        Show all {lotsData.total} matching lots »
      </div>

      <div className="w-full bg-[#E3E5E8] h-[1px] my-5" />

      <span className="font-bold text-gray-2 text-sm">Matching Auctions</span>

      <div className="flex flex-wrap gap-[20px] mt-[20px] ">
        {auctionsData?.auctions?.map((auction) => (
          <AuctionCard key={auction.id} auction={auction} />
        ))}
        <div className="text-primary text-sm mt-5 cursor-pointer">
          Show all {auctionsData?.total} matching lots »
        </div>
      </div>
    </>
  );
};

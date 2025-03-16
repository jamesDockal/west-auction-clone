export interface IQueryDTO {
  search: string;
  limit: number;
}

export interface IGetLotsDTO {
  lots: ILot[];
  total: number;
}

export interface ILot {
  id: string | number;
  thumb_url: string;
  title: string;
  availabilityStarts: Date;
  availabilityEnds: Date;
  current_bid: number;
  mapping_city: string;
}

export interface IGetAuctionsDTO {
  auctions: IAuction[];
  total: number;
}

export type IAuction = {
  id: string | number;
  city: string;
  title: string;
  startDate: Date;
  endDate: Date;
  quantity: number;
};

import { mockAuction, mockItem } from "@/mockdata";

export type ILotDTO = typeof mockItem;

export type ILot = (typeof mockItem.items)[0];

export type IAuctionDTO = typeof mockAuction;

export type IOffer = (typeof mockItem.items_offers)[0];

export type IAuction = (typeof mockAuction.data)[0];

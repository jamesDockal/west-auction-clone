import {
  IGetAuctionsDTO,
  IGetLotsDTO,
  IQueryDTO,
} from "@/interfaces/auction.interface";
import { DummyJsonService } from "./dummyjson.service";
import { generateDummyAuctions } from "@/utils/generate-dummy-data.util";

export class AuctionService {
  constructor(private readonly dummyJsonService = new DummyJsonService()) {}

  async getLots(query: IQueryDTO): Promise<IGetLotsDTO> {
    const lots = await this.dummyJsonService.getItems(query);

    return lots;
  }

  async getAuctions(query: IQueryDTO): Promise<IGetAuctionsDTO> {
    const auctions = generateDummyAuctions(query);

    return auctions;
  }
}

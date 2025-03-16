import { IGetLotsDTO, ILot, IQueryDTO } from "@/interfaces/auction.interface";
import { IDummyJsonItem } from "@/interfaces/dummyJson.interface";
import axios, { AxiosInstance } from "axios";
import { faker } from "@faker-js/faker";

export class DummyJsonService {
  private readonly dummyjsonAPI: AxiosInstance;
  constructor() {
    this.dummyjsonAPI = axios.create({
      baseURL: "https://dummyjson.com/products",
    });
  }

  async getItems(query: IQueryDTO): Promise<IGetLotsDTO> {
    const { data } = await this.dummyjsonAPI.get("/search", {
      params: {
        q: query.search,
        limit: query.limit,
      },
    });
    const formattedItems = this.formatItems(data.products);

    return {
      lots: formattedItems,
      total: data.total,
    };
  }

  private formatItems(items: IDummyJsonItem[]): ILot[] {
    const result: ILot[] = items.map((item) => ({
      id: item.id,
      thumb_url: item.images[0],
      title: item.title,
      availabilityStarts: new Date(),
      availabilityEnds: new Date(),
      current_bid: faker.number.int({ max: 10000 }),
      mapping_city: faker.location.city(),
    }));

    return result;
  }
}

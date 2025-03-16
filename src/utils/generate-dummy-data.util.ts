import {
  IAuction,
  IGetAuctionsDTO,
  IQueryDTO,
} from "@/interfaces/auction.interface";
import { faker } from "@faker-js/faker";

export const generateDummyAuctions = (query: IQueryDTO): IGetAuctionsDTO => {
  const dummyAuctions: IAuction[] = new Array(query.limit)
    .fill(null)
    .map((_, index) => ({
      id: index,
      city: faker.location.city(),
      title: faker.lorem.paragraph(),
      startDate: faker.date.future({ years: 1 }),
      endDate: faker.date.future({ years: 1 }),
      quantity: faker.number.int({ max: 300 }),
    }));

  const total = faker.number.int({ max: 20 });

  return {
    auctions: dummyAuctions,
    total,
  };
};

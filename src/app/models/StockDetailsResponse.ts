import { StockPriceDetails } from './stockPriceDetails';

export class StockDetailsResponse{
    stockPrices: StockPriceDetails[] = [];
    minPrice: number = 0;
    maxPrice: number = 0;
    averagePrice: number = 0;
}
export type InvestmentType = "Crypto" | "Stocks";

export type InvestmentCollection = {
  type: InvestmentType;
  name: string;
};

export type StockRow = {
  id: number;
  name: string;
  amount: number;
  total: number;
};
export type StockApiResponse = {
  results: Array<{
    c: number; // c represents the closing price of the previous day
  }>;
};

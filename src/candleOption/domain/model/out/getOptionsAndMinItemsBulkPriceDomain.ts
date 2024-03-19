interface IItemOption {
  id: number;
  name: string;
  urlImage: string;
  isPack: boolean;
  isVipPack: boolean;
  packNames: Array<string>;
  bulkPrice: number;
  retailPrice: number;
}

export interface ICandleListOptions {
  label: string;
  items: IItemOption[];
}

export interface CandleOptionAndMinBulkPrice {
  minimumSizeBulkPrice: number;
  candleListOptions: ICandleListOptions[];
}

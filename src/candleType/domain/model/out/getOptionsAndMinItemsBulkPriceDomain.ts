interface IItemOption {
  id: number;
  candleTypeId: number;
  name: string;
  urlImage: string;
  isPack: boolean;
  isVipPack: boolean;
  packNames: Array<string>;
  bulkPrice: number;
  retailPrice: number;
  visible: boolean;
}

export interface ICandleListOptions {
  label: string;
  items: IItemOption[];
}

export interface CandleOptionAndMinBulkPrice {
  minimumSizeBulkPrice: number;
  candleListOptions: ICandleListOptions[];
}

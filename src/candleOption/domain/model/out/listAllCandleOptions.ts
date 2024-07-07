interface CandleOptionItem {
  id: number;
  name: string;
  urlImage: string;
  bulkPrice: number;
  retailPrice: number;
  isPack: boolean;
  candleTypeName: string;
  visible: boolean;
  isVipPack: boolean;
  packNames: Array<string>;
}

export interface ListAllCandleOptions {
  total: number;
  options: CandleOptionItem[];
}

interface PackNameItem {
  name: string;
}

export interface FindCandleOptionDomain {
  id: number;
  name: string;
  url_image: string;
  bulk_price: number;
  retail_price: number;
  is_pack: boolean;
  candleTypeName: string;
  visible: boolean;
  is_vip_pack: boolean;
  pack_names: PackNameItem[];
}

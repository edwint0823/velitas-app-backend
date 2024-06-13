interface PackName {
  name: string;
}

export interface CreateOptionDomain {
  name: string;
  url_image: string;
  bulk_price: number;
  retail_price: number;
  is_pack: boolean;
  candle_type_id: number;
  visible: boolean;
  is_vip_pack: boolean;
  pack_names: PackName[];
}

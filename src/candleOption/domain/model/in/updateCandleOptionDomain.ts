interface PackName {
  name: string;
}

export interface UpdateCandleOptionDomain {
  name: string | null;
  url_image: string | null;
  bulk_price: number | null;
  retail_price: number | null;
  is_pack: boolean | null;
  visible: boolean | null;
  is_vip_pack: boolean | null;
  pack_names: PackName[] | null;
}

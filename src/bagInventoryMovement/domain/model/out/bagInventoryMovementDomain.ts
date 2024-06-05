interface BagInventoryMovementDomain {
  id: number;
  bagName: string;
  quantity: number;
  isEntry: boolean;
  isOut: boolean;
  observation: string;
  createdAt: string;
  createdByName: string;
}

export interface ListBagInventoryMovementDomain {
  movements: BagInventoryMovementDomain[];
  total: number;
}

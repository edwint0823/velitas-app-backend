interface movementsObj {
  concept: string;
  amount: number;
  entryMovement: boolean;
  outMovement: boolean;
  createdAt: string;
  createdById: number;
  createdByName: string;
  bankEntityName: string;
  isPaymentPartial: null | boolean;
  orderCode: null | string;
}

export interface ListCashMovementsDomain {
  total: number;
  movements: movementsObj[];
}

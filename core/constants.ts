export const priceTypeOptions: Array<string> = ['detal', 'mayorista'];
export const minimumSizeBulkPriceNameParam: string = 'minimum_size_bulk_price';
export const defaultMinimumSizeBulkPrice: number = 10;
export const timeZoneDayjs: string = 'es-mx';
export const timeToDoOneCandleNameParam: string = 'time_to_do_one_candle';
export const minimumDaysToDoOrder: number = 2;
export const orderCreateNameStatus: string = 'Creado';
export const monthMaxDelivery: number = 11;
export const dayMaxDelivery: number = 7;
export const minutesOfHour: number = 60;
export const workingHours: number = 8;

export const QUERYS = {
  callGetCodeOrderFunction: 'SELECT generate_order_code() as new_code',
};

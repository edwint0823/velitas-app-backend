export class FunctionsHelper {
  public static isBoolean(valor: string): boolean {
    return valor.toLowerCase() === 'true' || valor.toLowerCase() === 'false';
  }

  public static convertToBoolean(valor: string): boolean {
    return valor.toLowerCase() === 'true';
  }

  public static isNumber(valor: string): boolean {
    return !isNaN(Number(valor));
  }

  public static convertToNumber(valor: string): number {
    return Number(valor);
  }
}

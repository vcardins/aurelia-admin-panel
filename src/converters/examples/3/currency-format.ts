import * as numeral from 'numeral';

export class CurrencyFormatValueConverter {
  toView(value:string) {
    return numeral(value).format('($0,0.00)');
  }
}

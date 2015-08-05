import * as moment from 'moment';

export class DateFormatValueConverter {
  toView(value:string) {
    return moment(value).format('M/D/YYYY h:mm:ss a');
  }
}

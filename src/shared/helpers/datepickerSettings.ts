import {NativeDateAdapter} from '@angular/material';

export class DatepickerSettings extends NativeDateAdapter {

  format(date: Date, displayFormat: Object): string {
    if (displayFormat === 'input') {
      let day = (date.getUTCDate() + 1).toString();
      let month = (date.getUTCMonth() + 1).toString();
      const year = date.getUTCFullYear();

      day = day.length === 1 ? '0' + day : day;
      month = month.length === 1 ? '0' + month : month;

      return `${day}.${month}.${year}`;
    } else {
      return date.toDateString();
    }
  }
  getDayOfWeekNames(style): string[] {

    return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  }
  getFirstDayOfWeek(): number {
    return 1;
  }
}

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: {day: 'numeric', month: 'short', year: 'numeric'},
  },
  display: {
    dateInput: 'input',
    monthYearLabel: {year: 'numeric', month: 'numeric'},
    dateA11yLabel: {year: 'numeric', month: 'long', day: 'numeric'},
    monthYearA11yLabel: {year: 'numeric', month: 'long'},
  },
};

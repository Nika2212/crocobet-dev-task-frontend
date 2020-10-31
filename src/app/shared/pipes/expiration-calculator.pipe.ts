import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'expirationCalculator'
})
export class ExpirationCalculatorPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): string {
    const dt1 = new Date(value);
    const dt2 = new Date();
    const d3 = Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate()) ) /(1000 * 60 * 60 * 24));
    let message = '';

    if (d3 < 0) {
      message = Math.abs(d3) + ' days remaining.';
    } else if (d3 > 0) {
      message = d3 + ' days ago.';
    } else {
      message = 'Today';
    }

    return message;
  }

}

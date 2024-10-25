import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
  standalone: true
})
export class TruncatePipe implements PipeTransform {

  transform(value: string, count: number): any {
      try {
        if(value.length > count) {
          return value.substring(0, count) + '...';
        } else {
          return value;
        }
      } catch (error) {
        console.error('Error in TruncatePipe', error);
        return value;
      }
  }

}

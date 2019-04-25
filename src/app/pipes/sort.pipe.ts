import { Pipe, PipeTransform } from '@angular/core';

import { Product } from '../model/product';

@Pipe({
  name: 'sort',
})
export class SortPipe implements PipeTransform {
  transform(value: Product[]): Product[] {
    return [...value].sort((p1, p2) => {
      if (p1.title > p2.title) {
        return 1;
      }
      if (p1.title < p2.title) {
        return -1;
      }
      return 0;
    });
  }
}

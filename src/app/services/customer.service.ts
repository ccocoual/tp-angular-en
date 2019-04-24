import { Injectable } from '@angular/core';

import { Product } from '../model/product';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  products: Product[] = new Array<Product>();

  addProduct(product: Product): void {
    this.products.push(product);
  }

  getTotal(): number {
    return this.products.reduce((previous, next) => previous + next.price, 0);
  }
}

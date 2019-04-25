import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { Product } from '../model/product';
import { Customer } from '../model/customer';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private readonly API_URL = this.API_BASE_URL + '/basket';
  basket: Product[] = [];

  constructor(@Inject('API_BASE_URL') private API_BASE_URL: string, private http: HttpClient) {}

  getBasket(): Observable<Product[]> {
    return this.http.get(this.API_URL).pipe(
      map((products: any[]) =>
        products.map(
          product =>
            new Product(product.id, product.title, product.description, product.photo, product.price, product.stock)
        )
      ),
      tap(products => (this.basket = products))
    );
  }

  checkout(customer: Customer) {
    return this.http.post(`${this.API_URL}/confirm`, customer);
  }

  isBasketFilled(): Observable<boolean> {
    return this.getBasket().pipe(map(products => products.length > 0));
  }

  addProduct(product: Product): Observable<any> {
    return this.http.post(this.API_URL, product).pipe(tap(() => this.basket.push(product)));
  }

  getTotal(): number {
    return this.basket.reduce((total, product) => total + product.price, 0);
  }
}

import { TestBed } from '@angular/core/testing';

import { CustomerService } from './customer.service';
import { Product } from '../model/product';

const product1 = new Product('', '', '', 42, 0);
const product2 = new Product('', '', '', 666, 0);

describe('CustomerService', () => {
  let service: CustomerService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomerService],
    });
    service = TestBed.get(CustomerService);
  });

  it('should be created with no product', () => {
    expect(service).toBeTruthy();
    expect(service.products.length).toBe(0);
  });

  it('should add products to the list when using addProduct', () => {
    service.addProduct(product1);
    expect(service.products).toEqual([product1]);
  });

  it('should calculate the total price when using getTotal', () => {
    service.products = [product1, product2];
    expect(service.getTotal()).toBe(product1.price + product2.price);
  });
});

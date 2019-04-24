import { TestBed } from '@angular/core/testing';

import { ProductService } from './product.service';
import { Product } from '../model/product';

describe('ProductService', () => {
  let service: ProductService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductService],
    });
    service = TestBed.get(ProductService);
  });

  it('should be created with 4 products', () => {
    expect(service).toBeTruthy();
    expect(service.getProducts().length).toBe(4);
  });

  it('should isTheLast return true only if stock is 1', () => {
    const product = new Product('', '', '', 0, 0);
    expect(service.isTheLast(product)).toBe(false);
    product.stock = 1;
    expect(service.isTheLast(product)).toBe(true);
    product.stock = 2;
    expect(service.isTheLast(product)).toBe(false);
    product.stock = 100;
    expect(service.isTheLast(product)).toBe(false);
  });

  it('should isAvailable return false only if stock is 0', () => {
    const product = new Product('', '', '', 0, 0);
    expect(service.isAvailable(product)).toBe(false);
    product.stock = 1;
    expect(service.isAvailable(product)).toBe(true);
    product.stock = 2;
    expect(service.isAvailable(product)).toBe(true);
    product.stock = 100;
    expect(service.isAvailable(product)).toBe(true);
  });

  it('should decreaseStock decrease product stock of 1', () => {
    const product = new Product('', '', '', 0, 42);
    service.decreaseStock(product);
    expect(product.stock).toBe(42 - 1);
  });
});

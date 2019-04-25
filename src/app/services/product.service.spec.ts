import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ProductService } from './product.service';
import { Product } from '../model/product';

describe('ProductService', () => {
  let service: ProductService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService, { provide: 'API_BASE_URL', useValue: 'FAKE_URL' }],
    });
    service = TestBed.get(ProductService);
    http = TestBed.get(HttpTestingController);
  });

  it('should be created with 4 products', () => {
    const mockedResponse = [
      new Product('abcID', 'abc', '', '', 0, 0),
      new Product('defID', 'def', '', '', 0, 0),
      new Product('ghiID', 'ghi', '', '', 0, 0),
      new Product('jklID', 'jkl', '', '', 0, 0),
    ];
    expect(service).toBeTruthy();
    service.getProducts().subscribe(products => {
      expect(products.length).toBe(4);
    });
    http.expectOne('FAKE_URL/products').flush(mockedResponse);
  });

  it('should isTheLast return true only if stock is 1', () => {
    const product = new Product('id', '', '', '', 0, 0);
    expect(service.isTheLast(product)).toBe(false);
    product.stock = 1;
    expect(service.isTheLast(product)).toBe(true);
    product.stock = 2;
    expect(service.isTheLast(product)).toBe(false);
    product.stock = 100;
    expect(service.isTheLast(product)).toBe(false);
  });

  it('should isAvailable return false only if stock is 0', () => {
    const product = new Product('id', '', '', '', 0, 0);
    expect(service.isAvailable(product)).toBe(false);
    product.stock = 1;
    expect(service.isAvailable(product)).toBe(true);
    product.stock = 2;
    expect(service.isAvailable(product)).toBe(true);
    product.stock = 100;
    expect(service.isAvailable(product)).toBe(true);
  });

  it('should decreaseStock decrease product stock of 1', () => {
    const product = new Product('id', '', '', '', 0, 42);
    service.decreaseStock(product);
    expect(product.stock).toBe(42 - 1);
  });
});

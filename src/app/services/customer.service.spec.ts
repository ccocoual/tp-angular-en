import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { CustomerService } from './customer.service';
import { Product } from '../model/product';

const product1 = new Product('', '', '', 42, 0);
const product2 = new Product('', '', '', 666, 0);

describe('CustomerService', () => {
  let service: CustomerService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CustomerService, { provide: 'API_BASE_URL', useValue: 'FAKE_URL' }],
    });
    service = TestBed.get(CustomerService);
    http = TestBed.get(HttpTestingController);
  });

  it('should be created with no product', () => {
    expect(service).toBeTruthy();
    expect(service.basket.length).toBe(0);
  });

  it('should load the basket from the server on getBasket', () => {
    const mockedResponse = [new Product('abc', '', '', 0, 0), new Product('def', '', '', 0, 0)];
    service.getBasket().subscribe(() => {
      expect(service.basket.length).toBe(2);
    });
    http.expectOne('FAKE_URL/basket').flush(mockedResponse);
  });

  it('should add products to the list when using addProduct', () => {
    service.addProduct(product1).subscribe(() => {
      expect(service.basket).toEqual([product1]);
    });
    http.expectOne('FAKE_URL/basket').flush({});
  });

  it('should calculate the total price when using getTotal', () => {
    service.basket = [product1, product2];
    expect(service.getTotal()).toBe(product1.price + product2.price);
  });
});

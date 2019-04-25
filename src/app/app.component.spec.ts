import { CUSTOM_ELEMENTS_SCHEMA, Pipe, PipeTransform } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { Product } from './model/product';
import { CustomerService } from './services/customer.service';
import { ProductService } from './services/product.service';

const testProducts = [new Product('', '', '', 0, 0), new Product('', '', '', 0, 0)];
const fakeAppTitle = 'FAKE APP TITLE';

class ProductServiceMock {
  getProducts() {
    return testProducts;
  }
  isAvailable() {
    return true;
  }
  decreaseStock() {}
}

class CustomerServiceMock {
  getTotal() {
    return 42;
  }
  addProduct() {}
}

@Pipe({ name: 'sort' })
class SortPipe implements PipeTransform {
  transform(value) {
    return value;
  }
}

describe('AppComponent', () => {
  let customerService: CustomerService;
  let productService: ProductService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent, SortPipe],
      providers: [
        { provide: ProductService, useClass: ProductServiceMock },
        { provide: CustomerService, useClass: CustomerServiceMock },
        { provide: 'appTitle', useValue: fakeAppTitle },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
    customerService = TestBed.get(CustomerService);
    productService = TestBed.get(ProductService);
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should have the title bound in the header', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    const compiled = fixture.debugElement.nativeElement;

    fixture.detectChanges();
    expect(compiled.querySelector('header').textContent).toContain(fakeAppTitle);
  });

  it('should have the total bound in the header', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    const compiled = fixture.debugElement.nativeElement;

    fixture.detectChanges();
    expect(compiled.querySelector('header').textContent).toContain(customerService.getTotal());
  });

  it('should bind each product component with its product', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    const compiled = fixture.debugElement.nativeElement;

    fixture.detectChanges();
    const products = compiled.querySelectorAll('app-product');
    products.forEach((product, i) => {
      expect(product.data).toBe(app.products[i]);
    });
  });

  it('should call addProduct and decreaseStock when updatePrice', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    const product = testProducts[0];

    spyOn(customerService, 'addProduct');
    spyOn(productService, 'decreaseStock');

    app.updatePrice(product);
    expect(customerService.addProduct).toHaveBeenCalledWith(product);
    expect(productService.decreaseStock).toHaveBeenCalledWith(product);
  });

  it('should not display product which is not available', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    const compiled = fixture.debugElement.nativeElement;

    spyOn(productService, 'isAvailable').and.callFake(product => {
      if (product === testProducts[0]) {
        return false;
      }
      return true;
    });

    fixture.detectChanges();
    const products = compiled.querySelectorAll('app-product');
    expect(products.length).toBe(1);
    expect(products[0].data).toBe(app.products[1]);
  });
});

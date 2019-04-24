import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { Product } from './model/product';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('should have a total starting at 0', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.total).toEqual(0);
  }));

  it('should have the total bound in the header', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    const compiled = fixture.debugElement.nativeElement;

    app.total = 42;
    fixture.detectChanges();
    expect(compiled.querySelector('header').textContent).toContain(42);
  }));

  it('should update price with the product price', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;

    const product = new Product('', '', '', 666, 2);
    app.total = 42;
    app.updatePrice(product);
    expect(app.total).toBe(42 + 666);
    expect(product.stock).toBe(1);
  }));

  it('should bind each product component with its product', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    const compiled = fixture.debugElement.nativeElement;

    fixture.detectChanges();
    const products = compiled.querySelectorAll('app-product');
    products.forEach((product, i) => {
      expect(product.data).toBe(app.products[i]);
    });
  }));

  it('should not display product with an empty stock', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    const compiled = fixture.debugElement.nativeElement;

    app.products = [new Product('empty', '', '', 42, 0), new Product('available', '', '', 42, 10)];
    fixture.detectChanges();
    const products = compiled.querySelectorAll('app-product');
    expect(products.length).toBe(1);
    expect(products[0].data).toBe(app.products[1]);
  }));
});

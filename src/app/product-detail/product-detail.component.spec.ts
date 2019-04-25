import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { ProductDetailComponent } from './product-detail.component';
import { ProductService } from '../services/product.service';
import { Product } from '../model/product';

describe('ProductDetailComponent', () => {
  let component: ProductDetailComponent;
  let fixture: ComponentFixture<ProductDetailComponent>;
  let productService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProductDetailComponent],
      imports: [RouterTestingModule],
      providers: [
        {
          provide: ProductService,
          useValue: jasmine.createSpyObj('ProductService', { getProduct: of(new Product('', '', '', '', 0, 0)) }),
        },
      ],
    }).compileComponents();
    productService = TestBed.get(ProductService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

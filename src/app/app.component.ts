import { Component, OnInit, Inject } from '@angular/core';
import { Product } from './model/product';

import { ProductService } from './services/product.service';
import { CustomerService } from './services/customer.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  total = 0;
  products: Product[];
  sortKey: keyof Product = 'title';

  constructor(
    private productService: ProductService,
    private customerService: CustomerService,
    @Inject('appTitle') public title: String
  ) {}

  ngOnInit() {
    this.productService.getProducts().subscribe(products => (this.products = products));
    this.customerService.getBasket().subscribe();
  }

  getTotal() {
    return this.customerService.getTotal();
  }

  isAvailable(product) {
    return this.productService.isAvailable(product);
  }

  updatePrice(event) {
    this.customerService.addProduct(event).subscribe(() => this.productService.decreaseStock(event));
  }
}

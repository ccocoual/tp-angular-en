import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../model/product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent {
  @Output()
  addToBasket = new EventEmitter<Product>();

  @Input()
  data: Product;

  constructor(private router: Router, private productService: ProductService) {}

  addToBasketClick() {
    this.addToBasket.emit(this.data);
  }

  goToProductDetail() {
    this.router.navigate(['product', this.data.id]);
  }

  isTheLast(): boolean {
    return this.productService.isTheLast(this.data);
  }
}

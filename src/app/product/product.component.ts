import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Product } from '../model/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  @Output()
  addToBasket = new EventEmitter<Product>();

  @Input()
  data: Product;

  constructor() {}

  ngOnInit() {}

  addToBasketClick() {
    this.addToBasket.emit(this.data);
  }
}

import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../services/customer.service';
import { Product } from '../model/product';
import { Customer } from '../model/customer';
import { Router } from '@angular/router';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss'],
})
export class BasketComponent implements OnInit {
  public basket: Product[];
  public customer: Customer;

  constructor(private router: Router, private customerService: CustomerService) {}

  ngOnInit() {
    this.customerService.getBasket().subscribe(products => (this.basket = products));
    this.customer = new Customer();
  }

  checkout() {
    this.customerService.checkout(this.customer).subscribe(() => this.router.navigate(['/']));
  }
}

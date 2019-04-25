import { TestBed, inject } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { CustomerService } from '../services/customer.service';

import { BasketGuard } from './basket.guard';

describe('BasketGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterModule.forRoot([], { useHash: true })],
      providers: [
        BasketGuard,

        { provide: CustomerService, useValue: jasmine.createSpyObj('CustomerService', ['getBasket']) },
      ],
    });
  });

  it('should ...', inject([BasketGuard], (guard: BasketGuard) => {
    expect(guard).toBeTruthy();
  }));
});

import { TestBed, async, inject } from '@angular/core/testing';

import { BasketGuard } from './basket.guard';

describe('BasketGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BasketGuard],
    });
  });

  it('should ...', inject([BasketGuard], (guard: BasketGuard) => {
    expect(guard).toBeTruthy();
  }));
});

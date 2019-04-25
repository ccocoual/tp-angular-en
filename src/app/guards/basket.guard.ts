import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CustomerService } from '../services/customer.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BasketGuard implements CanActivate {
  constructor(private customerService: CustomerService, private router: Router) {}
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.customerService.isBasketFilled().pipe(
      tap(isFilled => {
        if (!isFilled) this.router.navigate(['/']);
      })
    );
  }
}

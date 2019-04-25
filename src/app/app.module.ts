import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, LOCALE_ID } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { registerLocaleData, APP_BASE_HREF } from '@angular/common';

import localeEnCa from '@angular/common/locales/en-CA';
registerLocaleData(localeEnCa, 'en-CA');

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { ProductComponent } from './product/product.component';
import { SortPipe } from './pipes/sort.pipe';
import { HomeComponent } from './home/home.component';
import { BasketComponent } from './basket/basket.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { BasketGuard } from './guards/basket.guard';

const API_BASE_URL: string = 'http://localhost:8080/rest';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'product/:id', component: ProductDetailComponent },
  { path: 'basket', component: BasketComponent, canActivate: [BasketGuard] },
];

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    ProductComponent,
    SortPipe,
    HomeComponent,
    BasketComponent,
    ProductDetailComponent,
  ],
  imports: [BrowserModule, HttpClientModule, FormsModule, RouterModule.forRoot(routes)],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
    {
      provide: 'appTitle',
      useValue: 'Welcome to Zenika E-Shop',
    },
    {
      provide: LOCALE_ID,
      useValue: 'en-CA',
    },
    {
      provide: 'API_BASE_URL',
      useValue: API_BASE_URL,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

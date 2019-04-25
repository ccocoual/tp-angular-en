import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';

import localeEnCa from '@angular/common/locales/en-CA';
registerLocaleData(localeEnCa, 'en-CA');

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { ProductComponent } from './product/product.component';
import { SortPipe } from './pipes/sort.pipe';

const API_BASE_URL: string = 'http://localhost:8080/rest';

@NgModule({
  declarations: [AppComponent, MenuComponent, ProductComponent, SortPipe],
  imports: [BrowserModule, HttpClientModule],
  providers: [
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

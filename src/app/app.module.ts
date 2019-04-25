import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';

import localeEnCa from '@angular/common/locales/en-CA';
registerLocaleData(localeEnCa, 'en-CA');

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { ProductComponent } from './product/product.component';
import { SortPipe } from './pipes/sort.pipe';

@NgModule({
  declarations: [AppComponent, MenuComponent, ProductComponent, SortPipe],
  imports: [BrowserModule],
  providers: [
    {
      provide: 'appTitle',
      useValue: 'Welcome to Zenika E-Shop',
    },
    {
      provide: LOCALE_ID,
      useValue: 'en-CA',
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

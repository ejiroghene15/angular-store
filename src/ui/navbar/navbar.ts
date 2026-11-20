import {Component, inject} from '@angular/core';
import {NgIcon, provideIcons} from '@ng-icons/core';
import {heroMagnifyingGlass, heroShoppingCart} from '@ng-icons/heroicons/outline';
import {Cart} from '../cart/cart';
import {RouterLink} from '@angular/router';
import {ThemeController} from '../theme-controller/theme-controller';
import {HttpClient} from '@angular/common/http';
import {toSignal} from '@angular/core/rxjs-interop';
import {TitleCasePipe} from '@angular/common';
import {CartStore} from '../../service/cart-store';

@Component({
  imports: [
    NgIcon,
    Cart,
    RouterLink,
    ThemeController,
    TitleCasePipe
  ],
  providers: [provideIcons({heroShoppingCart, heroMagnifyingGlass})],
  selector: 'app-navbar',
  styleUrl: './navbar.css',
  templateUrl: './navbar.html',
})

export class Navbar {
  cartCount = inject(CartStore).cartCount
  http = inject(HttpClient);
  showCart = false;
  categories = toSignal(this.http.get<string[]>('https://dummyjson.com/products/category-list'), {initialValue: []})

  toggleCart(status: boolean) {
    this.showCart = status;
  }

  formatCategory(category: string): string {
    return category
      .split('-')
      .join(' ');
  }
}

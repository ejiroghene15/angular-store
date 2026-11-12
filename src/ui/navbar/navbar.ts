import {Component, inject} from '@angular/core';
import {NgIcon, provideIcons} from '@ng-icons/core';
import {heroShoppingCart} from '@ng-icons/heroicons/outline';
import {ProductStore} from '../../service/product-store';
import {Cart} from '../cart/cart';
import {RouterLink} from '@angular/router';
import {ThemeController} from '../theme-controller/theme-controller';

@Component({
  imports: [
    NgIcon,
    Cart,
    RouterLink,
    ThemeController
  ],
  providers: [provideIcons({heroShoppingCart})],
  selector: 'app-navbar',
  styleUrl: './navbar.css',
  templateUrl: './navbar.html',
})

export class Navbar {
  cartCount = inject(ProductStore).cartCount
  showCart = false;

  toggleCart(status: boolean) {
    this.showCart = status;
  }
}

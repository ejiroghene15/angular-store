import {Component, inject, signal} from '@angular/core';
import {NgIcon, provideIcons} from '@ng-icons/core';
import {heroShoppingCart} from '@ng-icons/heroicons/outline';
import {ProductStore} from '../../service/product-store';
import {Cart} from '../cart/cart';
import {RouterLink} from '@angular/router';

@Component({
  imports: [
    NgIcon,
    Cart,
    RouterLink
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

import {Component, computed, inject, input, output} from '@angular/core';
import {CartStore} from '../../service/cart-store';
import {CurrencyPipe, NgOptimizedImage} from '@angular/common';
import {RouterLink} from '@angular/router';
import {NgIcon, provideIcons} from '@ng-icons/core';
import {heroShoppingCart, heroTrash} from '@ng-icons/heroicons/outline';

@Component({
  imports: [
    CurrencyPipe,
    NgOptimizedImage,
    RouterLink,
    NgIcon
  ],
  providers: [provideIcons({heroTrash, heroShoppingCart})],
  selector: 'app-cart',
  styleUrl: './cart.css',
  templateUrl: './cart.html',
})
export class Cart {
  cart = inject(CartStore)

  cartTotal = computed(() => this.cart.cartItems()
    .reduce((count, item) => count + (item.quantity * item.price), 0));

  showCart = input();
  toggleCart = output<boolean>()

  hideCart() {
    this.toggleCart.emit(false);
  }

  protected decreaseQuantity(itemId: number) {
    let item = this.cart.cartItems().find((i) => i.id === itemId);
    if (item && item.quantity > 1) {
      item.quantity--;
      this.cart.updateCart()
    }
  }

  protected increaseQuantity(itemId: number) {
    let item = this.cart.cartItems().find((i) => i.id === itemId);
    if (item) {
      item.quantity++;
      this.cart.updateCart()
    }
  }

  protected removeItem(itemId: number) {
    this.cart.cartItems.update(items => items.filter(item => item.id !== itemId));
    this.cart.updateCart()
  }
}

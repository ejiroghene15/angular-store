import {computed, inject, linkedSignal, Service, signal} from '@angular/core';
import {fromEvent} from 'rxjs';
import {Product} from '../types/product-type';
import {Router} from '@angular/router';

@Service()
export class CartStore {
  private router = inject(Router)
  toastMsg = signal('');
  private toastTimer?: ReturnType<typeof setTimeout>;

  browserStorage$ = fromEvent(window, 'storage')

  cartItems = signal<Product[]>(this.getCartItems());
  cartItemsComputed = computed(() => this.cartItems());
  cartCount = linkedSignal(() => this.cartItems()
    .reduce((count, item) => count + item.quantity, 0));

  constructor() {
    this.browserStorage$.subscribe(() => this.refreshCart());
  }

  refreshCart() {
    const items = this.getCartItems();
    this.cartItems.set(items);
  }

  addToCart(item: Product) {
    // * Get existing cart items from local storage
    const existingCartItems = this.getCartItems();

    // * Check if the item already exists in the cart
    const productInCart = existingCartItems.findIndex(
      (cartItem) => cartItem.id === item.id
    );

    if (productInCart === -1) {
      // * If the item doesn't exist, add it to the cart
      item.quantity = 1; // Initialize quantity to 1
      existingCartItems.push(item);
    } else {
      // * If the item exists, update its quantity
      existingCartItems[productInCart].quantity = (existingCartItems[productInCart].quantity || 1) + 1;
    }

    localStorage.setItem('cartItems', JSON.stringify(existingCartItems));
    this.cartItems.set(this.getCartItems());
    this.showToast('Added to cart')
    this.router.navigate(['/checkout'])
  }

  getCartItems(): Product[] {
    const cartItems = localStorage.getItem('cartItems');
    return cartItems ? JSON.parse(cartItems) : [];
  }

  updateCart() {
    localStorage.setItem('cartItems', JSON.stringify(this.cartItemsComputed()));
    this.cartItems.set(this.getCartItems());
  }

  showToast(msg: string) {
    clearTimeout(this.toastTimer);
    this.toastMsg.set(msg);
    this.toastTimer = setTimeout(() => this.toastMsg.set(''), 2000);
  }

}

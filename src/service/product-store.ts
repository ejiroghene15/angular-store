import {computed, inject, linkedSignal, Service, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';

export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  }
  quantity: number
}

@Service()
export class ProductStore {
  private http = inject(HttpClient);

  allProducts = this.http.get<Product[]>('https://fakestoreapi.com/products');
  _localstorage = signal<string | null>(localStorage.getItem('cartItems'))

  cartItems = signal<Product[]>(this.getCartItems());
  cartItemsComputed = computed(() => this.cartItems());
  cartCount = linkedSignal(() => this.cartItems()
    .reduce((count, item) => count + item.quantity, 0));

  constructor() {
    // window.addEventListener('storage', () => this.refreshCart());
    // window.addEventListener('visibilitychange', () => {
    //   if (document.visibilityState === 'visible') {
    //     this.refreshCart();
    //   }
    // });
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
    return true;
  }

  getCartItems(): Product[] {
    const cartItems = localStorage.getItem('cartItems');
    return cartItems ? JSON.parse(cartItems) : [];
  }

  updateCart() {
    localStorage.setItem('cartItems', JSON.stringify(this.cartItemsComputed()));
    this.cartItems.set(this.getCartItems());
  }
}

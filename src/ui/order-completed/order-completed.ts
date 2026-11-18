import {Component, inject, signal} from '@angular/core';
import {CurrencyPipe} from '@angular/common';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {NgIcon, provideIcons} from '@ng-icons/core';
import {heroArrowLeft, heroCheckCircle, heroShoppingBag, heroTruck} from '@ng-icons/heroicons/outline';
import {httpResource} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {CartStore} from '../../service/cart-store';

type OrderConfirmationResponse = {
  success: boolean;
  totalAmount: number,
  orderDate: string,
  items: Items[]
}

type Items = {
  name: string
  description: string
  image: string
  quantity: string
  price: number
}

@Component({
  imports: [
    RouterLink,
    NgIcon,
    CurrencyPipe
  ],
  providers: [provideIcons({heroCheckCircle, heroArrowLeft, heroShoppingBag, heroTruck})],
  selector: 'app-order-completed',
  styleUrl: './order-completed.css',
  templateUrl: './order-completed.html',
})
export class OrderCompleted {
  private readonly route = inject(ActivatedRoute)
  private cart = inject(CartStore);
  orderId = signal(this.route.snapshot.queryParamMap.get('order_id'));

  constructor() {
    localStorage.removeItem('cartItems');
    this.cart.cartItems.set([]);
  }

  orderConfirmation = httpResource<OrderConfirmationResponse>(() => `${environment.BACKEND_API}/confirm-order.php?orderId=${this.orderId()}`)


  estimatedDelivery = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

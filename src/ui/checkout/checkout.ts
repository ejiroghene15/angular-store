import {Component, computed, inject, signal} from '@angular/core';
import {ProductStore} from '../../service/product-store';
import {CurrencyPipe, NgOptimizedImage, NgTemplateOutlet} from '@angular/common';
import {Router, RouterLink} from '@angular/router';
import {NgIcon, provideIcons} from '@ng-icons/core';
import {heroArrowLeft, heroCheckCircle, heroCreditCard, heroShoppingBag, heroTruck} from '@ng-icons/heroicons/outline';
import {email, form, FormField, FormRoot, required, submit, validate} from '@angular/forms/signals';

@Component({
  imports: [
    CurrencyPipe,
    NgOptimizedImage,
    RouterLink,
    NgIcon,
    NgTemplateOutlet,
    FormRoot,
    FormField
  ],
  providers: [provideIcons({heroArrowLeft, heroCheckCircle, heroCreditCard, heroTruck, heroShoppingBag})],
  selector: 'app-checkout',
  styleUrl: './checkout.css',
  templateUrl: './checkout.html',
})
export class Checkout {
  cart = inject(ProductStore);
  private router = inject(Router);

  shippingModel = signal({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipcode: '',
    confirmDetails: false
  });

  shipping = 4.99;
  orderComplete = false;
  orderNumber = '';
  confirmed = false;

  subtotal = computed(() =>
    this.cart.cartItems().reduce((sum, item) => sum + item.price * item.quantity, 0)
  );

  total = computed(() => this.subtotal() + this.shipping);

  cartItems = computed(() => this.cart.cartItems());
  itemCount = computed(() =>
    this.cart.cartItems().reduce((count, item) => count + item.quantity, 0)
  );

  shippingForm = form(
    this.shippingModel,
    (path) => {
      required(path.firstName, {message: 'Firstname is required'});
      required(path.email, {message: 'Email is required'});
      email(path.email, {message: 'Invalid email address'})
      required(path.phone, {message: 'Phone is required'});
      required(path.address, {message: 'Address is required'});
      required(path.city, {message: 'City is required'});
      required(path.state, {message: 'State is required'});
      validate(path.confirmDetails, ({value}) => {
        if (!value()) {
          return {
            kind: 'confirmDetails', message: 'Please confirm your details is correct'
          }
        }
        return null;
      })
    },
    {
      submission: {
        action: async (field) => {
          // console.log(field().value())
        }
      }
    }
  )

  protected async placeOrder() {

    const success = await submit(this.shippingForm, async (field) => {
      const result = {ok: true};
      if (result.ok) return;
      return {kind: 'gateway-error', message: 'Unable to initiate payment'};
    })

    if (success) {
      // this.orderComplete = true;
      // this.orderNumber = `#ORD-${Math.floor(Math.random() * 90000 + 10000)}`;
      // // Clear cart
      localStorage.removeItem('cartItems');
      this.cart.cartItems.set([]);
    }
  }

  protected async continueShopping() {
    await this.router.navigate(['/']);
  }
}

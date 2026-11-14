import {Component, computed, ElementRef, inject, signal, viewChild} from '@angular/core';
import {ProductStore} from '../../service/product-store';
import {CurrencyPipe, NgOptimizedImage, NgTemplateOutlet} from '@angular/common';
import {RouterLink} from '@angular/router';
import {NgIcon, provideIcons} from '@ng-icons/core';
import {heroArrowLeft, heroCheckCircle, heroCreditCard, heroShoppingBag, heroTruck} from '@ng-icons/heroicons/outline';
import {email, form, FormField, FormRoot, required, submit, validate} from '@angular/forms/signals';
import {HttpClient} from '@angular/common/http';
import {loadStripe} from '@stripe/stripe-js';
import {firstValueFrom} from 'rxjs';
import {environment} from '../../environments/environment.development';

interface IClientSecret {
  success: boolean
  clientSecret: string
  message: string
}

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
  private http = inject(HttpClient);
  modal = viewChild<ElementRef>('modalElem');
  checkoutModal = computed(() => this.modal()?.nativeElement);
  private clientSecret = signal<string>('')

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

  subtotal = computed(() =>
    this.cart.cartItems().reduce((sum, item) => sum + item.price * item.quantity, 0)
  );

  total = computed(() => this.subtotal() + this.shipping);
  cartItems = computed(() => this.cart.cartItems());
  itemCount = this.cart.cartCount

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
        action: async (field) => this.handleSubmit(field)
      }
    }
  )

  private async handleSubmit(field: any) {
    const result = await this.initGateway(field().value())
    if (result) return await this.loadCheckOut()
    return {kind: 'gateway-error', message: 'Unable to initiate payment'};
  }

  protected async placeOrder() {
    await submit(this.shippingForm, (field) => this.handleSubmit(field))
  }

  private async loadCheckOut() {
    const stripe = await loadStripe(environment.stripePublicKey);

    try {
      let checkout = stripe?.initCheckoutFormSdk({
        clientSecret: `${this.clientSecret()}`,
        defaultValues: {
          email: this.shippingModel().email
        }
      })

      let form = checkout?.createForm();

      form?.mount('#stripeCheckoutComponent')

      const loadActionsResult = await checkout?.loadActions();
      if (loadActionsResult?.type === 'success') {
        form?.on('confirm', (event) => {
          try {
            loadActionsResult.actions.confirm({formConfirmEvent: event});
            // this.checkoutModal().close()
          } catch (error) {
            console.error("Payment confirmation error:", error)
          }
        });
      }

      this.checkoutModal().showModal()
    } catch (error) {
      console.error(error)
    }
  }

  private async initGateway(payload: object) {
    payload = {...payload, items: this.cartItems()}

    try {
      const res = await firstValueFrom(this.http.post<Partial<IClientSecret>>(`${environment.BACKEND_API}/create-session.php`, payload))

      if (res.clientSecret != null) {
        this.clientSecret.set(res.clientSecret)
        return true
      }

      throw new Error('Unable to initialize gateway session')
    } catch (error) {
      console.error(error)
      return false
    }
  }
}

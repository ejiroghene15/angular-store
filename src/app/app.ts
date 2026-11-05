import {Component, inject, signal} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Navbar} from '../ui/navbar/navbar';
import {Product, ProductStore} from '../service/product-store';
import {CurrencyPipe, NgOptimizedImage, NgTemplateOutlet, TitleCasePipe} from '@angular/common';
import {toSignal} from '@angular/core/rxjs-interop';


@Component({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    Navbar,
    NgOptimizedImage,
    CurrencyPipe,
    TitleCasePipe,
    NgTemplateOutlet
  ],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  private productStore = inject(ProductStore);
  products = toSignal(this.productStore.allProducts, {initialValue: []});
  toastMsg = signal('');
  private toastTimer?: ReturnType<typeof setTimeout>;

  showToast(msg: string) {
    clearTimeout(this.toastTimer);
    this.toastMsg.set(msg);
    this.toastTimer = setTimeout(() => this.toastMsg.set(''), 2000);
  }

  addToCart(productId: number) {
    const product = this.products().find((product: Product) => product.id === productId);
    if (product) {
      const added = this.productStore.addToCart(product);
      if (added) this.showToast('Added to cart')
    }
  }
}

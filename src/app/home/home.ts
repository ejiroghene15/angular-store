import {Component, inject, signal} from '@angular/core';
import {CurrencyPipe, NgOptimizedImage, NgTemplateOutlet, TitleCasePipe} from "@angular/common";
import {Product, ProductStore} from '../../service/product-store';
import {toSignal} from '@angular/core/rxjs-interop';

@Component({
  imports: [
    CurrencyPipe,
    NgOptimizedImage,
    TitleCasePipe,
    NgTemplateOutlet
  ],
  selector: 'app-home',
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home {
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

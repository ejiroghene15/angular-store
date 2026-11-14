import {Component, computed, inject, resource, signal} from '@angular/core';
import {NgTemplateOutlet} from "@angular/common";
import {Product, ProductStore} from '../../service/product-store';
import {firstValueFrom} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {ProductCard} from './product-card/product-card';
import {ProductSkeleton} from './product-skeleton/product-skeleton';

@Component({
  imports: [
    NgTemplateOutlet,
    ProductCard,
    ProductSkeleton
  ],
  selector: 'app-home',
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home {
  private http = inject(HttpClient)
  private productStore = inject(ProductStore);
  private toastTimer?: ReturnType<typeof setTimeout>;
  protected productsResource = resource({
    loader: async () => {
      return await firstValueFrom(this.http.get<Product[]>('https://fakestoreapi.com/products'))
    },
    id: 'products'
  })

  toastMsg = signal('');

  products = computed(() => {
    if (this.productsResource.hasValue()) {
      return this.productsResource.value();
    }
    return [];
  })

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

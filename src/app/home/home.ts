import {Component, computed, inject} from '@angular/core';
import {NgTemplateOutlet} from "@angular/common";
import {CartStore} from '../../service/cart-store';
import {ProductCard} from './product-card/product-card';
import {ProductSkeleton} from './product-skeleton/product-skeleton';
import {Products} from '../../service/products';
import {toSignal} from '@angular/core/rxjs-interop';
import {IProducts} from '../../types/product-type';

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
  private productApi = inject(Products)
  private cartStorage = inject(CartStore);
  _cartStore = this.cartStorage;

  readonly productsResource = toSignal<IProducts>(this.productApi.getAllProducts(), {initialValue: null})
  products = computed(() => this.productsResource()?.products ?? [])

}

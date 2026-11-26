import {Component, inject, input, signal} from '@angular/core';
import {NgTemplateOutlet, TitleCasePipe} from '@angular/common';
import {ProductCard} from '../home/product-card/product-card';
import {ProductSkeleton} from '../home/product-skeleton/product-skeleton';
import {IProducts} from '../../types/product-type';
import {CartStore} from '../../service/cart-store';
import {ActivatedRoute} from '@angular/router';

@Component({
  imports: [
    ProductCard,
    ProductSkeleton,
    NgTemplateOutlet,
    TitleCasePipe
  ],
  selector: 'app-product-category',
  styleUrl: './product-category.css',
  templateUrl: './product-category.html',
})
export class ProductCategory {
  products = input<IProducts>({products: []});
  productCategory = signal('');
  private cartStorage = inject(CartStore);
  _cartStore = this.cartStorage;

  constructor(route: ActivatedRoute) {
    route.params.subscribe(param => {
      const category = param['category'];
      if (typeof category === 'string') this.productCategory.set(category);
    })
  }
}

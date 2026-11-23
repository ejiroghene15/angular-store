import {Component, computed, inject, OnInit, resource, signal} from '@angular/core';
import {NgTemplateOutlet, TitleCasePipe} from "@angular/common";
import {CartStore} from '../../service/cart-store';
import {ProductCard} from '../home/product-card/product-card';
import {ProductSkeleton} from '../home/product-skeleton/product-skeleton';
import {Products} from '../../service/products';
import {firstValueFrom} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {toSignal} from '@angular/core/rxjs-interop';

@Component({
  imports: [
    NgTemplateOutlet,
    ProductCard,
    ProductSkeleton,
    FormsModule,
    TitleCasePipe
  ],
  selector: 'app-search',
  styleUrl: './search.css',
  templateUrl: './search.html',
})
export class Search implements OnInit {
  private productApi = inject(Products);
  private cartStorage = inject(CartStore);
  private router = inject(ActivatedRoute);
  _cartStore = this.cartStorage;

  searchQuery = signal('');
  searchTrigger = signal(0);
  minPrice = signal('');
  maxPrice = signal('');
  selectedCategory = signal('');

  private http = inject(HttpClient);
  categories = toSignal(this.http.get<string[]>('https://dummyjson.com/products/category-list'), {initialValue: []})

  ngOnInit() {
    const query = this.router.snapshot.queryParamMap.get('product');
    if (query) {
      this.searchQuery.set(query);
      this.searchTrigger.update(n => n + 1);
    }
  }

  searchResource = resource({
    params: () => ({
      query: this.searchQuery(),
      trigger: this.searchTrigger()
    }),
    loader: async ({params}) => {
      if (!params.query?.trim()) return {products: [] as any[]};
      return firstValueFrom(this.productApi.searchProducts(params.query.trim()));
    }
  });

  searchResults = computed(() => {
    if (this.searchResource.hasValue()) {
      let products = this.searchResource.value()?.products ?? [];
      const category = this.selectedCategory();
      if (category) {
        products = products.filter(p => p.category === category);
      }
      const min = this.minPrice();
      const max = this.maxPrice();
      if (min || max) {
        const minVal = min ? parseFloat(min) : 0;
        const maxVal = max ? parseFloat(max) : Infinity;
        products = products.filter(p => p.price >= minVal && p.price <= maxVal);
      }
      return products;
    }
    return [];
  });

  performSearch() {
    this.searchTrigger.update(n => n + 1);
  }

  clearFilters() {
    this.selectedCategory.set('');
    this.minPrice.set('');
    this.maxPrice.set('');
  }
}

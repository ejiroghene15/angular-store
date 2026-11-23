import {inject, Service} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';
import {IProducts} from '../types/product-type';

@Service()
export class Products {
  private http = inject(HttpClient)
  private readonly url = environment.MOCK_API

  getAllProducts() {
    return this.http.get<IProducts>(`${this.url}/products`)
  }

  getProductByCategory(category: string) {
    return this.http.get<IProducts>(`${this.url}/products/category/${category}`)
  }

  searchProducts(query: string) {
    return this.http.get<IProducts>(`${this.url}/products/search?q=${query}`)
  }
}

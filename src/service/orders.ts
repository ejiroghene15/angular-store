import {inject, Service} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';

@Service()
export class OrdersService {
  private http = inject(HttpClient)
  private readonly url = environment.BACKEND_API

  getOrders() {
    return this.http.get<{ success: boolean, orders: [] }>(`${this.url}/fetch-orders.php`)
  }

}

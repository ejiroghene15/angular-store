import {Component, computed, inject, signal} from '@angular/core';
import {CurrencyPipe, TitleCasePipe} from '@angular/common';
import {OrdersService} from '../../../../service/orders';
import {rxResource} from '@angular/core/rxjs-interop';

type OrderStatus = 'Paid' | 'Processing' | 'Completed';

type StoreOrder = {
  order_id: string;
  customer?: { name: string, email: string };
  number_of_items: number;
  date: string;
  amount: number;
  payment_status: OrderStatus;
  initials: string;
  items?: { name: string, description?: string, image: string, quantity: string | number, price: number }[];
};

@Component({
  imports: [CurrencyPipe, TitleCasePipe],
  selector: 'app-admin-orders',
  styleUrl: './admin-orders.css',
  templateUrl: './admin-orders.html',
})
export class AdminOrders {
  orderService = inject(OrdersService)
  protected readonly filters = ['All orders', 'Processing', 'Paid', 'Completed'];
  protected readonly selectedFilter = signal('All orders');
  protected readonly searchTerm = signal('');
  protected readonly currentPage = signal(1);
  protected readonly selectedOrderId = signal<string | null>(null);
  protected readonly orders = rxResource({
    stream: () => this.orderService.getOrders()
  });
  protected readonly allOrders = computed((): StoreOrder[] => this.orders.value()?.orders ?? []);
  protected readonly selectedOrder = computed(() => {
    const orderId = this.selectedOrderId();
    return orderId === null ? null : this.allOrders().find((order) => order.order_id === orderId) ?? null;
  });
  protected readonly filteredOrders = computed(() => {
    const orders = this.allOrders();
    const filter = this.selectedFilter();
    const searchTerm = this.searchTerm().trim().toLowerCase();
    return orders.filter((order: StoreOrder) => {
      const matchesFilter = filter === 'All orders' || order.payment_status.toLowerCase() === filter.toLowerCase();
      const matchesSearch = searchTerm.length === 0
        || order.order_id.toLowerCase().includes(searchTerm)
        || (order.customer?.name ?? '').toLowerCase().includes(searchTerm)
        || (order.customer?.email ?? '').toLowerCase().includes(searchTerm);
      return matchesFilter && matchesSearch;
    });
  });
  protected readonly visiblePages = computed(() => {
    const totalPages = this.totalPages();
    const currentPage = this.currentPage();
    if (totalPages <= 5) {
      return Array.from({length: totalPages}, (_, index) => index + 1);
    }
    if (currentPage <= 3) {
      return [1, 2, 3, 4, totalPages];
    }
    if (currentPage >= totalPages - 2) {
      return [1, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    }
    return [1, currentPage - 1, currentPage, currentPage + 1, totalPages];
  });
  private readonly pageSize = 10;
  protected readonly totalPages = computed(() => Math.ceil(this.filteredOrders().length / this.pageSize));
  protected readonly paginatedOrders = computed(() => {
    const firstIndex = (this.currentPage() - 1) * this.pageSize;
    return this.filteredOrders().slice(firstIndex, firstIndex + this.pageSize);
  });

  protected readonly firstRecord = computed(() => this.filteredOrders().length === 0
    ? 0
    : (this.currentPage() - 1) * this.pageSize + 1);
  protected readonly lastRecord = computed(() => Math.min(
    this.currentPage() * this.pageSize,
    this.filteredOrders().length,
  ));

  protected setFilter(filter: string): void {
    this.selectedFilter.set(filter);
    this.currentPage.set(1);
  }

  protected setSearchTerm(event: Event): void {
    this.searchTerm.set((event.target as HTMLInputElement).value);
    this.currentPage.set(1);
  }

  protected setPage(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
    }
  }

  protected showOrderDetails(order: StoreOrder): void {
    this.selectedOrderId.set(order.order_id);
  }

  protected closeOrderDetails(): void {
    this.selectedOrderId.set(null);
  }

  protected statusClass(status: string): string {
    switch (status) {
      case 'Paid':
        return 'badge-success';
      case 'Processing':
        return 'badge-warning';
      case 'Completed':
        return 'badge-info';
      default:
        return ''
    }
  }
}

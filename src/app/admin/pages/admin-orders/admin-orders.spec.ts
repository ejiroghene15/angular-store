import {ComponentFixture, TestBed} from '@angular/core/testing';
import {of} from 'rxjs';
import {vi} from 'vitest';
import {AdminOrders} from './admin-orders';
import {OrdersService} from '../../../../service/orders';

const testOrders = Array.from({length: 12}, (_, index) => {
  const orderNumber = index + 1;
  return {
    order_id: String(orderNumber),
    customer: {
      name: orderNumber === 1 ? 'Nina Parker' : `Customer ${orderNumber}`,
      email: `customer${orderNumber}@example.com`,
    },
    number_of_items: 1,
    date: '2026-01-01',
    amount: 25,
    payment_status: orderNumber <= 2 ? 'Paid' : 'Processing',
    initials: 'CP',
    items: orderNumber === 1 ? [{
      name: 'Loaded order item',
      description: 'Already present in the order list',
      image: 'https://example.com/loaded-item.jpg',
      quantity: '3',
      price: 500,
    }] : [],
  };
});

const testOrderDetails = {
  success: true,
  totalAmount: 25,
  orderDate: '2026-01-01',
  items: [{
    name: 'Everyday Tote',
    description: 'A practical everyday bag',
    image: 'https://example.com/tote.jpg',
    quantity: '2',
    price: 1250,
  }],
};

const getOrderDetails = vi.fn(() => of(testOrderDetails));

describe('AdminOrders', () => {
  let fixture: ComponentFixture<AdminOrders>;

  beforeEach(async () => {
    getOrderDetails.mockClear();
    await TestBed.configureTestingModule({
      imports: [AdminOrders],
      providers: [{
        provide: OrdersService,
        useValue: {
          getOrders: () => of({success: true, orders: testOrders}),
          getOrderDetails,
        },
      }],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminOrders);
    await fixture.whenStable();
  });

  it('filters the order table by status', async () => {
    const nextPage = fixture.nativeElement.querySelector('[aria-label="Next page"]') as HTMLButtonElement;
    nextPage.click();
    await fixture.whenStable();

    const tabs = fixture.nativeElement.querySelectorAll('[role="tab"]') as NodeListOf<HTMLButtonElement>;
    const paidTab = Array.from(tabs).find((tab) => tab.textContent?.includes('Paid'));

    paidTab?.click();
    await fixture.whenStable();

    const rows = fixture.nativeElement.querySelectorAll('.data-table tbody tr');
    expect(rows.length).toBe(2);
    expect(fixture.nativeElement.querySelector('.data-table').textContent).toContain('Nina Parker');
    expect(fixture.nativeElement.querySelector('.table-pagination').textContent).toContain('Showing 1–2 of 2 orders');
  });

  it('shows only the current page of orders and navigates between pages', async () => {
    const rows = fixture.nativeElement.querySelectorAll('.data-table tbody tr');
    expect(rows.length).toBe(10);
    expect(fixture.nativeElement.querySelector('.table-pagination').textContent).toContain('Showing 1–10 of 12 orders');

    const nextPage = fixture.nativeElement.querySelector('[aria-label="Next page"]') as HTMLButtonElement;
    nextPage.click();
    await fixture.whenStable();

    expect(fixture.nativeElement.querySelectorAll('.data-table tbody tr').length).toBe(2);
    expect(fixture.nativeElement.querySelector('.table-pagination').textContent).toContain('Showing 11–12 of 12 orders');

    const previousPage = fixture.nativeElement.querySelector('[aria-label="Previous page"]') as HTMLButtonElement;
    previousPage.click();
    await fixture.whenStable();

    expect(fixture.nativeElement.querySelectorAll('.data-table tbody tr').length).toBe(10);
  });

  it('displays details from the selected loaded order without fetching them', async () => {
    const viewDetails = fixture.nativeElement.querySelector('[aria-label="View details for order 1"]') as HTMLButtonElement | null;
    expect(viewDetails).not.toBeNull();
    if (!viewDetails) {
      return;
    }

    viewDetails.click();
    await fixture.whenStable();

    const detailsPanel = fixture.nativeElement.querySelector('[aria-labelledby="order-details-title"]') as HTMLElement;
    expect(detailsPanel.textContent).toContain('Loaded order item');
    expect(detailsPanel.textContent).not.toContain('Everyday Tote');
    expect(detailsPanel.textContent).toContain('$5.00');
    expect(detailsPanel.querySelector('.order-detail-copy span')?.textContent).toContain('× 3');
    expect(detailsPanel.querySelector('img')?.getAttribute('src')).toBe('https://example.com/loaded-item.jpg');
    expect(getOrderDetails).not.toHaveBeenCalled();
  });
});
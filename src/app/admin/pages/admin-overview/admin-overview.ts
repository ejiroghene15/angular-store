import {Component} from '@angular/core';
import {CurrencyPipe} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  imports: [CurrencyPipe, RouterLink],
  selector: 'app-admin-overview',
  styleUrl: './admin-overview.css',
  templateUrl: './admin-overview.html',
})
export class AdminOverview {
  protected readonly weeklyRevenue = [
    {label: 'Mon', value: 35},
    {label: 'Tue', value: 56},
    {label: 'Wed', value: 44},
    {label: 'Thu', value: 76},
    {label: 'Fri', value: 61},
    {label: 'Sat', value: 91},
    {label: 'Sun', value: 68},
  ];

  protected readonly recentOrders = [
    {id: '#ML-2048', customer: 'Nina Parker', initials: 'NP', product: 'Everyday Tote', amount: 68, status: 'Paid', tone: 'success'},
    {id: '#ML-2047', customer: 'Theo Martin', initials: 'TM', product: 'Ceramic Pour-over', amount: 42, status: 'Processing', tone: 'warning'},
    {id: '#ML-2046', customer: 'Leah Chen', initials: 'LC', product: 'Linen Table Set', amount: 124, status: 'Paid', tone: 'success'},
    {id: '#ML-2045', customer: 'Owen Brooks', initials: 'OB', product: 'Market Day Basket', amount: 56, status: 'Shipped', tone: 'info'},
  ];

  protected readonly topProducts = [
    {name: 'Everyday Canvas Tote', category: 'Bags & accessories', sold: 128, revenue: 8704, color: 'sand'},
    {name: 'Stoneware Pour-over Set', category: 'Home & living', sold: 96, revenue: 4032, color: 'sage'},
    {name: 'Linen Table Runner', category: 'Textiles', sold: 74, revenue: 3552, color: 'clay'},
  ];
}

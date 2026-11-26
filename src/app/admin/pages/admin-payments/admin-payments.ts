import {Component, computed, inject} from '@angular/core';
import {CurrencyPipe} from '@angular/common';
import {RouterLink} from '@angular/router';
import {AdminPreviewStore} from '../../admin-preview-store';

@Component({
  imports: [CurrencyPipe, RouterLink],
  selector: 'app-admin-payments',
  styleUrl: './admin-payments.css',
  templateUrl: './admin-payments.html',
})
export class AdminPayments {
  private readonly adminPreview = inject(AdminPreviewStore);
  protected readonly providers = computed(() => {
    const settings = this.adminPreview.gatewaySettings();
    return [
      {name: 'Stripe', detail: 'Cards, Apple Pay', icon: 'S', enabled: settings.stripe.enabled, style: 'stripe'},
      {name: 'PayPal', detail: 'Wallet payments', icon: 'P', enabled: settings.paypal.enabled, style: 'paypal'},
      {name: 'Square', detail: 'In-person & online', icon: '▦', enabled: settings.square.enabled, style: 'square'},
    ];
  });

  protected readonly transactions = [
    {id: 'TXN-84921', order: '#ML-2048', customer: 'Nina Parker', provider: 'Stripe', amount: 68, date: 'Nov 25, 2026', status: 'Succeeded', tone: 'success'},
    {id: 'TXN-84920', order: '#ML-2047', customer: 'Theo Martin', provider: 'PayPal', amount: 42, date: 'Nov 25, 2026', status: 'Pending', tone: 'warning'},
    {id: 'TXN-84919', order: '#ML-2046', customer: 'Leah Chen', provider: 'Stripe', amount: 124, date: 'Nov 24, 2026', status: 'Succeeded', tone: 'success'},
    {id: 'TXN-84918', order: '#ML-2045', customer: 'Owen Brooks', provider: 'Square', amount: 56, date: 'Nov 24, 2026', status: 'Succeeded', tone: 'success'},
    {id: 'TXN-84917', order: '#ML-2044', customer: 'Maya Williams', provider: 'Stripe', amount: 89, date: 'Nov 23, 2026', status: 'Refunded', tone: 'error'},
  ];
}

import {Routes} from '@angular/router';
import {Home} from './home/home';
import {Checkout} from '../ui/checkout/checkout';
import {OrderCompleted} from '../ui/order-completed/order-completed';
import {ProductCategory} from './product-category/product-category';
import {Search} from './search/search';
import {rxResource} from '@angular/core/rxjs-interop';
import {inject} from '@angular/core';
import {Products} from '../service/products';
import {StoreLayout} from './layouts/store-layout/store-layout';
import {AdminLayout} from './admin/admin-layout/admin-layout';

export const routes: Routes = [
  {
    path: 'admin',
    component: AdminLayout,
    children: [
      {
        path: '',
        loadComponent: () => import('./admin/pages/admin-overview/admin-overview').then((page) => page.AdminOverview),
        title: 'Overview · Jiro Admin'
      },
      {
        path: 'products',
        loadComponent: () => import('./admin/pages/admin-products/admin-products').then((page) => page.AdminProducts),
        title: 'Products · Jiro Admin'
      },
      {
        path: 'orders',
        loadComponent: () => import('./admin/pages/admin-orders/admin-orders').then((page) => page.AdminOrders),
        title: 'Orders · Jiro Admin'
      },
      {
        path: 'payments/settings',
        loadComponent: () => import('./admin/pages/payment-settings/payment-settings').then((page) => page.PaymentSettings),
        title: 'Payment settings · Jiro Admin'
      },
      {
        path: 'payments',
        loadComponent: () => import('./admin/pages/admin-payments/admin-payments').then((page) => page.AdminPayments),
        title: 'Payments · Jiro Admin'
      },
      {
        path: 'crm',
        loadComponent: () => import('./admin/pages/whatsapp-crm/whatsapp-crm').then((page) => page.WhatsappCrm),
        title: 'WhatsApp CRM · Jiro Admin'
      },
      {path: '**', redirectTo: ''},
    ],
  },
  {
    path: '',
    component: StoreLayout,
    title: 'Simple Store',
    children: [
      {path: '', component: Home},
      {path: 'search', component: Search, title: 'Search'},
      {
        path: 'product/:category',
        component: ProductCategory,
        resources: (ctx) => {
          const products = inject(Products);
          return {
            products: rxResource({
              params: () => ctx.params()['category'],
              stream: ({params: category}) => products.getProductByCategory(category)
            })
          }
        }
      },
      {path: 'checkout', component: Checkout, title: 'Checkout'},
      {path: 'order-completed', component: OrderCompleted, title: 'Order Completed'},
    ]
  },
  {path: '**', redirectTo: ''},
];



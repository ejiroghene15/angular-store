import {Routes} from '@angular/router';
import {Home} from './home/home';
import {Checkout} from '../ui/checkout/checkout';
import {OrderCompleted} from '../ui/order-completed/order-completed';
import {ProductCategory} from './product-category/product-category';
import {Search} from './search/search';
import {rxResource} from '@angular/core/rxjs-interop';
import {inject} from '@angular/core';
import {Products} from '../service/products';

export const routes: Routes = [
  {
    path: '', title: 'Simple Store', children: [
      {
        path: '',
        component: Home
      },
      {
        path: 'search',
        component: Search,
        title: 'Search'
      },
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
      }
    ]
  },
  {
    path: 'checkout', component: Checkout, title: 'Checkout'
  },
  {
    path: 'order-completed', component: OrderCompleted, title: 'Order Completed'
  },
];



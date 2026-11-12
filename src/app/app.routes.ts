import {Routes} from '@angular/router';
import {Home} from './home/home';
import {Settings} from './settings/settings';
import {Profile} from './profile/profile';
import {Security} from './security/security';
import {Checkout} from '../ui/checkout/checkout';

export const routes: Routes = [
  {
    path: '', component: Home, title: 'Simple Store'
  },
  {
    path: 'checkout', component: Checkout, title: 'Checkout'
  },
  {
    path: 'settings', component: Settings, title: 'Settings', children: [
      {
        path: 'profile',
        component: Profile,
        data: {name: 'Jiro'}
      },
      {
        path: 'security',
        component: Security
      }
    ]
  }
];

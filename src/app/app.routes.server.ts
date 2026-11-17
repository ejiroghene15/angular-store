import {RenderMode, ServerRoute} from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '',
    renderMode: RenderMode.Client,
  },
  {
    path: 'checkout',
    renderMode: RenderMode.Client
  },
  {
    path: 'order-completed',
    renderMode: RenderMode.Client
  },
  {
    path: 'settings/**',
    renderMode: RenderMode.Server
  }
];

import {Service, signal} from '@angular/core';

export type AdminProduct = {
  id: number;
  name: string;
  sku: string;
  category: string;
  price: number;
  stock: number;
  tone: string;
};

export type GatewaySettingsModel = {
  stripe: {enabled: boolean; publicKey: string; secretKey: string};
  paypal: {enabled: boolean; clientId: string; secretKey: string};
  square: {enabled: boolean; applicationId: string; accessToken: string};
};

@Service()
export class AdminPreviewStore {
  readonly products = signal<AdminProduct[]>([
    {id: 1, name: 'Everyday Canvas Tote', sku: 'BAG-001', category: 'Bags & accessories', price: 68, stock: 42, tone: 'sand'},
    {id: 2, name: 'Stoneware Pour-over Set', sku: 'HOM-014', category: 'Home & living', price: 42, stock: 18, tone: 'sage'},
    {id: 3, name: 'Linen Table Runner', sku: 'TEX-023', category: 'Textiles', price: 48, stock: 7, tone: 'clay'},
    {id: 4, name: 'Market Day Basket', sku: 'BAG-008', category: 'Bags & accessories', price: 56, stock: 0, tone: 'blue'},
  ]);

  readonly gatewaySettings = signal<GatewaySettingsModel>({
    stripe: {enabled: false, publicKey: '', secretKey: ''},
    paypal: {enabled: false, clientId: '', secretKey: ''},
    square: {enabled: false, applicationId: '', accessToken: ''},
  });
}

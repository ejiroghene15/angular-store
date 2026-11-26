import {Component, inject, signal} from '@angular/core';
import {CurrencyPipe} from '@angular/common';
import {FormField, form, min, required, submit} from '@angular/forms/signals';
import {AdminPreviewStore} from '../../admin-preview-store';

@Component({
  imports: [CurrencyPipe, FormField],
  selector: 'app-admin-products',
  styleUrl: './admin-products.css',
  templateUrl: './admin-products.html',
})
export class AdminProducts {
  private readonly adminPreview = inject(AdminPreviewStore);
  protected readonly productModel = signal({
    name: '',
    sku: '',
    category: 'Home & living',
    price: 0,
    stock: 0,
    description: '',
  });

  protected readonly productForm = form(this.productModel, (path) => {
    required(path.name, {message: 'Add a product name.'});
    required(path.sku, {message: 'Add a SKU so you can track this item.'});
    required(path.price, {message: 'Enter a price.'});
    min(path.price, 0.01, {message: 'Price must be greater than zero.'});
    min(path.stock, 0, {message: 'Stock cannot be negative.'});
  });

  protected readonly saved = signal(false);
  protected readonly products = this.adminPreview.products;

  protected saveProduct(): void {
    submit(this.productForm, async () => {
      const newProduct = this.productModel();
      this.products.update((products) => [{...newProduct, id: Date.now(), tone: 'sage'}, ...products]);
      this.productModel.set({name: '', sku: '', category: 'Home & living', price: 0, stock: 0, description: ''});
      this.saved.set(true);
    });
  }
}

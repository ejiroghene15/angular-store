import {Component, input, output} from '@angular/core';
import {Product} from '../../../service/product-store';
import {CurrencyPipe, NgOptimizedImage, TitleCasePipe} from '@angular/common';
import {NgIcon, provideIcons} from '@ng-icons/core';
import {heroShoppingCart} from '@ng-icons/heroicons/outline';

@Component({
  imports: [
    NgOptimizedImage,
    CurrencyPipe,
    TitleCasePipe,
    NgIcon
  ],
  providers: [provideIcons({heroShoppingCart})],
  selector: 'app-product-card',
  standalone: true,
  styleUrl: './product-card.css',
  templateUrl: 'product-card.html'
})
export class ProductCard {
  product = input.required<Product>();
  addToCart = output<number>();
}

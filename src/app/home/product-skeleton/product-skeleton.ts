import {Component} from '@angular/core';

@Component({
  selector: 'app-product-skeleton',
  standalone: true,
  template: `
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6" aria-hidden="true">
      @for (_ of [1, 2, 3, 4, 5, 6, 7, 8]; track _) {
        <div class="card bg-base-100 shadow-md overflow-hidden">
          <div class="skeleton aspect-square"></div>
          <div class="card-body p-4 gap-3">
            <div class="skeleton h-3 w-1/4"></div>
            <div class="skeleton h-4 w-3/4"></div>
            <div class="skeleton h-4 w-1/3"></div>
          </div>
        </div>
      }
    </div>
  `
})
export class ProductSkeleton {}

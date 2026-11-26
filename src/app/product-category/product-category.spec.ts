import { ComponentFixture, TestBed } from '@angular/core/testing';
import {provideRouter} from '@angular/router';
import { ProductCategory } from './product-category';

describe('ProductCategory', () => {
  let component: ProductCategory;
  let fixture: ComponentFixture<ProductCategory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductCategory],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductCategory);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

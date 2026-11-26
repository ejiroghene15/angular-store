import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AdminProducts} from './admin-products';
import {AdminPreviewStore} from '../../admin-preview-store';

describe('AdminProducts', () => {
  let fixture: ComponentFixture<AdminProducts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminProducts],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminProducts);
    await fixture.whenStable();
  });

  it('adds a valid product to the inventory list', async () => {
    const name = fixture.nativeElement.querySelector('input[placeholder="e.g. Sunday Market Tote"]') as HTMLInputElement;
    const sku = fixture.nativeElement.querySelector('input[placeholder="e.g. BAG-012"]') as HTMLInputElement;
    const price = fixture.nativeElement.querySelector('input[type="number"][step="0.01"]') as HTMLInputElement;

    name.value = 'Sunday Market Tote';
    name.dispatchEvent(new Event('input', {bubbles: true}));
    sku.value = 'BAG-012';
    sku.dispatchEvent(new Event('input', {bubbles: true}));
    price.value = '74';
    price.dispatchEvent(new Event('input', {bubbles: true}));
    await fixture.whenStable();

    const saveButton = fixture.nativeElement.querySelector('button[type="submit"]') as HTMLButtonElement;
    expect(saveButton.disabled).toBe(false);
    saveButton.click();
    await fixture.whenStable();

    expect(fixture.nativeElement.querySelector('.inventory-table-card').textContent).toContain('Sunday Market Tote');
    expect(fixture.nativeElement.querySelector('[role="status"]').textContent).toContain('Product added');
    expect(TestBed.inject(AdminPreviewStore).products().some((product) => product.name === 'Sunday Market Tote')).toBe(true);
  });
});
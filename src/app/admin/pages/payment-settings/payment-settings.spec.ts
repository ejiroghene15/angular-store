import {ComponentFixture, TestBed} from '@angular/core/testing';
import {PaymentSettings} from './payment-settings';
import {AdminPreviewStore} from '../../admin-preview-store';

describe('PaymentSettings', () => {
  let fixture: ComponentFixture<PaymentSettings>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentSettings],
    }).compileComponents();

    fixture = TestBed.createComponent(PaymentSettings);
    await fixture.whenStable();
  });

  it('requires gateway credentials before enabling and saving a provider', async () => {
    const stripeToggle = fixture.nativeElement.querySelector('input[aria-label="Enable Stripe"]') as HTMLInputElement;
    stripeToggle.click();
    await fixture.whenStable();

    let saveButton = fixture.nativeElement.querySelector('button[type="submit"]') as HTMLButtonElement;
    expect(saveButton.disabled).toBe(true);

    const publicKey = fixture.nativeElement.querySelector('input[placeholder="pk_live_..."]') as HTMLInputElement;
    const secretKey = fixture.nativeElement.querySelector('input[placeholder="Enter your Stripe secret key"]') as HTMLInputElement;
    publicKey.value = 'pk_test_example';
    publicKey.dispatchEvent(new Event('input', {bubbles: true}));
    secretKey.value = 'sk_test_example';
    secretKey.dispatchEvent(new Event('input', {bubbles: true}));
    await fixture.whenStable();

    saveButton = fixture.nativeElement.querySelector('button[type="submit"]') as HTMLButtonElement;
    expect(saveButton.disabled).toBe(false);
    saveButton.click();
    await fixture.whenStable();

    expect(fixture.nativeElement.querySelector('[role="status"]').textContent).toContain('Settings saved');
    expect(TestBed.inject(AdminPreviewStore).gatewaySettings().stripe.enabled).toBe(true);
  });
});
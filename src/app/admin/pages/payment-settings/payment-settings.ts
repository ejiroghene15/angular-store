import {Component, inject, signal} from '@angular/core';
import {FormField, form, required, submit} from '@angular/forms/signals';
import {AdminPreviewStore, GatewaySettingsModel} from '../../admin-preview-store';

@Component({
  imports: [FormField],
  selector: 'app-payment-settings',
  styleUrl: './payment-settings.css',
  templateUrl: './payment-settings.html',
})
export class PaymentSettings {
  private readonly adminPreview = inject(AdminPreviewStore);
  protected readonly saved = signal(false);
  protected readonly settingsModel = signal<GatewaySettingsModel>({
    stripe: {...this.adminPreview.gatewaySettings().stripe},
    paypal: {...this.adminPreview.gatewaySettings().paypal},
    square: {...this.adminPreview.gatewaySettings().square},
  });

  protected readonly settingsForm = form(this.settingsModel, (path) => {
    required(path.stripe.publicKey, {when: ({valueOf}) => valueOf(path.stripe.enabled), message: 'A publishable key is required when Stripe is enabled.'});
    required(path.stripe.secretKey, {when: ({valueOf}) => valueOf(path.stripe.enabled), message: 'A secret key is required when Stripe is enabled.'});
    required(path.paypal.clientId, {when: ({valueOf}) => valueOf(path.paypal.enabled), message: 'A client ID is required when PayPal is enabled.'});
    required(path.paypal.secretKey, {when: ({valueOf}) => valueOf(path.paypal.enabled), message: 'A secret key is required when PayPal is enabled.'});
    required(path.square.applicationId, {when: ({valueOf}) => valueOf(path.square.enabled), message: 'An application ID is required when Square is enabled.'});
    required(path.square.accessToken, {when: ({valueOf}) => valueOf(path.square.enabled), message: 'An access token is required when Square is enabled.'});
  });

  protected saveSettings(): void {
    submit(this.settingsForm, async () => {
      this.adminPreview.gatewaySettings.set({
        stripe: {...this.settingsModel().stripe},
        paypal: {...this.settingsModel().paypal},
        square: {...this.settingsModel().square},
      });
      this.saved.set(true);
    });
  }
}

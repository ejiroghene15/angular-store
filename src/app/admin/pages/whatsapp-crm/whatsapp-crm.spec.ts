import {ComponentFixture, TestBed} from '@angular/core/testing';
import {WhatsappCrm} from './whatsapp-crm';

describe('WhatsappCrm', () => {
  let fixture: ComponentFixture<WhatsappCrm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WhatsappCrm],
    }).compileComponents();

    fixture = TestBed.createComponent(WhatsappCrm);
    await fixture.whenStable();
  });

  it('adds a sent message to the selected conversation', async () => {
    const message = fixture.nativeElement.querySelector('textarea[aria-label="Write a message"]') as HTMLTextAreaElement;
    message.value = 'I can help with that!';
    message.dispatchEvent(new Event('input', {bubbles: true}));
    await fixture.whenStable();

    const sendButton = fixture.nativeElement.querySelector('button[aria-label="Send message"]') as HTMLButtonElement;
    expect(sendButton.disabled).toBe(false);
    sendButton.click();
    await fixture.whenStable();

    expect(fixture.nativeElement.querySelector('.conversation-messages').textContent).toContain('I can help with that!');
  });
});
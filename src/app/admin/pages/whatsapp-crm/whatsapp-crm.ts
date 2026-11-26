import {Component, computed, signal} from '@angular/core';
import {FormField, form, required, submit} from '@angular/forms/signals';

type ChatMessage = {
  id: number;
  body: string;
  time: string;
  fromStore: boolean;
};

type CrmContact = {
  id: number;
  name: string;
  phone: string;
  initials: string;
  color: string;
  preview: string;
  time: string;
  unread: number;
  vip: boolean;
  messages: ChatMessage[];
};

@Component({
  imports: [FormField],
  selector: 'app-whatsapp-crm',
  styleUrl: './whatsapp-crm.css',
  templateUrl: './whatsapp-crm.html',
})
export class WhatsappCrm {
  protected readonly filters = ['All', 'Unread', 'VIP'];
  protected readonly selectedFilter = signal('All');
  protected readonly selectedContactId = signal(1);
  protected readonly searchQuery = signal('');
  protected readonly messageModel = signal({message: ''});
  protected readonly messageForm = form(this.messageModel, (path) => {
    required(path.message, {message: 'Write a message before sending.'});
  });

  protected readonly contacts = signal<CrmContact[]>([
    {
      id: 1, name: 'Sophie Bennett', phone: '+1 (415) 555-0132', initials: 'SB', color: 'sage', preview: 'That sounds perfect, thank you!', time: '10:42 AM', unread: 2, vip: true,
      messages: [
        {id: 1, body: 'Hi Sophie! Just checking in — how are you enjoying your Everyday Tote?', time: '10:28 AM', fromStore: true},
        {id: 2, body: 'I absolutely love it. The quality is even better than I expected!', time: '10:36 AM', fromStore: false},
        {id: 3, body: 'That makes our day! We’re so glad it found a good home 🌿', time: '10:38 AM', fromStore: true},
        {id: 4, body: 'That sounds perfect, thank you!', time: '10:42 AM', fromStore: false},
      ],
    },
    {
      id: 2, name: 'Marcus Rivera', phone: '+1 (212) 555-0198', initials: 'MR', color: 'clay', preview: 'Do you have the blue one in stock?', time: '10:18 AM', unread: 1, vip: false,
      messages: [
        {id: 1, body: 'Hello! I saw your canvas tote in the weekend edit.', time: '10:14 AM', fromStore: false},
        {id: 2, body: 'Do you have the blue one in stock?', time: '10:18 AM', fromStore: false},
      ],
    },
    {
      id: 3, name: 'Amara Johnson', phone: '+1 (646) 555-0104', initials: 'AJ', color: 'lilac', preview: 'Thank you for the quick help ✨', time: 'Yesterday', unread: 0, vip: true,
      messages: [
        {id: 1, body: 'My order arrived today and it’s beautiful.', time: 'Yesterday', fromStore: false},
        {id: 2, body: 'So happy to hear that, Amara! Thanks for shopping small with us 💛', time: 'Yesterday', fromStore: true},
        {id: 3, body: 'Thank you for the quick help ✨', time: 'Yesterday', fromStore: false},
      ],
    },
    {
      id: 4, name: 'Oliver James', phone: '+1 (503) 555-0177', initials: 'OJ', color: 'blue', preview: 'Is the ceramic set dishwasher safe?', time: 'Yesterday', unread: 0, vip: false,
      messages: [
        {id: 1, body: 'Is the ceramic set dishwasher safe?', time: 'Yesterday', fromStore: false},
        {id: 2, body: 'Yes, the stoneware is dishwasher safe. We recommend a gentle cycle.', time: 'Yesterday', fromStore: true},
      ],
    },
  ]);

  protected readonly activeContact = computed(() => this.contacts().find((contact) => contact.id === this.selectedContactId()));

  protected readonly filteredContacts = computed(() => {
    const filter = this.selectedFilter();
    const query = this.searchQuery().trim().toLowerCase();
    return this.contacts().filter((contact) => {
      const matchesFilter = filter === 'All' || (filter === 'Unread' ? contact.unread > 0 : contact.vip);
      const matchesSearch = !query || contact.name.toLowerCase().includes(query) || contact.phone.includes(query);
      return matchesFilter && matchesSearch;
    });
  });

  protected selectContact(id: number): void {
    this.selectedContactId.set(id);
    this.contacts.update((contacts) => contacts.map((contact) => contact.id === id ? {...contact, unread: 0} : contact));
  }

  protected sendMessage(): void {
    submit(this.messageForm, async () => {
      const body = this.messageModel().message.trim();
      if (!body) return;
      const time = new Intl.DateTimeFormat('en-US', {hour: 'numeric', minute: '2-digit'}).format(new Date());
      const selectedId = this.selectedContactId();
      this.contacts.update((contacts) => contacts.map((contact) => contact.id === selectedId ? {
        ...contact,
        preview: body,
        time,
        messages: [...contact.messages, {id: Date.now(), body, time, fromStore: true}],
      } : contact));
      this.messageModel.set({message: ''});
    });
  }
}

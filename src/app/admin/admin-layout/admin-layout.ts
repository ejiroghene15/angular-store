import {Component, signal} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';

@Component({
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  selector: 'app-admin-layout',
  styleUrl: './admin-layout.css',
  templateUrl: './admin-layout.html',
})
export class AdminLayout {
  protected readonly mobileNavOpen = signal(false);
  protected readonly currentYear = new Date().getFullYear();

  protected closeMobileNav(): void {
    this.mobileNavOpen.set(false);
  }
}

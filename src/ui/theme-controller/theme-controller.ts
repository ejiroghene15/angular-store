import {afterEveryRender, Component, computed, DOCUMENT, ElementRef, inject, signal, viewChild} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  selector: 'app-theme-controller',
  styleUrl: './theme-controller.css',
  templateUrl: './theme-controller.html',
})
export class ThemeController {
  theme = signal<string>(localStorage.getItem('theme') || 'garden')
  currentTheme = computed(() => this.theme());
  isDark = computed(() => this.theme() === 'sunset');
  inputToggle = viewChild<ElementRef<HTMLInputElement>>('themeToggle')

  constructor() {
    if (!localStorage.getItem('theme')) {
      localStorage.setItem('theme', this.currentTheme())
    }

    const elemRef = inject(DOCUMENT)

    afterEveryRender(() => {
      elemRef.querySelector('html')?.setAttribute('data-theme', this.currentTheme())
    })
  }

  toggleTheme = () => {
    if (this.inputToggle()?.nativeElement.checked) {
      localStorage.setItem('theme', 'sunset')
      this.theme.set('sunset')
    } else {
      localStorage.setItem('theme', 'garden')
      this.theme.set('garden')
    }
  }
  protected readonly FormControl = FormControl;
}

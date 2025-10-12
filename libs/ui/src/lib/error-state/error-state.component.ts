import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-error-state',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div
        class="w-20 h-20 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-6"
      >
        <svg
          class="w-10 h-10 text-red-600 dark:text-red-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>

      <h3 class="text-2xl font-bold text-deep-900 dark:text-white mb-2">
        {{ title }}
      </h3>

      <p class="text-deep-600 dark:text-deep-300 mb-6 max-w-md">
        {{ message }}
      </p>

      <button
        *ngIf="showRetry"
        (click)="onRetry()"
        class="px-6 py-3 bg-marine-600 hover:bg-marine-700 text-white font-semibold rounded-lg transition-all duration-200 hover:scale-105 transform shadow-lg hover:shadow-xl"
      >
        Reintentar
      </button>
    </div>
  `,
  styles: [],
})
export class ErrorStateComponent {
  @Input() title = '¡Oops! Algo salió mal';
  @Input() message =
    'No pudimos cargar los datos. Por favor, verifica tu conexión e intenta de nuevo.';
  @Input() showRetry = true;
  @Output() retry = new EventEmitter<void>();

  onRetry(): void {
    this.retry.emit();
  }
}

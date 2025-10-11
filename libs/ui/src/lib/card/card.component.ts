import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() hoverable = true;
  @Input() padding: 'none' | 'sm' | 'md' | 'lg' = 'md';

  get classes(): string {
    const base =
      'bg-white dark:bg-deep-800 rounded-lg shadow-md border border-deep-200 dark:border-deep-700 transition-all duration-200';
    const hover = this.hoverable
      ? 'hover:shadow-marine dark:hover:shadow-ocean hover:-translate-y-1'
      : '';

    const paddings = {
      none: '',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    };

    return `${base} ${hover} ${paddings[this.padding]}`;
  }
}

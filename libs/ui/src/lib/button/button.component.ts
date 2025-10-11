import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() variant: ButtonVariant = 'primary';
  @Input() size: ButtonSize = 'md';
  @Input() disabled = false;
  @Input() routerLink?: string | string[];
  @Input() href?: string;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() fullWidth = false;

  get classes(): string {
    const base =
      'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';

    const variants = {
      primary:
        'bg-marine-600 text-white hover:bg-marine-700 focus:ring-marine-500 shadow-lg hover:shadow-xl',
      secondary:
        'bg-ocean-600 text-white hover:bg-ocean-700 focus:ring-ocean-500 shadow-lg hover:shadow-xl',
      outline:
        'border-2 border-marine-600 text-marine-600 hover:bg-marine-50 focus:ring-marine-500 bg-transparent',
      ghost: 'text-marine-600 hover:bg-marine-50 focus:ring-marine-500 bg-transparent',
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-6 py-2.5 text-base',
      lg: 'px-8 py-3 text-lg',
    };

    const width = this.fullWidth ? 'w-full' : '';
    const opacity = this.disabled ? 'opacity-50 cursor-not-allowed' : '';

    return `${base} ${variants[this.variant]} ${sizes[this.size]} ${width} ${opacity}`;
  }
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-skeleton-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="animate-pulse">
      <div class="bg-gray-300 dark:bg-gray-700 h-48 rounded-t-lg"></div>
      <div class="p-6 space-y-4">
        <div class="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
        <div class="h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
        <div class="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>
        <div class="flex space-x-2 mt-4">
          <div class="h-6 bg-gray-300 dark:bg-gray-700 rounded w-16"></div>
          <div class="h-6 bg-gray-300 dark:bg-gray-700 rounded w-16"></div>
          <div class="h-6 bg-gray-300 dark:bg-gray-700 rounded w-16"></div>
        </div>
        <div class="flex justify-between items-center mt-4">
          <div class="h-4 bg-gray-300 dark:bg-gray-700 rounded w-20"></div>
          <div class="h-4 bg-gray-300 dark:bg-gray-700 rounded w-20"></div>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class SkeletonCardComponent {}

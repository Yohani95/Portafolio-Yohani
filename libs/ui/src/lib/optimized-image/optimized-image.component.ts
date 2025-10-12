import { Component, Input, OnInit, signal, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'lib-optimized-image',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="relative overflow-hidden" [style.aspect-ratio]="aspectRatio">
      <!-- Placeholder/Skeleton -->
      <div
        *ngIf="!imageLoaded()"
        class="absolute inset-0 bg-gradient-marine animate-pulse flex items-center justify-center"
      >
        <svg class="w-8 h-8 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </div>

      <!-- Actual Image -->
      <img
        [src]="imageLoaded() ? finalSrc() : ''"
        [alt]="alt"
        [class]="imageClasses"
        [loading]="lazy ? 'lazy' : 'eager'"
        (load)="onImageLoad()"
        (error)="onImageError()"
        [style.display]="imageLoaded() ? 'block' : 'none'"
      />

      <!-- Error State -->
      <div
        *ngIf="imageError()"
        class="absolute inset-0 bg-deep-100 dark:bg-deep-800 flex items-center justify-center"
      >
        <div class="text-center text-deep-500 dark:text-deep-400">
          <svg class="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
          <p class="text-sm">Error al cargar imagen</p>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class OptimizedImageComponent implements OnInit {
  @Input() src = '';
  @Input() alt = '';
  @Input() aspectRatio = '16/9';
  @Input() lazy = true;
  @Input() webp = true;
  @Input() quality = 80;
  @Input() width = 800;
  @Input() height?: number;
  @Input() imageClasses = 'w-full h-full object-cover';

  private platformId = inject(PLATFORM_ID);

  // Signals for reactive state
  imageLoaded = signal(false);
  imageError = signal(false);
  finalSrc = signal('');

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeImage();
    }
  }

  private initializeImage() {
    if (!this.src) return;

    // Check if browser supports WebP
    const supportsWebP = this.checkWebPSupport();

    if (this.webp && supportsWebP) {
      // Use WebP if supported
      this.finalSrc.set(this.generateOptimizedSrc('webp'));
    } else {
      // Fallback to original format
      this.finalSrc.set(this.src);
    }
  }

  private checkWebPSupport(): boolean {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  }

  private generateOptimizedSrc(_format: string): string {
    // For now, return original src
    // In a real implementation, you'd integrate with an image optimization service
    // like Cloudinary, Vercel Image Optimization, or Next.js Image
    return this.src;
  }

  onImageLoad() {
    this.imageLoaded.set(true);
    this.imageError.set(false);
  }

  onImageError() {
    this.imageError.set(true);
    this.imageLoaded.set(false);
  }
}

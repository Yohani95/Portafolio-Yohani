import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalyticsService } from '@portfolio-nx/data-access';

@Component({
  selector: 'lib-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
  version = '1.3.0';
  private analyticsService = inject(AnalyticsService);

  socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/Yohani95',
      icon: 'github',
      ariaLabel: 'Visitar mi perfil de GitHub',
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/yohani-espinoza-a14276240/',
      icon: 'linkedin',
      ariaLabel: 'Visitar mi perfil de LinkedIn',
    },
    {
      name: 'Email',
      url: 'mailto:yohani95301@gmail.com',
      icon: 'email',
      ariaLabel: 'Enviarme un correo electrónico',
    },
  ];

  onCVDownload(): void {
    this.analyticsService.trackCVDownload('footer');
  }
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  currentYear = new Date().getFullYear();

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
}

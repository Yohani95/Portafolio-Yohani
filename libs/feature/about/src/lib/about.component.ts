import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SEOService } from '@portfolio-nx/data-access';

interface Skill {
  category: string;
  items: string[];
}

@Component({
  selector: 'lib-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  private seoService = inject(SEOService);

  ngOnInit(): void {
    // SEO para la página Acerca de
    this.seoService.updateSEO({
      title: 'Acerca de Mí - Yohani Espinoza | Ingeniero en Informática',
      description:
        'Conoce mi trayectoria profesional, habilidades técnicas y experiencia como Full Stack Developer. Más de 4 años desarrollando soluciones empresariales.',
      keywords:
        'sobre mi, experiencia, habilidades, .NET Core, Spring Boot, Next.js, Azure, Docker, Clean Architecture',
      type: 'profile',
    });
  }
  bio = {
    introduction:
      'Ingeniero en Informática con más de 4 años de experiencia en desarrollo de software full stack. Especializado en C# (.NET Core), Java (Spring Boot), y Next.js, con conocimientos sólidos en Docker y Azure.',
    experience:
      'Destaco por mi liderazgo técnico, aplicación de metodologías ágiles (Scrum) y enfoque en soluciones escalables, limpias y de alto rendimiento. He trabajado con empresas como KPAZ, Allware y APR Software, desarrollando desde microservicios empresariales hasta sistemas ERP completos.',
    focus:
      'Mi enfoque combina Clean Architecture, buenas prácticas de código y deployment automatizado. Además, soy un apasionado del mar: Patrón de nave menor y pescador artesanal que busca conectar la tecnología con el océano.',
  };

  skills: Skill[] = [
    {
      category: 'Lenguajes',
      items: ['C#', 'Java', 'PHP', 'JavaScript', 'TypeScript', 'Kotlin', 'VB.NET'],
    },
    {
      category: 'Backend',
      items: [
        '.NET Core',
        'Spring Boot',
        'Laravel',
        'ASP.NET Core',
        'Node.js',
        'REST APIs',
        'Microservicios',
      ],
    },
    {
      category: 'Frontend',
      items: ['Next.js', 'React', 'Angular', 'Bootstrap', 'Tailwind CSS', 'HTML5', 'CSS3'],
    },
    {
      category: 'Bases de Datos',
      items: ['SQL Server', 'MySQL', 'PostgreSQL', 'Stored Procedures', 'Triggers'],
    },
    {
      category: 'DevOps & Cloud',
      items: ['Docker', 'Azure Cloud', 'Git', 'GitHub Actions', 'GitLab', 'CI/CD'],
    },
    {
      category: 'Metodologías',
      items: ['Scrum', 'Clean Architecture', 'SOLID', 'Clean Code', 'ClickUp', 'Jira'],
    },
  ];

  education = [
    {
      degree: 'Ingeniería en Informática',
      institution: 'Instituto Profesional',
      year: '2019 - 2022',
    },
    {
      degree: 'Analista Programador',
      institution: 'Instituto Profesional',
      year: '2019 - 2020',
    },
  ];

  certifications = [
    'Patrón de Nave Menor',
    'Pescador Artesanal',
    'Metodologías Ágiles - Scrum',
    'Clean Architecture & SOLID Principles',
  ];

  maritimePassion = {
    title: '⚓ Una Conexión Única: Tecnología y Mar',
    description:
      'Soy un apasionado de la pesca y del mar. Cuento con mi propia embarcación y disfruto cada jornada en el océano, combinando mi amor por la pesca con mi otra gran pasión: la tecnología.',
    vision:
      'Me gusta desarrollar soluciones que conecten ambos mundos, aprovechando herramientas digitales para mejorar la experiencia en la navegación, el registro de capturas y la gestión de datos marítimos.',
    belief:
      'Creo firmemente que la innovación puede transformar la forma en que vivimos y entendemos la pesca artesanal.',
  };
}

import { Component, Inject, PLATFORM_ID, OnDestroy, OnInit, signal, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { GitHubService, Repository, SEOService } from '@portfolio-nx/data-access';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  private githubService = inject(GitHubService);
  private seoService = inject(SEOService);

  readonly name = 'Yohani Espinoza Duarte';
  readonly roles = ['Ingeniero en Informática', 'Full Stack Developer'];
  readonly tagline =
    'Más de 4 años desarrollando soluciones escalables con diferentes tecnologías como .NET Core, Spring Boot, Next.js, Angular y más. Conectando tecnología con el mar.';

  currentRoleIndex = 0;
  private intervalId?: number;

  // Proyectos destacados desde GitHub
  featuredProjects = signal<Repository[]>([]);
  loadingProjects = signal(true);

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  ngOnInit(): void {
    // SEO para la página de inicio
    this.seoService.updateSEO({
      title: 'Yohani Espinoza Duarte - Full Stack Developer & Ingeniero en Informática',
      description:
        'Ingeniero en Informática con más de 4 años de experiencia en desarrollo full stack. Especializado en .NET Core, Spring Boot, Next.js y Angular. Santiago, Chile.',
      keywords:
        'Yohani Espinoza, Full Stack Developer, .NET Core, Spring Boot, Next.js, Angular, React, Docker, Azure, Ingeniero Informática, Chile',
      type: 'profile',
    });

    // JSON-LD para perfil personal
    this.seoService.addPersonSchema();

    // Rotar roles cada 3 segundos (solo en el navegador, no en SSR)
    if (isPlatformBrowser(this.platformId)) {
      this.intervalId = window.setInterval(() => {
        this.currentRoleIndex = (this.currentRoleIndex + 1) % this.roles.length;
      }, 3000);
    }

    // Cargar proyectos destacados
    this.loadFeaturedProjects();
  }

  private loadFeaturedProjects(): void {
    this.githubService.getFeaturedRepositories().subscribe({
      next: (repos) => {
        this.featuredProjects.set(repos.slice(0, 3)); // Top 3
        this.loadingProjects.set(false);
      },
      error: (err) => {
        console.error('Error loading featured projects:', err);
        this.loadingProjects.set(false);
        // Usar datos de respaldo si hay error
        this.featuredProjects.set([]);
      },
    });
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  get currentRole(): string {
    return this.roles[this.currentRoleIndex];
  }
}

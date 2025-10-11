import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';
import { CardComponent } from '@portfolio-nx/ui';
import { GitHubService, RepositoryDetail, SEOService } from '@portfolio-nx/data-access';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, MarkdownModule, CardComponent],
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss'],
})
export class ProjectDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private githubService = inject(GitHubService);
  private seoService = inject(SEOService);

  project = signal<RepositoryDetail | null>(null);
  loading = signal(true);
  error = signal<string | null>(null);

  ngOnInit(): void {
    const repoName = this.route.snapshot.paramMap.get('name');

    if (repoName) {
      this.loadProject(repoName);
    } else {
      this.error.set('No se especificó el nombre del repositorio');
      this.loading.set(false);
    }
  }

  private loadProject(repoName: string): void {
    this.loading.set(true);
    this.error.set(null);

    this.githubService.getRepositoryDetail(repoName).subscribe({
      next: (repo) => {
        this.project.set(repo);
        this.loading.set(false);

        // SEO dinámico para el proyecto
        this.seoService.updateSEO({
          title: `${repo.name} - Proyecto de Yohani Espinoza`,
          description: repo.description || `Proyecto ${repo.name} desarrollado por Yohani Espinoza`,
          keywords: `${repo.name}, ${repo.topics.join(', ')}, github, proyecto`,
          type: 'article',
        });

        // JSON-LD para el repositorio
        if (repo.primaryLanguage) {
          this.seoService.addSoftwareSourceCodeSchema({
            name: repo.name,
            description: repo.description || '',
            url: repo.url,
            language: repo.primaryLanguage.name,
          });
        }

        // Breadcrumbs
        this.seoService.addBreadcrumbSchema([
          { name: 'Inicio', url: '/' },
          { name: 'Proyectos', url: '/projects' },
          { name: repo.name, url: `/projects/${repo.name}` },
        ]);
      },
      error: (err) => {
        this.error.set('Error al cargar el proyecto. Verifica que el repositorio existe.');
        this.loading.set(false);
        console.error('Error loading repository:', err);
      },
    });
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }
}

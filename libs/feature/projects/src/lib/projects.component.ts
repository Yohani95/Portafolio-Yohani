import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CardComponent, SkeletonCardComponent } from '@portfolio-nx/ui';
import { ThemeService, GitHubService, Repository, SEOService } from '@portfolio-nx/data-access';

@Component({
  selector: 'lib-projects',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, CardComponent, SkeletonCardComponent],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {
  private themeService = inject(ThemeService);
  private githubService = inject(GitHubService);
  private seoService = inject(SEOService);

  get isDark(): boolean {
    return this.themeService.theme() === 'dark';
  }

  // Signals para state management
  projects = signal<Repository[]>([]);
  loading = signal(true);
  searchTerm = signal('');
  selectedTopic = signal<string | null>(null);
  sortBy = signal<'stars' | 'updated'>('stars');

  ngOnInit(): void {
    // SEO para la página de proyectos
    this.seoService.updateSEO({
      title: 'Proyectos - Yohani Espinoza | Full Stack Developer',
      description:
        'Explora mi portafolio de proyectos en GitHub. Aplicaciones desarrolladas con .NET Core, Spring Boot, Next.js, Angular y más tecnologías modernas.',
      keywords:
        'proyectos, portafolio, github, .NET, Spring Boot, Next.js, Angular, React, desarrollo web',
      type: 'website',
    });

    this.loadProjects();
  }

  private loadProjects(): void {
    this.loading.set(true);
    this.githubService.getUserRepositories().subscribe({
      next: (repos) => {
        this.projects.set(repos);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error loading repositories:', err);
        this.loading.set(false);
        // Fallback con datos de ejemplo si hay error
        this.projects.set([]);
      },
    });
  }

  // Computed: todos los topics únicos
  get allTopics(): string[] {
    const topics = new Set<string>();
    this.projects().forEach((project) => {
      project.topics.forEach((topic) => topics.add(topic));
    });
    return Array.from(topics).sort();
  }

  // Computed: proyectos filtrados y ordenados
  get filteredProjects(): Repository[] {
    let filtered = this.projects();

    // Filtrar por búsqueda
    const search = this.searchTerm().toLowerCase();
    if (search) {
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(search) ||
          (p.description?.toLowerCase() || '').includes(search) ||
          p.topics.some((t) => t.toLowerCase().includes(search))
      );
    }

    // Filtrar por topic
    const topic = this.selectedTopic();
    if (topic) {
      filtered = filtered.filter((p) => p.topics.includes(topic));
    }

    // Ordenar
    const sort = this.sortBy();
    filtered = [...filtered].sort((a, b) => {
      if (sort === 'stars') {
        return b.stargazerCount - a.stargazerCount;
      }
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });

    return filtered;
  }

  selectTopic(topic: string | null): void {
    this.selectedTopic.set(topic);
  }

  setSortBy(sort: 'stars' | 'updated'): void {
    this.sortBy.set(sort);
  }
}

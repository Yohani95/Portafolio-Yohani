import { Injectable, signal, inject } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map, Observable, tap, of } from 'rxjs';
import {
  GET_USER_REPOSITORIES,
  GET_REPOSITORY_README,
  GET_FEATURED_REPOSITORIES,
} from '../graphql/github.graphql';
import {
  Repository,
  RepositoryDetail,
  GitHubRepositoriesResponse,
  GitHubRepositoryDetailResponse,
} from '../models/repository.model';
import { environment } from '../config/environment';
import { CacheService } from './cache.service';

@Injectable({
  providedIn: 'root',
})
export class GitHubService {
  private readonly username = environment.githubUsername;
  private readonly apollo = inject(Apollo);
  private readonly cacheService = inject(CacheService);

  // Signals para cache
  repositories = signal<Repository[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  // Claves de caché
  private readonly CACHE_KEYS = {
    repositories: 'github_repositories',
    featuredRepos: 'github_featured',
    repoDetail: (name: string) => `github_repo_${name}`,
  };

  /**
   * Obtiene todos los repositorios del usuario
   */
  getUserRepositories(): Observable<Repository[]> {
    // Intentar obtener del caché primero
    const cached = this.cacheService.get<Repository[]>(this.CACHE_KEYS.repositories);
    if (cached) {
      this.repositories.set(cached);
      return of(cached);
    }

    this.loading.set(true);
    this.error.set(null);

    return this.apollo
      .query<GitHubRepositoriesResponse>({
        query: GET_USER_REPOSITORIES,
        variables: {
          username: this.username,
          first: 100, // Obtener hasta 100 repos
        },
      })
      .pipe(
        map((result) => {
          const repos = result.data.user.repositories.nodes.map((node) => ({
            id: node.id,
            name: node.name,
            description: node.description,
            url: node.url,
            homepageUrl: node.homepageUrl,
            stargazerCount: node.stargazerCount,
            forkCount: node.forkCount,
            primaryLanguage: node.primaryLanguage,
            topics: node.repositoryTopics.nodes.map((t) => t.topic.name),
            updatedAt: node.updatedAt,
            createdAt: node.createdAt,
            isPrivate: node.isPrivate,
            isFork: node.isFork,
          }));
          return repos;
        }),
        tap({
          next: (repos) => {
            this.repositories.set(repos);
            this.cacheService.set(this.CACHE_KEYS.repositories, repos);
            this.loading.set(false);
          },
          error: (err) => {
            this.error.set(err.message || 'Error al cargar repositorios');
            this.loading.set(false);
          },
        })
      );
  }

  /**
   * Obtiene repositorios destacados (top 6 por stars)
   */
  getFeaturedRepositories(): Observable<Repository[]> {
    // Intentar obtener del caché primero
    const cached = this.cacheService.get<Repository[]>(this.CACHE_KEYS.featuredRepos);
    if (cached) {
      return of(cached);
    }

    return this.apollo
      .query<GitHubRepositoriesResponse>({
        query: GET_FEATURED_REPOSITORIES,
        variables: {
          username: this.username,
        },
      })
      .pipe(
        map((result) =>
          result.data.user.repositories.nodes.map((node) => ({
            id: node.id,
            name: node.name,
            description: node.description,
            url: node.url,
            homepageUrl: node.homepageUrl,
            stargazerCount: node.stargazerCount,
            forkCount: node.forkCount,
            primaryLanguage: node.primaryLanguage,
            topics: node.repositoryTopics.nodes.map((t) => t.topic.name),
            updatedAt: node.updatedAt,
            createdAt: node.createdAt,
          }))
        ),
        tap((repos) => {
          this.cacheService.set(this.CACHE_KEYS.featuredRepos, repos);
        })
      );
  }

  /**
   * Obtiene el detalle de un repositorio incluyendo el README
   */
  getRepositoryDetail(repoName: string): Observable<RepositoryDetail> {
    // Intentar obtener del caché primero
    const cacheKey = this.CACHE_KEYS.repoDetail(repoName);
    const cached = this.cacheService.get<RepositoryDetail>(cacheKey);
    if (cached) {
      return of(cached);
    }

    this.loading.set(true);
    this.error.set(null);

    return this.apollo
      .query<GitHubRepositoryDetailResponse>({
        query: GET_REPOSITORY_README,
        variables: {
          owner: this.username,
          name: repoName,
        },
      })
      .pipe(
        map((result) => {
          const repo = result.data.repository;
          return {
            id: repo.id,
            name: repo.name,
            description: repo.description,
            url: repo.url,
            homepageUrl: repo.homepageUrl,
            stargazerCount: repo.stargazerCount,
            forkCount: repo.forkCount,
            primaryLanguage: repo.primaryLanguage,
            topics: repo.repositoryTopics.nodes.map((t) => t.topic.name),
            updatedAt: repo.updatedAt,
            createdAt: repo.createdAt,
            readme: repo.object?.text,
            licenseInfo: repo.licenseInfo,
          };
        }),
        tap({
          next: (repo) => {
            this.cacheService.set(cacheKey, repo);
            this.loading.set(false);
          },
          error: (err) => {
            this.error.set(err.message || 'Error al cargar el repositorio');
            this.loading.set(false);
          },
        })
      );
  }
}

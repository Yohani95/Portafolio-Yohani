import { Injectable, inject, PLATFORM_ID, Inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string;
  author?: string;
  image?: string;
  type?: 'website' | 'article' | 'profile';
  url?: string;
}

@Injectable({
  providedIn: 'root',
})
export class SEOService {
  private meta = inject(Meta);
  private title = inject(Title);
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);

  private get isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  private defaultConfig: SEOConfig = {
    title: 'Yohani Espinoza Duarte - Full Stack Developer & Ingeniero en Informática',
    description:
      'Ingeniero en Informática con más de 4 años de experiencia en desarrollo full stack. Especializado en .NET Core, Spring Boot, Next.js y Angular. Patrón de Nave Menor.',
    keywords:
      'Yohani Espinoza, Full Stack Developer, .NET Core, Spring Boot, Next.js, Angular, Ingeniero en Informática, Chile, Santiago',
    author: 'Yohani Espinoza Duarte',
    image: `https://avatars.githubusercontent.com/Yohani95`,
    type: 'website',
    url: typeof window !== 'undefined' ? window.location.origin : 'https://tu-dominio.vercel.app',
  };

  /**
   * Actualiza los meta tags de SEO para una página
   */
  updateSEO(config: Partial<SEOConfig>): void {
    const seoConfig = { ...this.defaultConfig, ...config };

    // Title
    this.title.setTitle(seoConfig.title);

    // Basic meta tags
    this.meta.updateTag({ name: 'description', content: seoConfig.description });
    this.meta.updateTag({ name: 'keywords', content: seoConfig.keywords || '' });
    this.meta.updateTag({ name: 'author', content: seoConfig.author || '' });

    // Open Graph (Facebook, LinkedIn)
    this.meta.updateTag({ property: 'og:title', content: seoConfig.title });
    this.meta.updateTag({ property: 'og:description', content: seoConfig.description });
    this.meta.updateTag({ property: 'og:type', content: seoConfig.type || 'website' });
    this.meta.updateTag({ property: 'og:url', content: seoConfig.url || this.getCurrentUrl() });
    this.meta.updateTag({ property: 'og:image', content: seoConfig.image || '' });
    this.meta.updateTag({ property: 'og:site_name', content: 'Yohani Espinoza - Portafolio' });
    this.meta.updateTag({ property: 'og:locale', content: 'es_ES' });

    // Twitter Card
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: seoConfig.title });
    this.meta.updateTag({ name: 'twitter:description', content: seoConfig.description });
    this.meta.updateTag({ name: 'twitter:image', content: seoConfig.image || '' });
    this.meta.updateTag({ name: 'twitter:site', content: '@Yohani95' }); // Cambiar si tienes Twitter

    // Canonical URL
    this.updateCanonicalUrl(seoConfig.url || this.getCurrentUrl());
  }

  /**
   * Agrega JSON-LD estructurado para SEO avanzado
   */
  addJsonLd(data: any): void {
    if (!this.isBrowser) return; // Skip during SSR

    // Remove existing JSON-LD
    const existingScript = document.querySelector('script[type="application/ld+json"]');
    if (existingScript) {
      existingScript.remove();
    }

    // Add new JSON-LD
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(data);
    document.head.appendChild(script);
  }

  /**
   * JSON-LD para perfil de persona
   */
  addPersonSchema(): void {
    const person = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Yohani Espinoza Duarte',
      jobTitle: 'Ingeniero en Informática',
      description:
        'Full Stack Developer con más de 4 años de experiencia en .NET Core, Spring Boot y Next.js',
      url: this.defaultConfig.url,
      image: this.defaultConfig.image,
      email: 'yohani95301@gmail.com',
      telephone: '+56965208072',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Santiago',
        addressRegion: 'Región Metropolitana',
        addressCountry: 'CL',
      },
      alumniOf: [
        {
          '@type': 'CollegeOrUniversity',
          name: 'Universidad (nombre)',
          startDate: '2019',
          endDate: '2022',
        },
      ],
      sameAs: ['https://github.com/Yohani95', 'https://linkedin.com/in/yohani-espinoza-a14276240'],
      knowsAbout: [
        'C#',
        '.NET Core',
        'Java',
        'Spring Boot',
        'Next.js',
        'Angular',
        'React',
        'TypeScript',
        'Docker',
        'Azure',
        'Clean Architecture',
      ],
    };

    this.addJsonLd(person);
  }

  /**
   * JSON-LD para repositorio de código
   */
  addSoftwareSourceCodeSchema(repo: {
    name: string;
    description: string;
    url: string;
    language: string;
  }): void {
    const software = {
      '@context': 'https://schema.org',
      '@type': 'SoftwareSourceCode',
      name: repo.name,
      description: repo.description,
      url: repo.url,
      codeRepository: repo.url,
      programmingLanguage: repo.language,
      author: {
        '@type': 'Person',
        name: 'Yohani Espinoza Duarte',
        url: this.defaultConfig.url,
      },
    };

    this.addJsonLd(software);
  }

  /**
   * JSON-LD para breadcrumbs
   */
  addBreadcrumbSchema(items: Array<{ name: string; url: string }>): void {
    const breadcrumb = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: item.url,
      })),
    };

    this.addJsonLd(breadcrumb);
  }

  /**
   * Actualiza la URL canónica
   */
  private updateCanonicalUrl(url: string): void {
    if (!this.isBrowser) return; // Skip during SSR

    let link: HTMLLinkElement | null = document.querySelector('link[rel="canonical"]');

    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }

    link.setAttribute('href', url);
  }

  /**
   * Obtiene la URL actual completa
   */
  private getCurrentUrl(): string {
    if (this.isBrowser && typeof window !== 'undefined') {
      return window.location.href;
    }
    return this.defaultConfig.url || '';
  }

  /**
   * Limpia los meta tags al destruir el componente
   */
  clearSEO(): void {
    this.updateSEO(this.defaultConfig);
  }
}

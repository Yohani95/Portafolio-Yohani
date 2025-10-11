import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () => import('@portfolio-nx/feature/home').then((m) => m.HomeComponent),
  },
  {
    path: 'projects',
    loadComponent: () => import('@portfolio-nx/feature/projects').then((m) => m.ProjectsComponent),
  },
  {
    path: 'projects/:name',
    loadComponent: () =>
      import('@portfolio-nx/feature/projects').then((m) => m.ProjectDetailComponent),
  },
  {
    path: 'about',
    loadComponent: () => import('@portfolio-nx/feature/about').then((m) => m.AboutComponent),
  },
  {
    path: 'contact',
    loadComponent: () => import('@portfolio-nx/feature/contact').then((m) => m.ContactComponent),
  },
];

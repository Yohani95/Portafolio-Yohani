import { ApplicationConfig } from '@angular/core';
import { HttpClient, provideHttpClient, withFetch, HttpHeaders } from '@angular/common/http';
import { ApolloClientOptions, InMemoryCache } from '@apollo/client/core';
import { Apollo, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { environment } from '../config/environment';

const GITHUB_GRAPHQL_ENDPOINT = 'https://api.github.com/graphql';

let hasWarnedAboutToken = false;

export function apolloOptionsFactory(httpLink: HttpLink): ApolloClientOptions<any> {
  let headers: HttpHeaders | undefined;

  // Usar token desde variables de entorno
  if (environment.githubToken) {
    headers = new HttpHeaders({
      Authorization: `Bearer ${environment.githubToken}`,
    });
  } else {
    // Advertir si no hay token (solo una vez)
    if (typeof window !== 'undefined' && !hasWarnedAboutToken) {
      console.warn(
        '⚠️  GitHub token no configurado. Rate limit de API aplicado.\n' +
          '💡 Configura GITHUB_TOKEN en .env.local\n' +
          '📖 Ver GITHUB_TOKEN_SETUP.md para instrucciones.'
      );
      hasWarnedAboutToken = true;
    }
  }

  return {
    link: httpLink.create({
      uri: GITHUB_GRAPHQL_ENDPOINT,
      ...(headers && { headers }),
    }),
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            repository: {
              merge: true,
            },
          },
        },
      },
    }),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'cache-and-network',
        errorPolicy: 'all',
      },
      query: {
        fetchPolicy: 'network-only',
        errorPolicy: 'all',
      },
    },
  };
}

export const provideApollo: ApplicationConfig['providers'] = [
  provideHttpClient(withFetch()),
  Apollo,
  {
    provide: APOLLO_OPTIONS,
    useFactory: apolloOptionsFactory,
    deps: [HttpLink],
  },
];

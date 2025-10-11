export interface Repository {
  id: string;
  name: string;
  description: string | null;
  url: string;
  homepageUrl?: string | null;
  stargazerCount: number;
  forkCount: number;
  primaryLanguage?: {
    name: string;
    color: string;
  } | null;
  topics: string[];
  updatedAt: string;
  createdAt: string;
  isPrivate?: boolean;
  isFork?: boolean;
}

export interface RepositoryDetail extends Repository {
  readme?: string | null;
  licenseInfo?: {
    name: string;
    spdxId: string;
  } | null;
}

export interface GitHubRepositoriesResponse {
  user: {
    repositories: {
      totalCount: number;
      nodes: Array<{
        id: string;
        name: string;
        description: string | null;
        url: string;
        homepageUrl?: string | null;
        stargazerCount: number;
        forkCount: number;
        primaryLanguage?: {
          name: string;
          color: string;
        } | null;
        repositoryTopics: {
          nodes: Array<{
            topic: {
              name: string;
            };
          }>;
        };
        updatedAt: string;
        createdAt: string;
        isPrivate?: boolean;
        isFork?: boolean;
      }>;
    };
  };
}

export interface GitHubRepositoryDetailResponse {
  repository: {
    id: string;
    name: string;
    description: string | null;
    url: string;
    homepageUrl?: string | null;
    stargazerCount: number;
    forkCount: number;
    primaryLanguage?: {
      name: string;
      color: string;
    } | null;
    repositoryTopics: {
      nodes: Array<{
        topic: {
          name: string;
        };
      }>;
    };
    object?: {
      text: string;
    } | null;
    updatedAt: string;
    createdAt: string;
    licenseInfo?: {
      name: string;
      spdxId: string;
    } | null;
  };
}

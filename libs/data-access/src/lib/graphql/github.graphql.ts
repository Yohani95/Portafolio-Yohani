import { gql } from '@apollo/client/core';

// Query para obtener repositorios del usuario
export const GET_USER_REPOSITORIES = gql`
  query GetUserRepositories($username: String!, $first: Int = 20) {
    user(login: $username) {
      repositories(
        first: $first
        orderBy: { field: UPDATED_AT, direction: DESC }
        privacy: PUBLIC
        ownerAffiliations: OWNER
      ) {
        totalCount
        nodes {
          id
          name
          description
          url
          homepageUrl
          stargazerCount
          forkCount
          primaryLanguage {
            name
            color
          }
          repositoryTopics(first: 10) {
            nodes {
              topic {
                name
              }
            }
          }
          updatedAt
          createdAt
          isPrivate
          isFork
        }
      }
    }
  }
`;

// Query para obtener README de un repositorio
export const GET_REPOSITORY_README = gql`
  query GetRepositoryReadme($owner: String!, $name: String!) {
    repository(owner: $owner, name: $name) {
      id
      name
      description
      url
      homepageUrl
      stargazerCount
      forkCount
      primaryLanguage {
        name
        color
      }
      repositoryTopics(first: 20) {
        nodes {
          topic {
            name
          }
        }
      }
      object(expression: "HEAD:README.md") {
        ... on Blob {
          text
        }
      }
      updatedAt
      createdAt
      licenseInfo {
        name
        spdxId
      }
    }
  }
`;

// Query para obtener top repositorios destacados
export const GET_FEATURED_REPOSITORIES = gql`
  query GetFeaturedRepositories($username: String!) {
    user(login: $username) {
      repositories(
        first: 6
        orderBy: { field: STARGAZERS, direction: DESC }
        privacy: PUBLIC
        ownerAffiliations: OWNER
        isFork: false
      ) {
        nodes {
          id
          name
          description
          url
          homepageUrl
          stargazerCount
          forkCount
          primaryLanguage {
            name
            color
          }
          repositoryTopics(first: 5) {
            nodes {
              topic {
                name
              }
            }
          }
          updatedAt
        }
      }
    }
  }
`;

import { request, gql } from 'graphql-request';

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export async function getPosts() {
  const query = gql`
    query MyQuery {
      postsConnection(
        where: { visibility: true }
        orderBy: publishedAt_DESC
        first: 10
      ) {
        edges {
          node {
            author {
              name
            }
            slug
            title
            excerpt
            featuredImage {
              url
            }
            createdAt
            id
          }
        }
      }
    }
  `;
  const result = await request(graphqlAPI, query);
  return result.postsConnection.edges;
}

export async function getPosts2() {
  const query = gql`
    query MyQuery {
      postsConnection(
        where: { visibility: true }
        orderBy: publishedAt_DESC
        first: 2
      ) {
        edges {
          node {
            author {
              name
            }
            slug
            title
            excerpt
            featuredImage {
              url
            }
            createdAt
            id
          }
        }
      }
    }
  `;
  const result = await request(graphqlAPI, query);
  return result.postsConnection.edges;
}

export async function getSecondFeatured() {
  const query = gql`
    query MyQuery {
      postsConnection(
        where: { visibility: true }
        orderBy: publishedAt_DESC
        first: 1
        skip: 1
      ) {
        edges {
          node {
            slug
            title
            excerpt
            featuredImage {
              url
            }
            createdAt
            id
          }
        }
      }
    }
  `;
  const result = await request(graphqlAPI, query);
  return result.postsConnection.edges;
}

export async function getFeatured() {
  const query = gql`
    query MyQuery {
      postsConnection(
        where: { visibility: true, featuredPost: true }
        orderBy: publishedAt_DESC
        first: 1
      ) {
        edges {
          node {
            author {
              name
            }
            slug
            title
            excerpt
            featuredImage {
              url
            }
            createdAt
            id
          }
        }
      }
    }
  `;
  const result = await request(graphqlAPI, query);
  return result.postsConnection.edges;
}

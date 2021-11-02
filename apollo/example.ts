import gql from 'graphql-tag';

export const getCharachters = gql`
  query getCharachters {
    characters {
      results {
        id
        name
      }
    }
  }
`;

import { gql } from "graphql-tag";

export const GET_USER = gql`
  query LoggedUser {
    me {
      username
      id
      username
      email
    }
  }
`;

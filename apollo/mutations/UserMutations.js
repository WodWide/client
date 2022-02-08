import { gql } from "graphql-tag";

export const LOGIN_USER = gql`
  mutation tokenAuth($username: String!, $password: String!) {
    tokenAuth(username: $username, password: $password) {
      success
      errors
      token
      refreshToken
      user {
        id
        username
        email
      }
    }
  }
`;

export const REGISTER_USER = gql`
  mutation register(
    $email: String!
    $username: String!
    $password1: String!
    $password2: String!
  ) {
    createUser(
      email: $email
      username: $username
      password1: $password1
      password2: $password2
    ) {
      success
      errors
      token
      refreshToken
    }
  }
`;

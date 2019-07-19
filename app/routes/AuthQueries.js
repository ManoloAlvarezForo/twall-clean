import gql from 'graphql-tag';

const IS_VALID_TOKEN = gql`
  query isValidToken($token: String) {
    isValidToken(token: $token) {
      isValid
    }
  }
`;

export default IS_VALID_TOKEN;

import gql from 'graphql-tag';

export const GET_APPLICANTS_BASIC = gql`
  query getApplicants {
    applicants {
      id
      name
      lastName
      phones {
        list {
          number
          label
        }
        keyName
      }
      mails {
        list {
          mail
          label
        }
        keyName
      }
      position
      avatar
    }
  }
`;

export const GET_APPLICANT_BY_ID = gql`
  query getApplicantById($id: String) {
    applicantById(id: $id) {
      id
      name
      lastName
      phones {
        list {
          number
          label
        }
        keyName
      }
      mails {
        list {
          mail
          label
        }
        keyName
      }
      accounts {
        list {
          account
          label
        }
        keyName
      }
      position
      address
      avatar
    }
  }
`;

export const GET_APPLICANTS_BY_FILTER = gql`
  query getApplicantsByFilter($query: String) {
    applicantsByFilter(query: $query) {
      id
      name
      lastName
      avatar
    }
  }
`;

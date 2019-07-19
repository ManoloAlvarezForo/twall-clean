import gql from 'graphql-tag';

export const UPDATE_APPLICANT = gql`
  mutation UpdateApplicantMutation($applicantToUpdate: AplicantInput) {
    updateApplicant(applicantToUpdate: $applicantToUpdate) {
      updated
      applicant {
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
  }
`;

export const ADD_APPLICANT = gql`
  mutation AddApplicantMutation($applicant: AplicantInputNew) {
    addApplicant(applicant: $applicant) {
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

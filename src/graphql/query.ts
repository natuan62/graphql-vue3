/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import gql from 'graphql-tag';

export const getHobby = gql`
   query getHobbyById($id: String!) {
     hobby(_id: $id) {
       _id
       name
     }
   }
`;

export const getHobbies = gql`
    query getHobbies($filters: ListHobbyInput) {
      hobbies(filters: $filters) {
        _id
        name
      }
    }
`;

export const getHobbiesWhereFilter = gql`
    query getHobbiesWhereFilter($filters: String) {
      hobbies(filters: $filters) {
        _id
        name
      }
    }
`;

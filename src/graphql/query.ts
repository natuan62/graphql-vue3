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

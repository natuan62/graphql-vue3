import gql from 'graphql-tag';

export const createHobby = gql`
    mutation createHobby($name: String!) {
        createHobby(payload: {
            name: $name
        }) {
            _id
            name
        }
    }
`;
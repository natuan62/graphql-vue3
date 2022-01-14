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

export const deleteHobby = gql`
    mutation deleteHobby($id: String!) {
        deleteHobby(_id: $id) {
            _id
            name
        }
    }
`;

export const updateHobby = gql`
    mutation updateHobby($id: String!, $name: String!) {
        updateHobby(payload: {
            _id: $id
            name: $name
        }) {
            _id
            name
        }
    }
`;
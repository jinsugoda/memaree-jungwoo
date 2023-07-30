import { gql } from '@apollo/client';

export const UpdateFirstSignInForUser = gql`
    mutation Mutation($set: UserUpdateInput!, $query: UserQueryInput) {
        updateOneUser(set: $set, query: $query) {
            firstTime
        }
    }
`;

import { gql} from '@apollo/client';


export const REMOVE_USER = gql`
mutation Mutation($set: UserUpdateInput!, $query: UserQueryInput) {
 updateOneUser(set: $set, query: $query) {
  _id
 }
}
`;

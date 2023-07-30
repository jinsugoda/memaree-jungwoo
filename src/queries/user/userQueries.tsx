import { gql } from '@apollo/client';

export const GET_USER = gql`
    query {
        userContext {
            _id
            username
            displayName
            bio
            rememberedPosts
            profilePicUrl
            firstTime
        }
    }
`;

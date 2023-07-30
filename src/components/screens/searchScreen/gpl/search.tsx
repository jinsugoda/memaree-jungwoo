import { gql } from '@apollo/client';

export const SEARCH_POSTS = gql`
    query SearchPosts($input: String!) {
        searchPosts(input: $input) {
            _id
            user {
                _id
                profilePicUrl
                username
            }
            createdAt
            content {
                caption
                imageUrls
            }
            signedUrl
        }
    }
`;

export const SEARCH_USERS = gql`
    query SearchUsers($input: String!) {
        searchUsers(input: $input) {
            _id
            firstName
            lastName
            username
            isRemembered
            profilePicUrl
        }
    }
`;

export const USERS_RECENT = gql`
query Query{
    getRecentUserSearch {
        _id
        username
        profilePicUrl
        isRemembered
        }
    }
`;
export const USERS_SUGGESTIONS = gql`
    query Query($input: SuggestedUsersInput!) {
        getMySuggestedUsers(input: $input) {
            username
            _id
            profilePicUrl
            createdAt
            isRemembered
        }
    }
`;

export const UPDATE_RECENT_SEARCH = gql`
    mutation Mutation($set: UserUpdateInput!, $query: UserQueryInput) {
        updateOneUser(set: $set, query: $query) {
            recentSearch {
                _id
                username
                profilePicUrl
            }
        }
    }
`;

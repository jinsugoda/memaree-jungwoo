import { gql } from '@apollo/client';

export const GET_CIRCLE_USERS = gql`
    query Users($query: FriendLinkQueryInput) {
        friendLinks(query: $query) {
            friendId {
                _id
                username
                profilePicUrl
                displayName
            }
        }
    }
`;

export const GET_REMEMBERED_USERS = gql`
    query Users($query: RememberedUserQueryInput) {
        rememberedUsers(query: $query) {
            friendId {
                _id
                username
                profilePicUrl
            }
        }
    }
`;

export const GET_REMEMBERING_USERS = gql`
    query Users($query: RememberedUserQueryInput) {
        rememberedUsers(query: $query) {
            userId {
                _id
                username
                profilePicUrl
            }
        }
    }
`;

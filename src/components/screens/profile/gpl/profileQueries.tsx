import { gql } from '@apollo/client';

export const USER_QUERY = gql`
    query Query($query: UserQueryInput!) {
        user(query: $query) {
            _id
            profilePicUrl
            username
            displayName
            bio
            firstName
            isFriend
            isRemembered
            friendStatus
            stats {
                rememberedByCount
                circleCount
            }
        }
    }
`;

export const REMEMBER_USER = gql`
    mutation RememberUser($input: RememberUserInput!) {
        rememberUser(input: $input) {
            status
        }
    }
`;

export const UNREMEMBER_USER = gql`
    mutation UnRememberUser($input: UnRememberUserInput!) {
        unRememberUser(input: $input) {
            status
        }
    }
`;

export const CREATE_CIRCLE_REQUEST = gql`
    mutation CreateCircleRequest($input: CreateCircleRequestInput!) {
        createCircleRequest(input: $input) {
            status
        }
    }
`;

export const CANCEL_CIRCLE_REQUEST = gql`
    mutation CancelCircleRequest($input: CancelCircleRequestInput!) {
        cancelCircleRequest(input: $input) {
            status
        }
    }
`;

export const REMOVE_USER_FROM_CIRCLE = gql`
    mutation RemoveUserFromCircle($input: RemoveUserFromCircleInput!) {
        removeUserFromCircle(input: $input) {
            status
        }
    }
`;

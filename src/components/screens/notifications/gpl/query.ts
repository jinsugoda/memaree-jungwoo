import { gql } from '@apollo/client';

export const GET_NOTIFICATIONS = gql`
    query Notifications($query: NotificationQueryInput) {
        notifications(query: $query) {
            _id
            type
            createdAt
            circle {
                _id
            }
            group {
                _id
                name
                owner {
                    _id
                }
            }
            comment {
                _id
                content {
                    caption
                    imageUrls
                }
            }
            post {
                _id
                user {
                    _id
                    createdAt
                    profilePicUrl
                    userTag
                    username
                }
                content {
                    imageUrls
                }
                createdAt
                signedUrl
            }
            fromUser {
                _id
                profilePicUrl
                userTag
                username
            }
        }
    }
`;
export const SET_NOTIFICATIONS_SEEN = gql`
    mutation Mutation($set: NotificationUpdateInput!, $query: NotificationQueryInput) {
        updateOneNotification(set: $set, query: $query) {
            _id
        }
    }
`;
export const ADD_USER_TO_CIRCLE = gql`
    mutation AddUserToCircle($input: AddUserToCircleInput!) {
        addUserToCircle(input: $input) {
            status
        }
    }
`;

export const JOIN_GROUP = gql`
    mutation AddUserToGroup($userId: String!, $groupId: String!) {
        appendToArrayIDField(
            input: { collectionName: "Group", id: $groupId, field: "users", value: $userId }
        ) {
            status
        }
    }
`;
export const JOIN_GROUP_USER = gql`
    mutation AddGroupToUser($groupId: String!, $userId: String!) {
        appendToArrayIDField(
            input: { collectionName: "User", id: $userId, field: "groups", value: $groupId }
        ) {
            status
        }
    }
`;
export const GET_NOTIFICATIONS_COUNT = gql`
    query GetEachNotificationGroupCount {
        getEachNotificationGroupCount {
            People
            Post
        }
    }
`;

export const CLEAR_NOTIFICATIONS = gql`
    mutation UpdateManyNotifications(
        $set: NotificationUpdateInput!
        $query: NotificationQueryInput
    ) {
        updateManyNotifications(set: $set, query: $query) {
            modifiedCount
        }
    }
`;

import { gql } from '@apollo/client';

export const GET_GROUP_ALL_EDIT = gql`
    query Group($query: GroupQueryInput) {
        group(query: $query) {
            name
            _id
            userCount
            users {
                _id
                username
                profilePicUrl
            }
            readOnly
            groupImage
            signedGroupImageUrl
        }
    }
`;

export const GET_GROUP = gql`
    query Query($input: GroupsUsersInput_V2) {
        getMyGroups_V2(input: $input) {
            _id
            name
            owner {
                _id
            }
            userCount
            signedGroupImageUrl
            lastActivityAt
            readOnly
        }
    }
`;

export const GET_GROUP_PREVIEW = gql`
    query Query {
        getSharableGroup {
            _id
            name
            owner {
                _id
            }
            signedGroupImageUrl
            readOnly
        }
    }
`;
export const GET_MY_GROUP = gql`
    query User($query: UserQueryInput) {
        user(query: $query) {
            group {
                _id
            }
        }
    }
`;

export const GET_GROUP_BY_NAME = gql`
    query Query($query: GroupQueryInput) {
        groups(query: $query) {
            _id
            name
            users {
                _id
                username
                profilePicUrl
            }
        }
    }
`;
// export const GET_SEARCHED_USERS = gql`
// query Query($limit: Int, $query: UserQueryInput!) {
//   users(limit: $limit, query: $query) {
//     _id
//     username
//     profilePicUrl
//     userTag
//   }
// }
// `

export const GET_GROUP_ALL = gql`
    query Group($query: GroupQueryInput) {
        group(query: $query) {
            name
            _id
            userCount
        }
    }
`;

export const GroupUsersQry = gql`
    query Group($input: GroupUsersInput) {
        groupUsers(input: $input) {
            _id
            profilePicUrl
            username
            userTag
        }
    }
`;

export const GroupPostsQry = gql`
    query GroupPosts($input: GroupPostsQueryInput) {
        groupPosts(input: $input) {
            _id
            numberOfComments
            content {
                caption
                imageUrls
            }
            createdAt
            user {
                _id
                profilePicUrl
                username
            }
            signedUrl
            originalPost {
                _id
                user {
                    _id
                    profilePicUrl
                    username
                }
                content {
                    caption
                    imageUrls
                }
                signedUrl
            }
        }
    }
`;

export const CREATE_GROUPS = gql`
    mutation Mutation($data: GroupInsertInput!) {
        insertOneGroup(data: $data) {
            _id
        }
    }
`;

export const UPDATE_GROUPS = gql`
    mutation UpdateOneGroup($set: GroupUpdateInput!, $query: GroupQueryInput) {
        updateOneGroup(set: $set, query: $query) {
            _id
        }
    }
`;

export const INVITE_USER_TO_GROUP = gql`
    mutation InviteUserToGroup($input: InviteUserToGroupInput!) {
        inviteUserToGroup(input: $input) {
            status
        }
    }
`;

export const SHARE_POST_TO_GROUPS = gql`
    mutation Mutation($set: GroupUpdateInput!, $query: GroupQueryInput) {
        updateOneGroup(set: $set, query: $query) {
            _id
        }
    }
`;
export const GET_GROUP_POSTS = gql`
    query Query($query: GroupQueryInput) {
        group(query: $query) {
            posts {
                _id
            }
        }
    }
`;

export const GET_USER_BY_NAME = gql`
    query SearchUsers($input: String!) {
        searchUsers(input: $input) {
            _id
            username
            profilePicUrl
        }
    }
`;

export const REMOVE_USER = gql`
    mutation RemoveUserFromGroup($groupId: String!, $userId: String!) {
        removeFromArrayIDField(
            input: { collectionName: "Group", id: $groupId, field: "users", value: $userId }
        ) {
            status
        }
    }
`;

export const JOIN_GROUP = gql`
    mutation AddUserToGroup($userId: String!, $groupId: String!) {
        appendToArrayIDField(
            input: { collectionName: "User", id: $userId, field: "groups", value: $groupId }
        ) {
            status
        }
    }
`;

export const ADD_POST = gql`
    mutation AddPostToGroups($input: AddPostToGroupsInput) {
        addPostToGroups(input: $input) {
            status
        }
    }
`;

export const SEARCH_GROUP = gql`
    query searchSharableGroup($input: String!) {
        searchSharableGroup(input: $input) {
            _id
            name
            lastActivityAt
            groupImage
            signedGroupImageUrl
        }
    }
`;

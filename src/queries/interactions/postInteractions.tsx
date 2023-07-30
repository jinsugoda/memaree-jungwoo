import { gql } from '@apollo/client';

export const REMEMBER_POST = gql`
    mutation AddPostToRememberedPosts($userId: String!, $postId: String!) {
        appendToArrayIDField(
            input: { collectionName: "User", id: $userId, field: "rememberedPosts", value: $postId }
        ) {
            status
        }
    }
`;

export const UNREMEMBER_POST = gql`
    mutation RemovePostFromUser($userId: String!, $postId: String!) {
        removeFromArrayIDField(
            input: { collectionName: "User", id: $userId, field: "rememberedPosts", value: $postId }
        ) {
            status
        }
    }
`;

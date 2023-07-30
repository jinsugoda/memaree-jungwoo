import { gql } from '@apollo/client';

const GET_POSTS_QUERY_BY_TYPE = gql`
    query Posts($feedType: String!, $isFlipped: Boolean!, $filters: [String!]) {
        posts(feedType: $feedType, isFlipped: $isFlipped, filters: $filters) {
            postId
            user {
                userId
                username
                profilePicUrl
            }
            createdAt
            updatedAt
            deletedAt
            interactions {
                isLiked
                likeCount
                isRemembered
                rememberCount
                replyPreviews {
                    commentId
                    isLiked
                    content {
                        ... on CaptionContent {
                            caption
                            title
                        }
                    }
                }
                likedBy
            }
            content {
                ... on MediaContent {
                    urls
                    caption
                    title
                }
                ... on CaptionContent {
                    urls
                    caption
                    title
                }
            }
        }
    }
`;
export const FEED_QUERY = gql`
    query FeedQuery($take: Int, $skip: Int, $orderBy: LinkOrderByInput) {
        posts(take: $take, skip: $skip, orderBy: $orderBy) {
            id
            title
            content
            user {
                id
                name
                email
            }
            img
            count
        }
    }
`;

export const CREATE_POST = gql`
    mutation CreatePost($userId: String!, $type: String!, $content: PostContentInput!) {
        createPost(userId: $userId, type: $type, content: $content) {
            post {
                postId
                user {
                    userId
                    username
                    profilePicUrl
                }
                content {
                    ... on MediaContent {
                        urls
                        caption
                        title
                    }
                    ... on CaptionContent {
                        urls
                        caption
                        title
                    }
                }
            }
        }
    }
`;

// Create dummy data to mimic the feeds...

export default GET_POSTS_QUERY_BY_TYPE;
// export default FEED_QUERY;

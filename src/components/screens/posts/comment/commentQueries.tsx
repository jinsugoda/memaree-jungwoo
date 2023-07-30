import { gql } from '@apollo/client';

export const GETCOMMENTSUBCOMMENTS = gql`
    query GETCOMMENTSUBCOMMENTS($query: CommentQueryInput) {
        comment(query: $query) {
            subComments {
                _id
                content {
                    _id
                    caption
                    imageUrls
                }
                user {
                    _id
                    username
                    profilePicUrl
                }
                subComments {
                    _id
                }
            }
            _id
        }
    }
`;

export const GETPOSTCOMMMENTS = gql`
    query GETPOSTCOMMENTS($query: PostQueryInput, $input: PostCommentsInput) {
        post(query: $query) {
            comments(input: $input) {
                _id
                content {
                    caption
                    imageUrls
                }
                user {
                    _id
                    username
                    profilePicUrl
                }
                subComments {
                    _id
                    content {
                        caption
                        imageUrls
                    }
                    user {
                        _id
                        username
                        profilePicUrl
                    }
                }
            }
        }
    }
`;

export const CREATE_COMMENT = gql`
    mutation InsertOneComment($data: CommentInsertInput!) {
        insertOneComment(data: $data) {
            _id
            content {
                caption
                imageUrls
            }
        }
    }
`;

export const ADD_TOP_LEVEL_COMMENT_TO_POST = gql`
    mutation AddNewCommentToPost($postId: String!, $newCommentId: String!) {
        appendToArrayIDField(
            input: { collectionName: "Post", id: $postId, field: "comments", value: $newCommentId }
        ) {
            status
        }
    }
`;

export const ADD_COMMENT_AS_SUBCOMMENT = gql`
    mutation AddNewCommentToPost($parentCommentId: String!, $newCommentId: String!) {
        appendToArrayIDField(
            input: {
                collectionName: "Comments"
                id: $parentCommentId
                field: "subComments"
                value: $newCommentId
            }
        ) {
            status
        }
    }
`;

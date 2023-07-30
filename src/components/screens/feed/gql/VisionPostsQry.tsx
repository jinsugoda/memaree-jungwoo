import { gql } from '@apollo/client';

export const VisionPostsQry = gql`
    query VisionPosts($input: VisionPostsInput, $commentsInput2: PostCommentsInput) {
        visionPosts(input: $input) {
            _id
            comments(input: $commentsInput2) {
                _id
                content {
                    caption
                    imageUrls
                }
            }
            numberOfComments
            content {
                caption
                imageUrls
            }
            createdAt
            likeCount
            user {
                _id
                profilePicUrl
                username
            }
            isSharedToVision
            signedUrl
        }
    }
`;

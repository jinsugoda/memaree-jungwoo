import { gql } from '@apollo/client';

export const CircleAndVisionFlipsidePostsQry = gql`
    query CircleAndVisionFlipsidePosts(
        $input: CircleAndVisionFlipsidePostsInput
        $commentsInput2: PostCommentsInput
    ) {
        getCircleAndVisionFlipsidePosts(input: $input) {
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

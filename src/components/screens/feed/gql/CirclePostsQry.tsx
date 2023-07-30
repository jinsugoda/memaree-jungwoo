import { gql } from '@apollo/client';

export const CirclePostsQry = gql`
    query CirclePosts($input: CirclePostsInput) {
        circlePosts(input: $input) {
            _id
            # comments(input: $commentsInput2) {
            #   _id
            #   content {
            #     caption
            #     imageUrls
            #   }
            # }
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

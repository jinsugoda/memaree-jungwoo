import { gql } from '@apollo/client';

export const CirclePostsForProfileQry = gql`
    query CirclePostsForProfile($input: CirclePostsForProfileInput) {
        circlePostsForProfile(input: $input) {
            _id
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

export const VisionPostsForProfileQry = gql`
    query VisionPostsForProfile($input: VisionPostsForProfileInput) {
        visionPostsForProfile(input: $input) {
            _id
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

/*
query = CirclePostsForProfileQry;
initialVariables = {
    input: {
        limit: POST_LIMIT,
        userId: profile._id,
    },
};

query = VisionPostsForProfileQry;
initialVariables = {
    input: {
        limit: POST_LIMIT,
        userId: profile._id,
    },
};
*/

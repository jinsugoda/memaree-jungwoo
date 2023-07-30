import { gql } from '@apollo/client';

export const MemareeFlipsidePostsQry = gql`
    query GetMemareeFlipsidePosts($input: GetMemareeFlipsidePostsQueryInput) {
        getMemareeFlipsidePosts(input: $input) {
            _id
            user {
                _id
                username
                profilePicUrl
            }
            content {
                caption
                imageUrls
            }
            numberOfComments
            createdAt
            isSharedToVision
            signedUrl
        }
    }
`;

import { gql } from '@apollo/client';

export const MemareePostsQry = gql`
    query GetPosts($input: GetPostsQueryInput) {
        getPosts(input: $input) {
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
            createdAt
            numberOfComments
            isSharedToVision
            signedUrl
            # comments(limit: 10) {
            #   _id
            #   content {
            #       caption
            #       imageUrls
            #   }
            #   user {
            #       _id
            #       profilePicUrl
            #       username
            #   }
            # }
        }
    }
`;

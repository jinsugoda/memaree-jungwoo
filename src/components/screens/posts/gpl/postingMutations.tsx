import { gql } from '@apollo/client';

// filters: Change this to 'tags' if that's what your schema expects
// filters: ["sga"],

export const CREATE_POST = gql`
    mutation AddPost(
        $userId: ObjectId!
        $imageUrls: [String!]!
        $caption: String!
        $createdAt: DateTime!
        $isSharedToCircle: Boolean!
        $isSharedToVision: Boolean!
        $lat: Float!
        $lon: Float!
    ) {
        insertOnePost(
            data: {
                user: { link: $userId }
                content: { imageUrls: $imageUrls, caption: $caption }
                createdAt: $createdAt
                isSharedToCircle: $isSharedToCircle
                isSharedToVision: $isSharedToVision
                lat: $lat
                lon: $lon
                removed: false
            }
        ) {
            _id
            createdAt
            deletedAt
            feedType
            likeCount
            lat
            lon
            updatedAt
            user {
                _id
                username
                profilePicUrl
            }
        }
    }
`;

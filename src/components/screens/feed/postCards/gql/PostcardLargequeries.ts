import { gql } from "@apollo/client";

export const GET_TOP_COMMENTS = gql`
    query GET_TOP_COMMENTS($query: PostQueryInput, $input: PostCommentsInput) {
        post(query: $query) {
            numberOfComments
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
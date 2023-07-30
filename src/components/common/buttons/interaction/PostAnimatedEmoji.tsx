import AnimatedEmoji from './AnimatedEmoji';
import React from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
export const getPostReactions = gql`
    query Reaction($query: ReactionQueryInput) {
        reaction(query: $query) {
            reaction
        }
    }
`;

const UPDATE_REACTION = gql`
    mutation updateReaction($input: UpdateReactionInput) {
        updateReaction(input: $input) {
            reaction
        }
    }
`;
interface PostAnimatedEmoji {
    postId: string;
    userID: string;
}

const PostAnimatedEmoji = (props: PostAnimatedEmoji) => {
    const [emojiText, setEmojiText] = React.useState<string>(null);

    const [updateReaction, { loading }] = useMutation(UPDATE_REACTION, {
        onCompleted: (data) => {
            console.log('JUST UPDATED REACTION', data);
        },
        onError: (error) => {
            console.log('JUST FAILED TO UPDATE', error);
        },
    });

    const { data } = useQuery(getPostReactions, {
        variables: {
            query: {
                post: {
                    _id: props.postId,
                },
                user: {
                    _id: props.userID,
                },
            },
        },
        skip: !props?.postId || !props?.userID,
        fetchPolicy: 'network-only',
        onCompleted: (data) => {
            // console.log('Postanimated emoji', data);
            console.log(
                'Postanimated emoji',
                props.postId,
                props.userID,
                data?.reaction?.reaction,
                data?.reaction?._id,
            );
            if (data?.reaction == 'None found') {
                // console.log('No reaction found');
                setEmojiText(null);
            } else if (data?.reaction?.reaction) {
                // console.log('Valid reaction value, setting reaction: ', data?.reaction);
                console.log('type', data?.reaction?.reaction, typeof data?.reaction?.reaction);
                if (data?.reaction?.reaction === '{}') {
                    setEmojiText(null);
                } else {
                    setEmojiText(data?.reaction?.reaction || null);
                }
            } else {
                // console.log('invalid reaction value: ', data?.reaction, data);
            }
        },
        onError: (err) => {
            console.log('err111', err);
        },
    });
    return (
        <AnimatedEmoji
            size={24}
            value={emojiText}
            onSelected={(value) => {
                if (!loading) {
                    setEmojiText(value);
                    updateReaction({
                        variables: { input: { postId: props.postId, reaction: value } },
                    });
                }
            }}
        />
    );
};

export default PostAnimatedEmoji;

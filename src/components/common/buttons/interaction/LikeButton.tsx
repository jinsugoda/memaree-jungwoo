import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';

// types
import { CustomTheme } from 'styles/theme/customThemeProps';

// 3rd party hooks
import { useTheme } from 'react-native-paper';
import { gql, useMutation } from '@apollo/client';

// custom components
import { ActionButton } from '/types/Button';

const LikeButton = (props: ActionButton) => {
    const [ButtonSwitch, setButtonSwitch] = useState(props?.selected);
    const inverted = props?.inverted;

    const { colors }: CustomTheme = useTheme();

    const LIKE_POST1 = gql`
        mutation LikePost($postId: ID!, $_id: ID!) {
            likePost(postId: $postId, _id: $_id) {
                isCompleted
            }
        }
    `;

    const LIKE_POST = gql`
        mutation LikePost($_id: String!, $postId: String!) {
            likePost(_id: $_id, postId: $postId) {
                isCompleted
            }
        }
    `;

    const [toggleLike, { data, loading, error }] = useMutation(LIKE_POST);

    const switchButton = async () => {
        //Update selected in server
        setButtonSwitch(!ButtonSwitch);
        // try {props?.Action(!ButtonSwitch)} catch (error) {console.log(error)}
        // setButtonSwitch(!ButtonSwitch);

        // const result = await toggleLike({
        //   variables: {
        //     postId: '5f9f1b0b0e1c4c0017e1b0b5',
        //     _id: 'edafafasfaaf',
        //   },
        // });

        // if (loading) return 'Submitting...';
        // if (error) return `Submission error! ${error.message}`;
    };

    return (
        <TouchableOpacity onPress={() => switchButton()}>
            {/* {ButtonSwitch ? <Ionicons name="heart" size={props?.size} color={colors.secondary} /> : (inverted ? <Ionicons name="heart-outline" size={props?.size} color={colors.secondary} /> : <Ionicons name="heart-outline" size={props?.size} color={colors.primary} />)} */}
            {/* {ButtonSwitch ? <LikeIcon fill1={colors.secondary} fill2={colors.background} /> : <LikeIcon fill1={colors.background} fill2={colors.primary} />} */}
            {/* <LikeIcon fill1={colors.background} fill2={colors.primary} /> */}
        </TouchableOpacity>
    );
};

export default LikeButton;

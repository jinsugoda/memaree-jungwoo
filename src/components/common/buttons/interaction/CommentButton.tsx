import React from 'react';
import { TouchableOpacity } from 'react-native';

// types
import { RootStackParamList } from 'types/Screens';
import { StackNavigationProp } from '@react-navigation/stack';

// 3rd party hooks
import { useNavigation } from '@react-navigation/native';

//Button assets
import CommentButtonSVG from 'assets/buttonIcons/interactions/CommentIcon.svg';

const CommentButton = (props: { size: number; postId: string }) => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    return (
        // enable replies is hard coded for now, need to be passed from post data from servers and is up to the poster
        <TouchableOpacity
            onPress={() =>
                navigation.navigate('CommentScreen', {
                    parentType: 'post',
                    parentId: props?.postId,
                    enableReplies: true,
                })
            }
        >
            <CommentButtonSVG
                width={props?.size}
                height={props?.size}
                fill="white"
                stroke={'white'}
                strokeWidth={1}
                style={{ paddingHorizontal: 23 }}
            />
        </TouchableOpacity>
    );
};

export default CommentButton;

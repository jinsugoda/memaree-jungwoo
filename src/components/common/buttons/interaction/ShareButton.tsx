import React from 'react';
import { TouchableOpacity } from 'react-native';

// svg icon
import ShareButtonSVG from 'assets/buttonIcons/interactions/ShareIcon.svg';

const ShareButton = (props: {
    size: number;
    postId: string;
    openSharePostBottomSheet: (postId: string) => void;
}) => {
    return (
        // enable replies is hard coded for now, need to be passed from post data from servers and is up to the poster
        <TouchableOpacity onPress={() => props?.openSharePostBottomSheet(props?.postId)}>
            <ShareButtonSVG
                width={props?.size}
                height={props?.size}
                fill="white"
                style={{ paddingStart: 30 }}
            />
        </TouchableOpacity>
    );
};

export default ShareButton;

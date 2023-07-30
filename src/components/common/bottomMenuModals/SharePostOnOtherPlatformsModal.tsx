import React from 'react';
import { Alert, Share, Pressable, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome/index';

// styles
import { BottomMenusStyles } from './style';

// type SharePostProps = {
//     item: NamedItem
// }

const SharePost = (props) => {
    const sharePost = async () => {
        try {
            const result = await Share.share({
                title: 'From Memaree',
                url: `${props?.item?.postUrl}`,
                message: `From Memaree: ${props?.item?.postUrl}`,
            });
        } catch (error: any) {
            Alert.alert(error?.message);
        }
    };
    return (
        <Pressable onPress={() => sharePost()}>
            <View style={BottomMenusStyles.container}>
                <FontAwesomeIcon icon="up-right-from-square" size={BottomMenusStyles.iconSize} />
            </View>
        </Pressable>
    );
};

export default SharePost;

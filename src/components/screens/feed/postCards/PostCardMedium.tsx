import React, { useState } from 'react';
import { Image, View, Text, Pressable } from 'react-native';
import { Divider } from '@rneui/themed';
import { TouchableOpacity } from 'react-native-gesture-handler';

// types
import { Post } from 'types/DataModels';
import { MasonryListRenderItemInfo } from '@shopify/flash-list/dist/MasonryFlashList';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from 'types/Screens';
import { CustomTheme } from 'styles/theme/customThemeProps';

// 3rd party hooks
import { useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

// utils
import { ShorttenText } from 'utils/customFormatters';

// custom components
import GradientAvatar from 'components/common/avatars/single/GradientAvatar';
import PostInteractionButtons from 'components/common/buttonGroups/PostInteractionButtons';
import MemareeText from 'components/common/textAndInputs/MemareeText';

// styles
import { PostcardStyles } from 'styles';
import { divider } from 'styles/stylesheets/dividerStyles';
import { ImageRotationFix } from 'styles/stylesheets/imagesStyles';

// icons svgs
import MemareeButton from 'assets/generalSVGs/MemareeButton.svg';
import { Ionicons } from '@expo/vector-icons';
import RoundedImage from 'components/common/images/RoundedImage';

interface PostCardMediumProps extends MasonryListRenderItemInfo<Post> {
    openPostOptionsBottomSheet: (posterId: string, postId: string) => void;
    openSharePostBottomSheet: (postId: string) => void;
}

const PostCardMedium = (props: PostCardMediumProps) => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const { colors }: CustomTheme = useTheme();
    const [aspectRatio, setAspectRatio] = useState(0.7);
    const post = props.item;
    const size = 30;
    let uri = '';

    if (post.content.imageUrls.length === 1) {
        Image.getSize(post.content.imageUrls[0], (width, height) => setAspectRatio(width / height));
        uri = post.content.imageUrls[0];
    }

    return props.index === 0 ? (
        <View style={{ justifyContent: 'center', alignItems: 'center', height: 150 }}>
            <MemareeButton width={80} height={80} />
        </View>
    ) : (
        <View style={[{ flex: 1 }]}>
            <Pressable onPress={() => navigation.navigate('ViewPostScreen', { post: post })}>
                <View style={PostcardStyles.experienceTopBar}>
                    {/* <Avatar size={24} source={{uri: post.user.profilePicUrl}} rounded /> */}
                    <GradientAvatar size={24} source={post?.user?.profilePicUrl ?? 'DEFAULT'} />
                    <MemareeText style={[PostcardStyles.experienceText, { color: colors.text }]}>
                        {ShorttenText(post.user.username, 10)}
                    </MemareeText>
                    <TouchableOpacity>
                        <Ionicons
                            name="ellipsis-horizontal"
                            onPress={() =>
                                props.openPostOptionsBottomSheet(post.user._id, post._id)
                            }
                            style={{ paddingRight: PostcardStyles.ELLIPSIS_HORIZONTAL_ICON_SIZE }}
                            size={18}
                        />
                    </TouchableOpacity>
                </View>
                <RoundedImage
                    // post={{_id: post._id, imageBase64: post.content.imageUrls[0]}}
                    // post={{_id: post._id}}
                    uri={post.signedUrl}
                    cacheKey={post.content.imageUrls[0]}
                    imageStyle={PostcardStyles.visionImage}
                    aspectRatio={1}
                    // aspectRatio={aspectRatio}
                    // aspectRatio={1}
                    borderRadius={16}
                />
                {/* <Image
          source={{ uri: post.content.base64Image }}
          style={[PostcardStyles.experienceImage, { aspectRatio: aspectRatio }, ImageRotationFix]}
          resizeMode="cover"
          onError={(error) => console.log('postcardmedium - image err', error.nativeEvent)}
        /> */}
            </Pressable>
            <View style={[PostcardStyles.experienceBottomBar, { alignItems: 'center' }]}>
                {/* The size has to be modular here for Postcard to work with vision and experience later */}
                <PostInteractionButtons
                    size={size}
                    post={post}
                    openSharePostBottomSheet={props.openSharePostBottomSheet}
                />
            </View>
            <Divider style={divider} />
        </View>
    );
};

export default PostCardMedium;

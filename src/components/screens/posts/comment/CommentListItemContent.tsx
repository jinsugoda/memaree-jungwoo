import React from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { ListItem } from '@rneui/themed';

// types
import { CommentData } from 'types/DataModels';
import { CustomTheme } from 'styles/theme/customThemeProps';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from 'types/Screens';

// 3rd party hooks
import { useSelector } from 'react-redux';
import { useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

// redux
import { selectUserId } from 'store/slices/userSlice';

// custom components
import GradientAvatar from 'components/common/avatars/single/GradientAvatar';
import MemareeText from 'components/common/textAndInputs/MemareeText';

// styles
import { CommentStyles } from 'styles';

interface commentProps extends CommentData {
    enableReply: boolean;
    ReplyToComment?: () => void;
}

const CommentListItemContent = (props: commentProps) => {
    const screenWidth = Dimensions.get('window').width;
    const ptValue = screenWidth * 0.7;
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const userId = useSelector(selectUserId);
    const { colors }: CustomTheme = useTheme();
    // console.log("comment list item")
    // console.log(props?.user)
    return (
        <ListItem.Content style={{}}>
            <View style={[CommentStyles.topRow]}>
                <TouchableOpacity
                    onPress={() => () => {
                        if (userId === props?.user?._id) {
                            navigation.navigate('SelfProfileScreen');
                        } else {
                            navigation.navigate('OtherProfileScreen', { id: props?.user?._id });
                        }
                    }}
                >
                    <View style={[CommentStyles.avatarContainer]}>
                        <GradientAvatar
                            source={props?.user?.profilePicUrl ?? 'DEFAULT'}
                            size={CommentStyles.avatarSize}
                            style={CommentStyles.avatarContainer}
                        />
                    </View>
                </TouchableOpacity>
                <View>
                    <MemareeText style={{ color: colors.text }}>
                        {props?.user?.username}
                    </MemareeText>
                    <MemareeText
                        style={{
                            width: ptValue,
                            color: colors.text,
                            marginTop: 10,
                            fontFamily: 'Outfit',
                        }}
                    >
                        {props?.content.caption}
                    </MemareeText>
                    <View style={[CommentStyles.footer]}>
                        {props?.enableReply && (
                            <TouchableOpacity
                                onPress={() => {
                                    props?.ReplyToComment();
                                }}
                            >
                                <MemareeText
                                    style={{ color: colors.tertiary, fontFamily: 'Outfit' }}
                                >
                                    reply
                                </MemareeText>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </View>
            {/* <ListItem.Subtitle
                style={[CommentStyles.subtitle, { color: colors.text }]}
                ellipsizeMode="tail"
                numberOfLines={undefined}
            ></ListItem.Subtitle> */}
        </ListItem.Content>
    );
};

export default CommentListItemContent;

import React, { useState } from 'react';
import { View } from 'react-native';
import { ListItem } from '@rneui/base';
import { TouchableOpacity } from 'react-native-gesture-handler';

// types
import { ListRenderItemInfo } from '@shopify/flash-list';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from 'types/Screens';
import { CommentData } from 'types/DataModels';

// 3rd party hooks
import { useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

// custom component
import CommentListItemContent from './CommentListItemContent';
import MemareeText from 'components/common/textAndInputs/MemareeText';

// types
import { CustomTheme } from 'styles/theme/customThemeProps';

// styles
import { CommentStyles } from 'styles';

interface commentThreadProps extends ListRenderItemInfo<CommentData> {
    enableReplies: boolean;
    ReplyToComment: (index: number, commentId: string) => void;
}

const CommentThread = (props: commentThreadProps) => {
    const { colors }: CustomTheme = useTheme();
    const [showReplies, setShowReplies] = useState<boolean>(true);
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    return (
        <ListItem.Accordion
            noIcon={true}
            containerStyle={[CommentStyles.commentListItem, { backgroundColor: colors.background }]}
            isExpanded={showReplies}
            content={
                <View
                    style={[
                        CommentStyles.listItemContent,
                        { paddingTop: props?.index === 0 ? 30 : 0, paddingBottom: 20 },
                    ]}
                >
                    <CommentListItemContent
                        {...props?.item}
                        ReplyToComment={() => props?.ReplyToComment(props?.index, props?.item?._id)}
                        enableReply={props?.enableReplies}
                    />
                    {props?.item?.subComments?.length > 0 &&
                        (showReplies ? (
                            <TouchableOpacity
                                onPress={() => {
                                    setShowReplies(false);
                                }}
                            >
                                <MemareeText
                                    style={[
                                        CommentStyles.clickableText,
                                        { color: colors.tertiary, fontFamily: 'Outfit' },
                                    ]}
                                >
                                    Hide {props?.item?.subComments?.length} Replies
                                </MemareeText>
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity
                                onPress={() => {
                                    setShowReplies(true);
                                }}
                                style={{ paddingBottom: 30 }}
                            >
                                <MemareeText
                                    style={[
                                        CommentStyles.clickableText,
                                        { color: colors.tertiary, fontFamily: 'Outfit' },
                                    ]}
                                >
                                    View {props?.item?.subComments?.length} Replies
                                </MemareeText>
                            </TouchableOpacity>
                        ))}
                </View>
            }
        >
            <View style={CommentStyles.subCommentsContainer}>
                {props?.item?.subComments?.length !== 0 &&
                    props?.item?.subComments?.slice(0, 5).map((l, i) => (
                        <ListItem
                            key={`${l._id}/${i}-CommentListItemContent`}
                            containerStyle={[
                                CommentStyles.commentListItem,
                                { backgroundColor: colors.background },
                            ]}
                        >
                            <CommentListItemContent {...l} enableReply={false} />
                        </ListItem>
                    ))}
                {props?.item?.subComments?.length >= 5 && (
                    <TouchableOpacity
                        onPress={() =>
                            navigation.push('CommentScreen', {
                                parentType: 'comment',
                                parentId: props?.item?._id,
                                enableReplies: false,
                            })
                        }
                    >
                        <MemareeText
                            style={[CommentStyles.clickableText, { color: colors.tertiary }]}
                        >
                            Show All Replies
                        </MemareeText>
                    </TouchableOpacity>
                )}
            </View>
        </ListItem.Accordion>
    );
};

export default CommentThread;

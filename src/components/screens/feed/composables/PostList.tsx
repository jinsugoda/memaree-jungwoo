import React, { ReactElement, ReactNode, useState, useRef } from 'react';
import {
    ActivityIndicator,
    RefreshControl,
    View,
    useWindowDimensions,
    FlatList,
} from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { Divider } from '@rneui/base';

// types
import { Post } from 'types/DataModels';
import { MasonryListRenderItemInfo } from '@shopify/flash-list';
import { CustomTheme } from 'styles/theme/customThemeProps';

// custom components - post card
import PostCardLarge from '../postCards/PostCardLarge';
import PostCardMedium from '../postCards/PostCardMedium';
import PostCardSmall from '../postCards/PostCardSmall';
import MemareeText from 'components/common/textAndInputs/MemareeText';

// 3rd party hooks
import { useTheme } from 'react-native-paper';

// styles
import { FeedComponentWrapper } from '../../../../styles/FeedScreenStyles';
import { useIsFocused } from '@react-navigation/native';

export type FeedComponentProps = {
    columnCount: number;
    emptyComponent: ReactNode;
    posts: Post[];
    loading: boolean;
    error: string;
    openPostOptionsBottomSheet?: (posterId: string, postId: string) => void;
    openSharePostBottomSheet?: (postId: string) => void;
    onFetchMore: () => void;
    onRefetch: () => void;
    onScroll?: (e) => void;
    LiveOnScroll?: (e) => void;
    feedType?: string;
    inGroup?: boolean;
    contentContainerStyle?: object;
};

interface PostCardProps extends MasonryListRenderItemInfo<Post> {
    openPostOptionsBottomSheet: (posterId: string, postId: string) => void;
    openSharePostBottomSheet: (postId: string) => void;
    post: Post;
}

const ON_END_REACHED_THRESHOLD = 0.5333333333333333;
const ON_END_REACHED_THRESHOLD_SINGLE_COLUMN = 10;

const PostList = ({
    columnCount,
    posts,
    emptyComponent,
    loading,
    error,
    openPostOptionsBottomSheet,
    openSharePostBottomSheet,
    onFetchMore,
    onRefetch,
    onScroll,
    LiveOnScroll,
    feedType,
    inGroup,
    contentContainerStyle,
}: FeedComponentProps): ReactElement => {
    const { colors }: CustomTheme = useTheme();
    const { height } = useWindowDimensions();
    const [viewableItemIndex, setViewableItemIndex] = useState(0);

    const DRAW_DISTANCE_SINGLE_COLUMN = 4 * height;
    const DRAW_DISTANCE_TRIPLE_COLUMN = height;

    const isFocused = useIsFocused();

    const viewabilityConfig = {
        itemVisiblePercentThreshold: 51,
        minimumViewTime: 200,
    };
    const onViewableItemsChanged = (props) => {
        setViewableItemIndex(props.viewableItems[0]?.index);
    };

    const viewabilityConfigCallbackPairs = useRef([{ viewabilityConfig, onViewableItemsChanged }]);

    const RenderItem = (renderItemProps) => {
        switch (columnCount) {
            case 1:
                return (
                    <PostCardLarge
                        {...renderItemProps}
                        openPostOptionsBottomSheet={openPostOptionsBottomSheet}
                        openSharePostBottomSheet={openSharePostBottomSheet}
                        inGroup={inGroup}
                        visible={renderItemProps.index == viewableItemIndex}
                        isFocused={isFocused}
                    />
                );
            case 2:
                return (
                    <PostCardMedium
                        {...renderItemProps}
                        openPostOptionsBottomSheet={openPostOptionsBottomSheet}
                        openSharePostBottomSheet={openSharePostBottomSheet}
                    />
                );
            case 3:
                return (
                    <PostCardSmall
                        {...renderItemProps}
                        openPostOptionsBottomSheet={openPostOptionsBottomSheet}
                        openSharePostBottomSheet={openSharePostBottomSheet}
                    />
                );
            default:
                return (
                    <PostCardSmall
                        {...renderItemProps}
                        openPostOptionsBottomSheet={openPostOptionsBottomSheet}
                        openSharePostBottomSheet={openSharePostBottomSheet}
                    />
                );
        }
    };

    let content: ReactNode;

    if (loading) {
        content = <ActivityIndicator />;
    } else if (error) {
        content = <MemareeText style={{ color: colors.text }}>"ERROR!!!" {error}</MemareeText>;
    } else if (!posts?.length) {
        content = <View style={{ width: '92%', height: '100%' }}>{emptyComponent}</View>;
    } else {
        content = (
            <View style={{ width: '100%', height: '100%' }}>
                {columnCount === 1 ? (
                    <FlatList
                        contentContainerStyle={contentContainerStyle}
                        renderItem={RenderItem}
                        data={posts}
                        // drawDistance={DRAW_DISTANCE_SINGLE_COLUMN}
                        keyExtractor={(item) => item?._id}
                        numColumns={columnCount}
                        onScrollEndDrag={onScroll}
                        onScroll={LiveOnScroll}
                        // estimatedItemSize={1100}
                        ItemSeparatorComponent={() => (
                            <Divider color="#2F2F2F" orientation="horizontal" width={1} />
                        )}
                        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs?.current}
                        onEndReached={onFetchMore}
                        onEndReachedThreshold={ON_END_REACHED_THRESHOLD_SINGLE_COLUMN}
                        refreshControl={
                            <RefreshControl refreshing={loading} onRefresh={onRefetch} />
                        }
                    />
                ) : (
                    <FlashList
                        contentContainerStyle={contentContainerStyle}
                        data={posts}
                        keyExtractor={(item) => item?._id}
                        drawDistance={DRAW_DISTANCE_TRIPLE_COLUMN}
                        numColumns={columnCount}
                        renderItem={RenderItem}
                        onScrollEndDrag={onScroll}
                        onScroll={LiveOnScroll}
                        onEndReached={onFetchMore}
                        onEndReachedThreshold={ON_END_REACHED_THRESHOLD}
                        estimatedItemSize={300}
                        refreshControl={
                            <RefreshControl refreshing={loading} onRefresh={onRefetch} />
                        }
                    />
                )}
            </View>
        );
    }

    return <View style={[FeedComponentWrapper]}>{content}</View>;
};

export default PostList;

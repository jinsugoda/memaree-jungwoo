import React from 'react';
import { ListItem } from '@rneui/base';
import { ListRenderItemInfo } from '@shopify/flash-list';

// types
import { CommentData } from 'types/DataModels';

// custom components
import CommentListItemContent from './CommentListItemContent';

// styles
import { CommentStyles } from 'styles';

interface CommentListItemProps extends ListRenderItemInfo<CommentData> {
    ReplyToComment?: () => void;
}

// unused for now, could definitely be used later
const CommentListItem = (props: CommentListItemProps) => {
    return (
        <ListItem containerStyle={CommentStyles.commentListItem}>
            <CommentListItemContent {...props?.item} enableReply={false} />
        </ListItem>
    );
};

export default CommentListItem;

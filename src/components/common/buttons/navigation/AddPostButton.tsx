import React from 'react';
import { Pressable } from 'react-native';

// custom components
import CreatePostNavigationButton from './CreatePostNavigationButton';

// styles
import { PostingStyles } from 'styles';

const AddPostButton = ({ onPress, size }) => {
    return (
        <Pressable style={PostingStyles.addButton} onPress={onPress}>
            <CreatePostNavigationButton size={size ?? 38} />
        </Pressable>
    );
};

export default AddPostButton;

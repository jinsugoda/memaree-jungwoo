import React from 'react';
import { View } from 'react-native';

// types
import { CustomTheme } from 'styles/theme/customThemeProps';

// 3rd party hooks
import { useTheme } from 'react-native-paper';

// svg icons
import CreatePostButtonSVG from 'assets/buttonIcons/home/CreatePost.svg';

const CreatePostNavigationButton = ({ size }) => {
    const { colors }: CustomTheme = useTheme();

    return (
        <View style={{ paddingTop: 8 }}>
            <CreatePostButtonSVG
                color="white"
                fill={colors.background}
                strokeWidth={1}
                width={size}
                height={size}
            />
        </View>
    );
};

export default CreatePostNavigationButton;

import React, { useEffect, useState } from 'react';
import { View } from 'react-native';

// types
import { CustomTheme } from 'styles/theme/customThemeProps';

// 3rd party hooks
import { useTheme } from 'react-native-paper';

// styles
import { ButtonStyles } from 'styles';

const TopTabNavigationButton = (props: { icon?: any; focused?: any; size?: any }) => {
    const { colors }: CustomTheme = useTheme();
    const { focused, size } = props;
    const [buttonColor, setButtonColor] = useState<string>(focused ? colors.tertiary : 'white');

    useEffect(() => {
        setButtonColor(focused ? colors.tertiary : 'white');
    }, [focused]);

    return (
        <View
            style={[
                ButtonStyles.containerNavigationButton,
                // ButtonStyles.selectedNavigationBorderBotWidth,
                { borderColor: focused ? colors.tertiary : colors.background },
            ]}
        >
            <props.icon fill={buttonColor} width={size} height={size} />
        </View>
    );
};
export default TopTabNavigationButton;

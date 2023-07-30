import React from 'react';
import { Pressable } from 'react-native';

// types
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from 'types/Screens';
import { CustomTheme } from 'styles/theme/customThemeProps';

// 3rd party hooks
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'react-native-paper';

// styles
import { ButtonStyles } from 'styles';

// icons
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons/faChevronLeft';

/**
 * AuthProps: accepts number for handling auth count
 */
interface BackButtonProps {
    // someVariable: number
    currentGroupId?: string;
}

/**
 * Main auth function component responsible for handing
 * @param props
 * @constructor
 */
const BackButton = (props: BackButtonProps) => {
    const { colors }: CustomTheme = useTheme();
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const onPress = () => {
        console.log('go back');
        console.log('history', JSON.stringify(navigation.getState().history));
        navigation.goBack();
    };
    return (
        <Pressable onPress={onPress} style={{ padding: 15 }}>
            <FontAwesomeIcon
                style={{ ...ButtonStyles.backButtonIcon }}
                icon={faChevronLeft}
                size={ButtonStyles.backButtonSize}
                color={colors.text}
            />
        </Pressable>
    );
};

export { BackButton };

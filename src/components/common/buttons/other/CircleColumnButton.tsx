import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

// types
import { RootStackParamList } from 'types/Screens';
import { StackNavigationProp } from '@react-navigation/stack';
import { CustomTheme } from 'styles/theme/customThemeProps';

// 3rd party hooks
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'react-native-paper';

// custom components
import MemareeText from 'components/common/textAndInputs/MemareeText';

// styles
import { ButtonStyles, CircleStyles } from 'styles';

// icons
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

interface CircleColumnButtonProps {
    screenTitle: string;
    navigationDestination: string;
    circleType: string;
    text: string | React.ReactChild | React.ReactFragment | React.ReactPortal;
}

const CircleColumnButton = (props: CircleColumnButtonProps) => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const { colors }: CustomTheme = useTheme();
    return (
        <TouchableOpacity
            style={CircleStyles.circleNavigationColumn}
            onPress={() =>
                navigation.navigate('CircleUserListScreen', {
                    circleType: props?.circleType,
                    screenTitle: props?.screenTitle,
                })
            }
        >
            <MemareeText style={[CircleStyles.textCircleNavigationColumn, { color: colors.text }]}>
                {props?.text}
            </MemareeText>
            <FontAwesomeIcon
                color={colors.text}
                style={ButtonStyles.backButtonIcon}
                icon={faChevronRight}
                size={ButtonStyles.backButtonSize}
            />
        </TouchableOpacity>
    );
};

export default CircleColumnButton;

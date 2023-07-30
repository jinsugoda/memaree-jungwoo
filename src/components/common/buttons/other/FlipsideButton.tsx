import React from 'react';
import { TouchableOpacity } from 'react-native';

// types
import { CustomTheme } from 'styles/theme/customThemeProps';

// 3rd party hooks
import { useTheme } from 'react-native-paper';

// styles
import { ButtonStyles } from 'styles';

// svg icons
import FlipSide from 'assets/buttonIcons/general/FlipSide.svg';
import FlipSideReversed from 'assets/buttonIcons/general/FlipSideReversed.svg';

export type FlipSideProps = {
    isFlipped: boolean;
    setIsFlipped: React.Dispatch<React.SetStateAction<boolean>>;
};

const FlipSideButton = (props: FlipSideProps) => {
    const { colors }: CustomTheme = useTheme();

    return (
        <TouchableOpacity
            style={[
                ButtonStyles.flipSideButtonContainer,
                {
                    backgroundColor: props?.isFlipped ? colors.secondary : colors.primary,
                    width: 55,
                    height: 55,
                    bottom: 0,
                },
            ]}
            onPress={() => props?.setIsFlipped((prev) => !prev)}
        >
            {props?.isFlipped ? (
                <FlipSideReversed height={70} width={70} />
            ) : (
                <FlipSide height={30} width={30} />
            )}
        </TouchableOpacity>
    );
};
export default FlipSideButton;

import React from 'react';
import { ActivityIndicator, Pressable, StyleSheet, View } from 'react-native';

// types
import type { PressableProps, ViewStyle } from 'react-native';

// custom components
import MemareeText from 'components/common/textAndInputs/MemareeText';

// styles
import { Colors, InputStylesOld, ButtonStyles } from 'styles';

interface MemareeButtonProps {
    disabled?: boolean;
    onPress?: PressableProps['onPress'];
    secondary?: boolean;
    loading?: boolean;
    text: string;
}

const MemareeButton = (props: MemareeButtonProps) => {
    const { disabled, onPress, secondary, loading } = props;

    let style: ViewStyle[] = [secondary ? styles.secondary : styles.primary];
    if (disabled) style = [...style, styles.disabled];

    const textColor = secondary ? Colors.darkText : Colors.lightText;

    return (
        <Pressable style={{ width: '100%' }} onPress={disabled ? null : onPress}>
            <View style={[style, { width: '100%' }]}>
                {loading ? (
                    <ActivityIndicator animating={true} color={textColor} size={'small'} />
                ) : (
                    <MemareeText
                        style={secondary ? ButtonStyles.textsDark : ButtonStyles.textsLight}
                    >
                        {props?.text}
                    </MemareeText>
                )}
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    primary: {
        ...InputStylesOld.primaryButton,
    },
    secondary: {
        ...InputStylesOld.secondaryButton,
    },
    disabled: {
        ...InputStylesOld.disabled,
    },
});

export default MemareeButton;

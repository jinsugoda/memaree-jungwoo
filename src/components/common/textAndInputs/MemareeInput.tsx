import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, TextInput, View, ViewStyle } from 'react-native';

// types
import type { TextInputProps } from 'react-native';
import { CustomTheme } from 'styles/theme/customThemeProps';

// 3rd party hooks
import { useTheme } from 'react-native-paper';

// custom components
import MemareeText from 'components/common/textAndInputs/MemareeText';

// styles
import { Colors, InputStylesOld, Spacing } from 'styles';

interface MemareeInputProps {
    errors?: string[];
    label?: string;
    value: string;
    containerStyle?: ViewStyle;
    limit?: number;
    showLimit?: boolean;
    onFocus?: () => void;
}

const screenWidth = Dimensions.get('window').width;
const ptValue = screenWidth * 0.9;

const MemareeInput = (
    props: MemareeInputProps &
        Omit<TextInputProps, 'style' | 'selectionColor' | 'onFocus' | 'onBlur'>,
) => {
    const { errors, label, limit, showLimit, defaultValue, ...rest } = props;
    const [focused, setFocused] = useState(false);

    const screenWidth = Dimensions.get('window').width;
    const ptValue = screenWidth * 0.9;
    const { colors }: CustomTheme = useTheme();

    let style = styles.input;
    if (focused) style = styles.focused;
    else if (errors && errors?.length > 0) style = styles.error;

    const [errorText, setErrorText] = useState([]);
    console.log('memaree input', errors);
    useEffect(() => {
        const newErrorText = [];
        if (errors && errors.length !== 0) {
            for (let error of errors) {
                newErrorText?.push(
                    <MemareeText style={[styles.errorText]} key={error}>
                        {error}
                    </MemareeText>,
                );
            }
        }
        setErrorText(newErrorText);
    }, [errors]);

    return (
        <View style={[Spacing.marginTop, props?.containerStyle]}>
            {label && <MemareeText style={styles.labelText}>{label}</MemareeText>}
            {showLimit && (
                <MemareeText style={[styles.limitText, { color: colors.text }]}>
                    {`${
                        !defaultValue
                            ? defaultValue?.length > 0 && props?.value?.length === 0
                                ? defaultValue?.length
                                : props?.value?.length
                            : props?.value?.length
                    }/${limit}`}
                </MemareeText>
            )}
            <TextInput
                {...(rest as TextInputProps)}
                // style={style}
                style={{
                    fontFamily: 'Outfit-Bold',
                    color: colors.text,
                    height: 50,
                    width: ptValue,
                    fontSize: 17,
                    backgroundColor: '#2F2F2F',
                    borderRadius: 99,
                    borderWidth: 0.7,
                    marginBottom: 10,
                    paddingLeft: 20,
                }}
                cursorColor={colors.text}
                placeholderTextColor={colors.text}
                selectionColor={Colors.primary}
                onFocus={() => {
                    if (props?.onFocus) {
                        props?.onFocus();
                    }
                    setFocused(true);
                }}
                onBlur={() => setFocused(false)}
                maxLength={limit}
            />
            {errorText}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        ...Spacing.container,
    },
    input: {
        ...InputStylesOld.textInput,
    },
    focused: {
        ...InputStylesOld.focused,
    },
    error: {
        ...InputStylesOld.errored,
    },
    errorText: {
        color: Colors.error,
        marginTop: Spacing.smallMarginSize,
        marginBottom: 10,
        marginLeft: 20,
    },
    labelText: {
        ...Spacing.smallMarginBottom,
    },
    limitText: {
        ...Spacing.smallMarginBottom,
        position: 'absolute',
        right: 20,
        top: -20,
        fontSize: 12,
    },
    inputText: {
        height: 50,
        width: ptValue,
        fontSize: 17,
        backgroundColor: '#2F2F2F',
        borderRadius: 99,
        borderWidth: 0.7,
        marginBottom: 10,
        paddingLeft: 20,
    },
});

export default MemareeInput;

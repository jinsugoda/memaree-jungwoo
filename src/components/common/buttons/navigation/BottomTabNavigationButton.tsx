import React, { ElementType, useEffect, useState } from 'react';
import { View } from 'react-native';

// types
import { CustomTheme } from 'styles/theme/customThemeProps';

// 3rd party hooks
import { useTheme } from 'react-native-paper';

// custom components
import MemareeText from 'components/common/textAndInputs/MemareeText';

// styles
import { ButtonStyles } from 'styles';
import { SvgProps } from 'react-native-svg';

export declare interface NavigationButton extends SvgProps {
    icon: React.FC<SvgProps>;
    label: string;
    fill?: string;
    stroke?: string;
    fillOpacity?: number;
    selector: boolean;
    notification: number;
    size: number;
}

const BottomTabNavigationButton = (props: NavigationButton) => {
    const { colors }: CustomTheme = useTheme();
    const { selector, notification, size, fill, fillOpacity, stroke } = props;
    const [buttonColor, setButtonColor] = useState<string>(selector ? colors.tertiary : 'white');

    useEffect(() => {
        setButtonColor(selector ? colors.tertiary : 'white');
    }, [selector]);

    return (
        <View
            style={[
                ButtonStyles.containerNavigationButton,
                ButtonStyles.selectedNavigationBorderTopWidth,
                { borderColor: selector ? colors.tertiary : colors.background },
            ]}
        >
            {props?.icon && (
                <props.icon
                    {...props}
                    fill={fill ? fill : buttonColor}
                    fillOpacity={fillOpacity}
                    stroke={stroke ? stroke : buttonColor}
                    width={size}
                    height={size}
                    // stroke={buttonColor}
                    // style={{marginTop:0,marginBottom:2}}
                />
            )}
            <MemareeText
                style={{
                    color: selector ? colors.tertiary : 'white',
                    fontSize: 11,
                    fontFamily: 'Outfit',
                }}
            >
                {props?.label}
            </MemareeText>
        </View>
    );
};
export default BottomTabNavigationButton;

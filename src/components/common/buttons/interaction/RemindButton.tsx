import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// types
import { CustomTheme } from 'styles/theme/customThemeProps';
import { ActionButton } from '/types/Button';

// 3rd party hooks
import { useTheme } from 'react-native-paper';

const RemindButton = (props: ActionButton) => {
    const { colors }: CustomTheme = useTheme();

    const [ButtonSwitch, setButtonSwitch] = useState(props?.selected);
    const inverted = props?.inverted;
    //   console.log("remindButtton")
    //     console.log(ButtonSwitch)

    const switchButton = () => {
        //Update selected in server
        try {
            props?.Action(!ButtonSwitch);
        } catch (error) {
            console.log(error);
        }
        setButtonSwitch(!ButtonSwitch);
    };
    return (
        <TouchableOpacity onPress={() => switchButton()}>
            {
                // ButtonSwitch ? <RemindButtonSelected width={props?.size} height={props?.size}/> : <RemindButtonDefault width={props?.size} height={props?.size}/>
                // :(
                //     inverted?
                //     <RemindButtonInverted width={props?.size} height={props?.size}/>
                //     :<RemindButtonSelected width={props?.size} height={props?.size}/>
                // )
                // ButtonSwitch ? <RemindIconSelected fill1={colors.secondary} fill2={colors.background} /> : <RemindIconDefault fill1={colors.background} fill2={colors.primary} />
                // paper-plane-outline vs paper-plane
                ButtonSwitch ? (
                    <Ionicons name="paper-plane" size={props?.size} color={colors.secondary} />
                ) : (
                    <Ionicons
                        name="paper-plane-outline"
                        size={props?.size}
                        color={colors.primary}
                    />
                )
            }
        </TouchableOpacity>
    );
};

export default RemindButton;

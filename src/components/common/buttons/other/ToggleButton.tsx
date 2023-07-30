import React from 'react';
import { Pressable, View, Text } from 'react-native';

// styles
import { FilterStyles } from 'styles';

interface FilterButton {
    text: string;
    isOn: boolean;
    buttonId: string;
    onToggle: () => void;
}

const ToggleButton = (props: FilterButton) => {
    return (
        <View style={FilterStyles.filterButtonContainer}>
            <Pressable
                style={[
                    FilterStyles.filterButton,
                    {
                        backgroundColor: props?.isOn
                            ? FilterStyles.buttonBackgroundOn
                            : FilterStyles.buttonBackgroundOff,
                    },
                ]}
                onPress={() => props?.onToggle()}
            >
                <View>
                    <Text
                        style={[
                            FilterStyles.filterText,
                            {
                                color: props?.isOn
                                    ? FilterStyles.buttonTextOn
                                    : FilterStyles.buttonTextOff,
                            },
                        ]}
                    >
                        {props?.text}
                    </Text>
                </View>
            </Pressable>
        </View>
    );
};

export default ToggleButton;

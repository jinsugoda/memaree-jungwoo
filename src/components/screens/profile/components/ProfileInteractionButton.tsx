import React from 'react';
import { TextStyle, TouchableOpacity, ViewStyle } from 'react-native';

// custom component
import MemareeText from 'components/common/textAndInputs/MemareeText';

// style
import { ProfileInteractionsButtonStyle } from 'styles/stylesheets/profileStyles';

interface ProfileInteractionButtonInterface {
    text: string;
    onPress: () => void;
    style?: ViewStyle;
    textStyle?: TextStyle;
}

const ProfileInteractionButton = (props: ProfileInteractionButtonInterface) => {
    return (
        <TouchableOpacity
            style={[ProfileInteractionsButtonStyle, { backgroundColor: '#262A2A' }, props?.style]}
            onPress={() => props?.onPress()}
        >
            <MemareeText
                adjustsFontSizeToFit={true}
                style={[
                    {
                        fontSize: 15,
                        color: 'white',
                        textAlign: 'center',
                    },
                    props?.textStyle,
                ]}
            >
                {props?.text}
            </MemareeText>
        </TouchableOpacity>
    );
};

export default ProfileInteractionButton;

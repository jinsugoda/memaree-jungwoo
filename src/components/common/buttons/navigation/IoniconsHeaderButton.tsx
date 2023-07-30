import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { HeaderButton } from 'react-navigation-header-buttons';

// types
import { HeaderButtonProps } from 'react-navigation-header-buttons';

// styles
import { ButtonStyles } from 'styles';

// from readme of react native elements page
const IoniconsHeaderButton = (
    props: JSX.IntrinsicAttributes &
        JSX.IntrinsicClassAttributes<HeaderButton> &
        Readonly<HeaderButtonProps>,
) => {
    return (
        <HeaderButton
            IconComponent={Ionicons}
            iconSize={ButtonStyles.headerButtonIconSize}
            {...props}
        />
    );
};

export default IoniconsHeaderButton;

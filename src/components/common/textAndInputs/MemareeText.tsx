import React from 'react';
import { Text } from 'react-native';

// types
import type { TextProps } from 'react-native';

// styles
import { TextStyles } from 'styles';

const MemareeText = (props: TextProps) => {
    const { style, ...rest } = props;

    return <Text style={[TextStyles.text, style]} {...rest} />;
};

export default MemareeText;

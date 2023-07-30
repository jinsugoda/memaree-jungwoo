import React from 'react';

// icons
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck';

type CheckButton = {
    size: number;
    color: string;
};

const CheckButton = ({ size, color }: CheckButton) => {
    return <FontAwesomeIcon icon={faCheck} size={size} color={color} />;
};

export default CheckButton;

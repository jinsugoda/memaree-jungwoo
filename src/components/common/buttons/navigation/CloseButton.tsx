import React from 'react';

// icons
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons/faXmark';

/**
 * AuthProps: accepts number for handling auth count
 */
interface CloseButtonProps {
    color: string;
    size: number;
}

/**
 * Main auth function component responsible for handing
 * @param props
 * @constructor
 */
const CloseButton = (props: CloseButtonProps) => {
    const { color, size } = props;

    return (
        <>
            <FontAwesomeIcon color={color} icon={faXmark} size={size} />
        </>
    );
};

export { CloseButton };

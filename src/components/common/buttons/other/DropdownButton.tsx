import React from 'react';
import { TouchableOpacity } from 'react-native';

// styles
import { ButtonStyles } from 'styles';

// icons
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons/faChevronUp';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons/faChevronDown';

type DropdownButtonProps = {
    dropdown: boolean;
    setDropdown: React.Dispatch<React.SetStateAction<boolean>>;
};

const DropdownButton = (props: DropdownButtonProps) => {
    return (
        <TouchableOpacity
            style={ButtonStyles.DropdownButton}
            onPress={() => props?.setDropdown((prev) => !prev)}
        >
            {props?.dropdown ? (
                <FontAwesomeIcon
                    color={ButtonStyles.DROPDOWN_BUTTON_COLOR}
                    icon={faChevronUp}
                    size={ButtonStyles.DROPDOWN_BUTTON_SIZE}
                />
            ) : (
                <FontAwesomeIcon
                    color={ButtonStyles.DROPDOWN_BUTTON_COLOR}
                    icon={faChevronDown}
                    size={ButtonStyles.DROPDOWN_BUTTON_SIZE}
                />
            )}
        </TouchableOpacity>
    );
};

export default DropdownButton;

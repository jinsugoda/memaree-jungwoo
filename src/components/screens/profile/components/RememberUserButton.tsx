import React from 'react';

// 3rds party hooks
import { useMutation } from '@apollo/client';

// gpl mutations
import { UNREMEMBER_USER, REMEMBER_USER } from '../gpl/profileQueries';

// utils error/ logging
import Logger, { ErrorType } from 'utils/logger';

// custom components
import ProfileInteractionButton from './ProfileInteractionButton';

interface rememberToggleButtonInterface {
    rememberingUserId: string;
    isRemembered: boolean;
    setRemembered: React.Dispatch<React.SetStateAction<boolean>>;
}
const RememberToggleButton = (props: rememberToggleButtonInterface) => {
    const [unRememberUserMutation, { error: unRememberUserError }] = useMutation(UNREMEMBER_USER);
    const [rememberUserMutation, { error: rememberUserError }] = useMutation(REMEMBER_USER);
    const rememberUser = async () => {
        try {
            const { data } = await rememberUserMutation({
                variables: { input: { userId: props.rememberingUserId } },
            });
            if (data?.rememberUser?.status === 'complete') {
                props.setRemembered(true);
            } else {
                console.error('ERROR', rememberUserError, data);
            }
        } catch (error) {
            console.error('ERROR', error);
            Logger(
                ErrorType.OTHER,
                'OtherProfileScreen',
                error,
                'src/components/screens/profile/screens/OtherProfileScreen.tsx',
                144,
                0,
                'Attempting to remember user.',
                { userId: props.rememberingUserId },
            );
        }
    };

    const unRememberUser = async () => {
        try {
            const { data } = await unRememberUserMutation({
                variables: { input: { userId: props.rememberingUserId } },
            });
            if (data?.unRememberUser?.status === 'complete') {
                props.setRemembered(false);
            } else {
                console.error('ERROR', unRememberUserError, data);
            }
        } catch (error) {
            console.error('ERROR', error);
            Logger(
                ErrorType.OTHER,
                'OtherProfileScreen',
                error,
                'src/components/screens/profile/screens/OtherProfileScreen.tsx',
                169,
                0,
                'Attempting to forget user.',
                { userId: props.rememberingUserId },
            );
        }
    };

    return (
        <ProfileInteractionButton
            text={props.isRemembered ? 'Forget' : 'Remember'}
            onPress={props.isRemembered ? () => unRememberUser : () => rememberUser()}
        />
    );
};

export default RememberToggleButton;

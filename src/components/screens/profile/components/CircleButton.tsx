import React, { useLayoutEffect, useState } from 'react';

// 3rds party hooks
import { useMutation } from '@apollo/client';

// gpl mutations
import {
    CANCEL_CIRCLE_REQUEST,
    CREATE_CIRCLE_REQUEST,
    REMOVE_USER_FROM_CIRCLE,
} from '../gpl/profileQueries';

// utils error/ logging
import Logger, { ErrorType } from 'utils/logger';

// custom components
import ProfileInteractionButton from './ProfileInteractionButton';
import { ADD_USER_TO_CIRCLE } from 'components/screens/notifications/gpl/query';

interface CircleButtonInterface {
    circlingUserId: string;
    friendStatus: string;
    setFriendStatus: React.Dispatch<React.SetStateAction<string>>;
}
const CircleButton = (props: CircleButtonInterface) => {
    const [buttonText, setButtonText] = useState<string>('');
    const [onPress, setOnPress] = useState<() => void>();

    const [addUserToCircleMutation, { error: addUserToCircleError }] =
        useMutation(ADD_USER_TO_CIRCLE);
    const [removeUserFromCircleMutation, { error: removeUserFromCircleError }] =
        useMutation(REMOVE_USER_FROM_CIRCLE);

    const [sendCircleRequestMutation] = useMutation(CREATE_CIRCLE_REQUEST);
    const [cancelFriendRequestMutation, { error: cancelFriendRequestError }] =
        useMutation(CANCEL_CIRCLE_REQUEST);

    // const sendCircleRequest = async () => {
    //     try {
    //         const { data } = await sendCircleRequestMutation({
    //             variables: { input: { userId: id } },
    //         });
    //         if (data?.createCircleRequest?.status === 'complete') {
    //             props.setFriendStatus('request-sent');
    //         } else {
    //             console.error('ERROR', addUserToCircleError, data);
    //         }
    //     } catch (error) {
    //         console.error('ERROR', error);
    //         Logger(
    //             ErrorType.OTHER,
    //             'OtherProfileScreen',
    //             error,
    //             'src/components/screens/profile/screens/OtherProfileScreen.tsx',
    //             194,
    //             0,
    //             'Attempting to send Circle request.',
    //             { userId: id },
    //         );
    //     }
    // };

    // const cancelCircleRequest = async () => {
    //     try {
    //         const res = await cancelFriendRequestMutation({
    //             variables: { input: { userId: id } },
    //         });

    //         if (res.data?.cancelCircleRequest?.status === 'complete') {
    //             props.setFriendStatus('not-friend');
    //         } else {
    //             console.error('ERROR', cancelFriendRequestError, data);
    //         }
    //     } catch (error) {
    //         console.error('ERROR', error);
    //         Logger(
    //             ErrorType.OTHER,
    //             'OtherProfileScreen',
    //             error,
    //             'src/components/screens/profile/screens/OtherProfileScreen.tsx',
    //             219,
    //             0,
    //             'Attempting to cancel Circle request.',
    //             { userId: id },
    //         );
    //     }
    // };

    // const addUserToCircle = async () => {
    //     try {
    //         const { data } = await addUserToCircleMutation({
    //             variables: { input: { userId: id } },
    //         });
    //         if (data?.addUserToCircle?.status === 'complete') {
    //             props.setFriendStatus('friend');
    //         } else {
    //             console.error('ERROR', addUserToCircleError, data);
    //         }
    //     } catch (error) {
    //         console.error('ERROR', error);
    //         Logger(
    //             ErrorType.OTHER,
    //             'OtherProfileScreen',
    //             error,
    //             'src/components/screens/profile/screens/OtherProfileScreen.tsx',
    //             245,
    //             0,
    //             'Attempting to request user to join Circle.',
    //             { userId: id },
    //         );
    //     }
    // };

    // const removeUserFromCircle = async () => {
    //     try {
    //         const { data } = await removeUserFromCircleMutation({
    //             variables: { input: { userId: id } },
    //         });
    //         if (data?.removeUserFromCircle?.status === 'complete') {
    //             props.setFriendStatus('not-friend');
    //         } else {
    //             console.error('ERROR', removeUserFromCircleError, data);
    //         }
    //     } catch (error) {
    //         console.error('ERROR', error);
    //         Logger(
    //             ErrorType.OTHER,
    //             'OtherProfileScreen',
    //             error,
    //             'src/components/screens/profile/screens/OtherProfileScreen.tsx',
    //             269,
    //             0,
    //             'Attempting to remove user from Circle.',
    //             { userId: id },
    //         );
    //     }
    // };
    const sendCircleRequest = async () => {
        console.log('send circle request');
    };

    const cancelCircleRequest = async () => {
        console.log('cancel circle request');
    };

    const addUserToCircle = async () => {
        console.log('add to circle');
    };

    const removeUserFromCircle = async () => {
        console.log('removeUserFromCircle');
    };
    useLayoutEffect(() => {
        switch (props.friendStatus) {
            case 'friend':
                setOnPress(() => () => {
                    removeUserFromCircle();
                });
                setButtonText('In Circle');
            case 'request-sent':
                setOnPress(() => () => {
                    cancelCircleRequest();
                });
                setButtonText('Cancel Request');
            case 'pending-approval':
                setOnPress(() => () => {
                    addUserToCircle();
                });
                setButtonText('Accept Request');
            default:
                setOnPress(() => () => {
                    sendCircleRequest();
                });
                setButtonText('Add to Circle');
        }
    }, [props.friendStatus]);

    return <ProfileInteractionButton text={buttonText} onPress={onPress} />;
};

export default CircleButton;

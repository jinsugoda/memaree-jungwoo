import React from 'react';
import { TouchableOpacity } from 'react-native';

// 3rd party hooks
import { useTheme } from 'react-native-paper';
import { useMutation } from '@apollo/client';

// types
import { CustomTheme } from 'styles/theme/customThemeProps';

// gpl queries
import { REMEMBER_POST, UNREMEMBER_POST } from 'queries/interactions/postInteractions';

// custom components
import { MutateAction } from '/types/Button';

// redux
import { selectIsPostRemembered, selectUserId, toggleRememberedPost } from 'store/slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';

// utils
import Logger, { ErrorType } from 'utils/logger';

// svg icon
import RememberButtonSVG from 'assets/buttonIcons/interactions/RememberIcon.svg';
import RememberActivatedSVG from 'assets/buttonIcons/interactions/RememberActivated.svg';
import { setRemembered } from 'store/slices/memareeScreenSlice';

interface RememberButtonProps {
    size: number;
    inverted: boolean;
    postId: string;
}

const RememberButton = (props: RememberButtonProps) => {
    const inverted = props?.inverted;
    const { colors }: CustomTheme = useTheme();

    // redux user and remembered list
    const dispatch = useDispatch();
    const userId = useSelector(selectUserId);
    // const user = useSelector(selectUser);
    const isRemembered = useSelector(selectIsPostRemembered(props?.postId));
    // useEffect(()=> {
    //     console.log("user", user)
    //     console.log("userid", userId)
    // }, [user])

    const [addPostToUser] = useMutation(REMEMBER_POST);
    const [removePostFromUser] = useMutation(UNREMEMBER_POST);

    const RememberedPostsInteraction = async (mutationAction: MutateAction) => {
        let action = '';
        if (isRemembered) {
            action = 'remove';
        } else {
            action = 'add';
        }
        try {
            await mutationAction({ variables: { postId: props?.postId, userId: userId } });
            console.log(`Successfully ${action}ed post: ${props?.postId} to user: ${userId}`);
        } catch (err) {
            console.log(
                `Failed to ${action} post: ${props?.postId} to user: ${userId}, error ${err}`,
            );
        }
    };

    const rememberAction = async () => {
        dispatch(setRemembered(true));
        if (!isRemembered) {
            RememberedPostsInteraction(addPostToUser);
        } else {
            RememberedPostsInteraction(removePostFromUser);
        }
        try {
            dispatch(toggleRememberedPost(props?.postId));
        } catch (error) {
            Logger(
                ErrorType.REDUX,
                'RememberButton',
                error,
                'src/components/common/buttons/interaction/RememberButton.tsx',
                71,
                0,
                'dispatch(toggleRememberedPost(props?.postId))',
                null,
                'NO ENDPOINT',
                { props },
            );
        }
    };

    return (
        <TouchableOpacity onPress={() => rememberAction()}>
            {!isRemembered ? (
                <RememberButtonSVG
                    width={props?.size}
                    height={props?.size}
                    fill="white"
                    stroke={'white'}
                    strokeWidth={0.1}
                    style={{ paddingHorizontal: 20 }}
                />
            ) : (
                <RememberActivatedSVG width={props?.size} height={props?.size} fill="#6FF1F6" />
            )}
        </TouchableOpacity>
        // <TouchableOpacity onPress = {()=> rememberAction()}>
        // {
        //     !isRemembered ?
        //     // <RememberButtonDefault width={props?.size} height={props?.size}/> : (inverted ? <RememberButtonInverted width={props?.size} height={props?.size}/> : <RememberButtonSelected width={props?.size} height={props?.size}/>)
        //     // <RememberIconSelected fill1={colors.secondary} fill2={colors.background} /> : <RememberIconDefault fill1={colors.background} fill2={colors.primary} />
        //     // duplicate-outline vs duplicate
        //     <Ionicons name="duplicate-outline" size={props?.size} color={colors.primary} /> : <Ionicons name="duplicate" size={props?.size} color={colors.secondary} />
        // }
        // </TouchableOpacity>
    );
};

export default RememberButton;

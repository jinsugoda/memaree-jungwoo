import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

// types
import { CognitoUser } from 'amazon-cognito-identity-js';

// 3rd party hooks
import { useLazyQuery } from '@apollo/client';

// debugging
import { useWhatChanged } from '@simbathesailor/use-what-changed';

// redux - user slice reducers reducers
import { setUser } from 'store/slices/userSlice';

// gpl
import { GET_USER } from 'queries/user/userQueries';

const useUserQuery = (
    cognitoUser: CognitoUser | null | undefined,
    event: string,
    isDone: boolean,
) => {
    const dispatch = useDispatch();

    const [getUser, { loading, error }] = useLazyQuery(GET_USER, {
        fetchPolicy: 'network-only',
        onCompleted: (data) => {
            // console.log("on completed data: ", data)
            dispatch(setUser(data.userContext));
        },
    });
    useWhatChanged([cognitoUser, isDone], 'cognitoUser, isdone'); // debugs the below useEffect
    useEffect(() => {
        if ((event === 'signIn' || event === 'autoSignIn') && isDone && cognitoUser != null) {
            // console.log("event", event)
            // console.log("isdone", isDone)
            // console.log("event", cognitoUser.getUsername())
            // console.log(cognitoUser)
            console.log('fetching apollo user on sign in or auto sign in');
            getUser();
        }
    }, [event, isDone, cognitoUser]);

    return { userLoading: loading, userError: error };
};

export default useUserQuery;

import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Auth, Hub } from 'aws-amplify';

// types
import { CognitoUser } from 'amazon-cognito-identity-js';

// 3rd party hooks
import { useDispatch } from 'react-redux';
import { useApolloClient } from '@apollo/client';

// redux - user slice reducers
import { resetUserToInitial } from 'store/slices/userSlice';

// utils - error/ logging
import Logger, { ErrorType } from 'utils/logger';

/** We pass in a dummy value just to get type hints */
const authContext = createContext({} as ReturnType<typeof useProvideAuth>);

const SIGNUP_ERROR_INITIAL_STATE = {
    username: [],
    password: [],
    email: [],
    other: [],
};

export const ProvideAuth = ({ children }) => {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

const useAuth = () => {
    return useContext(authContext);
};

const useProvideAuth = () => {
    const dispatch = useDispatch();
    const apolloClient = useApolloClient();
    const [cognitoUser, setCognitoUser] = useState<CognitoUser | null | undefined>(undefined);
    const [firstSignIn, setFirstSignIn] = useState('1');

    const [event, setEvent] = useState('none');
    const [status, setStatus] = useState('idle');
    const [requiresConfirmation, setRequiresConfirmation] = useState(false);

    const [errors, setErrors] = useState({
        submitCode: [],
        resendCode: [],
        login: [],
        logout: [],
        logoutAll: [],
    });

    const [signUpErrors, setSignUpErrors] = useState(SIGNUP_ERROR_INITIAL_STATE);

    const updateUserAttributesHandler = async () => {
        try {
            const user = await Auth.currentAuthenticatedUser({ bypassCache: true });
            setCognitoUser(user);
        } catch (error) {
            console.log('Could not get user:', error);
            Logger(
                ErrorType.COGNITO,
                'useAuth',
                error,
                'src/hooks/useAuth.tsx',
                50,
                0,
                'Could not get user.',
                null,
                'NO ENDPOINT',
            );
            setCognitoUser(null);
        }
    };
    async function deleteUser() {
        try {
          const result = await Auth.deleteUser();
          console.log(result);
        } catch (error) {
          console.log('Error deleting user', error);
        }
    }
    const setError = (name: keyof typeof errors, error: { message: string }) => {
        setStatus('error');
        setErrors((errors) => {
            const newErrors = {
                ...errors,
                [name]: [error.message],
            };
            return newErrors;
        });
    };

    const setSignUpError = (errorType: 'username' | 'email' | 'password' | 'other', error) => {
        setStatus('error');
        setSignUpErrors((errors) => {
            const newErrors = {
                ...errors,
                [errorType]: [error],
            };
            return newErrors;
        });
    };

    const clearSignUpError = () => {
        setSignUpErrors(SIGNUP_ERROR_INITIAL_STATE);
    };

    const signUp = async (username: string, password: string, email: string) => {
        setStatus('loading');
        try {
            const { user } = await Auth.signUp({
                username: username.trim(),
                password,
                attributes: {
                    email: email.trim(),
                },
                autoSignIn: {
                    enabled: true,
                },
            });
            setRequiresConfirmation(true);
            setStatus('done');
            return user;
        } catch (error) {
            Logger(
                ErrorType.COGNITO,
                'useAuth',
                error,
                'src/hooks/useAuth.tsx',
                83,
                0,
                'Could not sign up.',
                null,
                'NO ENDPOINT',
            );
            console.log(JSON.stringify(error));
            if (error.name === 'AuthError') {
                if (error.log.toLowerCase().includes('username')) {
                    setSignUpError('username', error.log);
                } else if (error.log.toLowerCase().includes('password')) {
                    setSignUpError('password', error.log);
                } else if (error.log.toLowerCase().includes('email')) {
                    setSignUpError('email', error.log);
                } else {
                    setSignUpError('other', error.log);
                }
            } else if (error.code === 'UsernameExistsException') {
                setSignUpError('username', 'Username already exists.');
            } else if (error.code === 'InvalidParameterException') {
                if (error.message.includes('Invalid email')) {
                    setSignUpError('email', error.message);
                }
                if (error.message.includes('Password did not conform with policy')) {
                    setSignUpError('password', error.message);
                }
            } else {
                setSignUpError('other', error);
            }
        }
    };

    const submitCode = async (username: string, code: string) => {
        setStatus('loading');
        try {
            const response = await Auth.confirmSignUp(username.trim(), code.trim());
            console.log('submit code response: ', response);
            setRequiresConfirmation(false);
            setStatus('done');
            return false;
        } catch (error) {
            console.log('Error confirming sign up', error);
            Logger(
                ErrorType.COGNITO,
                'useAuth',
                error,
                'src/hooks/useAuth.tsx',
                115,
                0,
                'Error confirming sign up.',
                null,
                'NO ENDPOINT',
            );
            setError('submitCode', error);
            return true;
        }
    };

    const resendCode = async (username: string) => {
        setStatus('loading');
        try {
            await Auth.resendSignUp(username.trim());
            setStatus('done');
        } catch (error) {
            setError('resendCode', error);
            Logger(
                ErrorType.COGNITO,
                'useAuth',
                error,
                'src/hooks/useAuth.tsx',
                141,
                0,
                'Could not resend code.',
                null,
                'NO ENDPOINT',
            );
        }
    };

    const login = async (username: string, password: string) => {
        setStatus('loading');
        setRequiresConfirmation(false);
        try {
            const result = await Auth.signIn(username.trim(), password);
            setStatus('done');
            return true && result;
        } catch (error) {
            if (error.code === 'UserNotConfirmedException') {
                setStatus('done');
                setRequiresConfirmation(true);
                Logger(
                    ErrorType.COGNITO,
                    'useAuth',
                    error,
                    'src/hooks/useAuth.tsx',
                    163,
                    0,
                    'User not confirmed exception.',
                    null,
                    'NO ENDPOINT',
                );
            } else {
                Logger(
                    ErrorType.COGNITO,
                    'useAuth',
                    error,
                    'src/hooks/useAuth.tsx',
                    163,
                    0,
                    'General login error.',
                    null,
                    'NO ENDPOINT',
                );
                setError('login', error);
            }
            return false;
        }
    };

    const logout = async () => {
        try {
            await Auth.signOut();
            await AsyncStorage.clear();
            apolloClient.clearStore().then(() => {
                apolloClient.resetStore();
            });
            dispatch(resetUserToInitial);
            setCognitoUser(null);
        } catch (error) {
            Logger(
                ErrorType.COGNITO,
                'useAuth',
                error,
                'src/hooks/useAuth.tsx',
                199,
                0,
                'Log out failed.',
                null,
                'NO ENDPOINT',
            );
        }
    };

    const logoutAll = async () => {
        await Auth.signOut({ global: true });
    };

    // log COGNITO errors in each switch case...
    const listenForAuthUpdates = () =>
        Hub.listen('auth', (data) => {
            setEvent(data.payload.event);
            switch (data.payload.event) {
                case 'signIn':
                    console.log('normal signin: ', data.payload.data != null);
                    try {
                        setFirstSignIn(data.payload.data.attributes['custom:firstTime']);
                    } catch (error) {
                        Logger(
                            ErrorType.COGNITO,
                            'useAuth',
                            error,
                            'use',
                            0,
                            0,
                            'setFirstSignIn failed: data.payload.data.attributes["custom:firstTime"]',
                            null,
                            'NO ENDPOINT',
                        );
                    }
                    setCognitoUser(data.payload.data);
                    console.log('signing in');
                    setStatus('done');
                    break;
                case 'signUp':
                    console.log('sign up');
                    setStatus('done');
                    break;
                case 'signOut':
                    console.log('sign out');
                    dispatch(resetUserToInitial);
                    setFirstSignIn('1');
                    setCognitoUser(null);
                    setStatus('done');
                    break;
                case 'signIn_failure':
                    console.log('sign in failed - not implemented');
                    setStatus('done');
                    break;
                case 'tokenRefresh':
                    console.log('refreshing token - not implemented');
                    setStatus('done');
                    break;
                case 'tokenRefresh_failure':
                    console.log('refreshing failure - not implemented');
                    setStatus('done');
                    break;
                case 'autoSignIn':
                    setCognitoUser(data.payload.data);
                    setFirstSignIn(data.payload.data.attributes['custom:firstTime']);
                    console.log('auto sign in - not implemented');
                    console.log(
                        'auto sign in, data is not null: ',
                        data.payload.data ? true : false,
                    );
                    setStatus('done');
                    break;
                case 'autoSignIn_failure':
                    console.log('auto sign in failure - not implemented');
                    setStatus('done');
                    break;
                case 'configured':
                    console.log('configured', data.payload);
                    setStatus('done');
            }
        });

    const listenForUserAttributeUpdates = () =>
        Hub.listen('userAttributeUpdates', (data) => {
            switch (data.payload.event) {
                case 'custom:firstTime':
                    console.log('updated state', data.payload);
                    updateUserAttributesHandler();
                    break;
            }
        });

    useEffect(() => {
        const fetchData = async () => {
            try {
                await Auth.currentSession();
                setStatus('loading');

                const user = await Auth.currentAuthenticatedUser({ bypassCache: true });

                console.log('get current authenticated user', user != null);
                setFirstSignIn(user.attributes['custom:firstTime']);
                setStatus('done');
                setEvent('signIn');
                dispatch(resetUserToInitial);
                console.log('manually triggering event signin');
                setCognitoUser(user);
            } catch (error) {
                console.log('could not get user: ', error);
                Logger(
                    ErrorType.COGNITO,
                    'useAuth',
                    error,
                    'src/hooks/useAuth.tsx',
                    303,
                    0,
                    'Could not get user.',
                    null,
                    'NO ENDPOINT',
                );
                setCognitoUser(null);
                setEvent('none');
                setStatus('done');
            }
        };
        const unsubscribeFromAuthUpdates = listenForAuthUpdates();
        const unsubscribeFromUserAttributeUpdates = listenForUserAttributeUpdates();
        fetchData();
        return () => {
            unsubscribeFromAuthUpdates();
            unsubscribeFromUserAttributeUpdates();
        };
    }, []);

    return {
        deleteUser,
        cognitoUser,
        firstSignIn,
        signUpErrors,
        errors,
        signUp,
        submitCode,
        resendCode,
        login,
        logout,
        logoutAll,
        clearSignUpError,
        status,
        event,
        isLoading: status === 'loading',
        isDone: status === 'success' || status === 'done',
        isErrored: status === 'error',
        isIdle: status === 'idle',
        requiresConfirmation,
    };
};

export default useAuth;

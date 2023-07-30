import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, useTheme } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import { Auth } from 'aws-amplify';

// types
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from 'types/Screens';
import { CustomTheme } from 'styles/theme/customThemeProps';

// custom components
import MemareeInput from 'components/common/textAndInputs/MemareeInput';

// constants
const passwordValidationRegex = new RegExp('^[S]+.*[S]+$');

type ForgotPasswordScreenProps = NativeStackScreenProps<RootStackParamList, 'ForgotPasswordScreen'>;

const ForgotPasswordScreen = (props: ForgotPasswordScreenProps) => {
    const { colors }: CustomTheme = useTheme();

    const [username, setUsername] = useState('');

    const [code, setCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [showCodeForm, setShowCodeForm] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [forgotPasswordErrors, setForgotPasswordErrors] = useState([]);
    const [submitPasswordErrors, setSubmitPasswordErrors] = useState([]);

    const forgotPassword = async () => {
        try {
            setIsLoading(true);
            const onFulfilled = await Auth.forgotPassword(username?.trim());
            Toast.show({
                type: 'success',
                text1: 'Sent validation Code to your email!',
            });
            console.log('look for user', onFulfilled);
            setShowCodeForm(true);
        } catch (error) {
            if (error?.name === 'InvalidParameterException') {
                console.log('invalid name');
                setForgotPasswordErrors(['Invalid username']);
            } else {
                setForgotPasswordErrors([error?.log]);
            }
            console.error('Error in forgot password', JSON.stringify(error));
        } finally {
            setIsLoading(false);
        }
    };

    const forgotPasswordSubmit = async () => {
        if (passwordValidationRegex.test(newPassword) || 8 > newPassword.length) {
            setSubmitPasswordErrors([
                'Password does not satisfy conditions, must be at least 8 characters and cannot contain spaces.',
            ]);
            return;
        }
        if (newPassword === confirmNewPassword) {
            try {
                setIsLoading(true);
                const onFulfilled = await Auth.forgotPasswordSubmit(
                    username.trim(),
                    code.trim(),
                    newPassword,
                );
                console.log('submitted forget password', onFulfilled);
                props?.navigation?.navigate('LoginScreen');
                Toast.show({
                    type: 'success',
                    text1: 'New Password Set!',
                });
            } catch (error) {
                if (error?.name === 'CodeMismatchException') {
                    setSubmitPasswordErrors(['Code is invalid or mismatched with sent code.']);
                }
                setSubmitPasswordErrors([error?.log]);
                console.error('Error in submitting new password', JSON.stringify(error));
            } finally {
                setIsLoading(false);
            }
        } else {
            setSubmitPasswordErrors(['Password must match']);
        }
    };

    return (
        <View style={{ alignItems: 'center', flex: 1 }}>
            {!showCodeForm ? (
                <>
                    <MemareeInput
                        onChangeText={(newText) => {
                            setUsername(newText);
                            setForgotPasswordErrors([]);
                        }}
                        value={username}
                        autoComplete={'username'}
                        autoCorrect={false}
                        autoFocus={true}
                        keyboardType={'default'}
                        maxLength={16}
                        placeholder={'Enter your username'}
                        returnKeyLabel={'next'}
                        secureTextEntry={false}
                        textContentType={'username'}
                        autoCapitalize={'none'}
                        errors={forgotPasswordErrors}
                    />
                    <Button
                        disabled={!username && username?.length === 0}
                        loading={isLoading}
                        onPress={forgotPassword}
                        textColor={colors.background}
                        labelStyle={{ fontFamily: 'Outfit-Bold' }}
                        style={{
                            backgroundColor:
                                !username && username?.length === 0 ? 'grey' : colors.tertiary,
                            justifyContent: 'center',
                            width: '90%',
                            height: 50,
                            marginTop: 20,
                        }}
                    >
                        Submit
                    </Button>
                </>
            ) : (
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                    }}
                >
                    <MemareeInput
                        containerStyle={{ marginTop: 0, marginBottom: 0 }}
                        autoCapitalize={'none'}
                        onChangeText={setCode}
                        value={code}
                        autoCorrect={false}
                        keyboardType={'number-pad'}
                        placeholder={'Code'}
                        returnKeyLabel={'next'}
                        secureTextEntry={false}
                        textContentType={'oneTimeCode'}
                        label={'Verification Code'}
                    />
                    <MemareeInput
                        containerStyle={{ marginTop: 0, marginBottom: 0 }}
                        autoCapitalize={'none'}
                        onChangeText={(newText) => {
                            setNewPassword(newText);
                            setSubmitPasswordErrors([]);
                        }}
                        value={newPassword}
                        autoCorrect={false}
                        keyboardType={'default'}
                        placeholder={'Enter your password'}
                        returnKeyLabel={'done'}
                        secureTextEntry={true}
                        textContentType={'password'}
                        label={'Password'}
                    />
                    <MemareeInput
                        containerStyle={{ marginTop: 0, marginBottom: 0 }}
                        autoCapitalize={'none'}
                        onChangeText={(newText) => {
                            setConfirmNewPassword(newText);
                            setSubmitPasswordErrors([]);
                        }}
                        value={confirmNewPassword}
                        autoCorrect={false}
                        keyboardType={'default'}
                        placeholder={'Confirm password'}
                        returnKeyLabel={'done'}
                        secureTextEntry={true}
                        textContentType={'password'}
                        label={'Confirm Password'}
                        errors={
                            newPassword === confirmNewPassword
                                ? submitPasswordErrors
                                : ['Password must match']
                        }
                    />
                    <Button
                        disabled={newPassword !== confirmNewPassword && code && code.length !== 0}
                        loading={isLoading}
                        onPress={forgotPasswordSubmit}
                        textColor={colors.background}
                        labelStyle={{ fontFamily: 'Outfit-Bold' }}
                        style={{
                            alignSelf: 'stretch',
                            backgroundColor:
                                newPassword !== confirmNewPassword && code && code.length !== 0
                                    ? 'grey'
                                    : colors.tertiary,
                            justifyContent: 'center',
                            marginTop: 30,
                            height: 50,
                        }}
                    >
                        Submit
                    </Button>
                </View>
            )}
        </View>
    );
};

export default ForgotPasswordScreen;

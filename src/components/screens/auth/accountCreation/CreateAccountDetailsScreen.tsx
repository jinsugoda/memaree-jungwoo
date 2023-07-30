import React, { useEffect, useLayoutEffect, useState } from 'react';
import {
    Dimensions,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    View,
    Image,
} from 'react-native';
import { Button, useTheme } from 'react-native-paper';

// types
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from 'types/Screens';
import { CustomTheme } from 'styles/theme/customThemeProps';

// 3rd party hooks
import useAuth from 'hooks/useAuth';
import { useHeaderHeight } from '@react-navigation/elements';
import { useNavigation } from '@react-navigation/native';

// custom components
import MemareeInput from 'components/common/textAndInputs/MemareeInput';
import MemareeText from 'components/common/textAndInputs/MemareeText';

// utils validation
import { validateEmail } from 'utils/validators';

// utils - logging
import Logger, { ErrorType } from 'utils/logger';

// styles
import { ImageRotationFix } from 'styles/stylesheets/imagesStyles';

type CreateAccountDetailsScreenScreenProps = NativeStackScreenProps<
    RootStackParamList,
    'CreateAccountConfirmationScreen'
>;
const CreateAccountDetailsScreen = (props: CreateAccountDetailsScreenScreenProps) => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const headerHeight = useHeaderHeight();

    const screenWidth = Dimensions.get('window').width;
    const ptValue = screenWidth * 0.9;

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { colors }: CustomTheme = useTheme();
    const [keyboardStatus, setKeyboardStatus] = useState(true);
    const [validationResults, setValidationResults] = useState({
        username: '',
        password: '',
        email: '',
    });

    const handleSetUsername = (text: string) => {
        setUsername(text);
        setValidationResults((prevResults) => {
            const newResults = { ...prevResults };
            newResults['username'] = '';
            return newResults;
        });
    };

    const handleSetEmail = (text: string) => {
        setEmail(text);
        setValidationResults((prevResults) => {
            const newResults = { ...prevResults };
            newResults['email'] = '';
            return newResults;
        });
    };

    const handleSetPassword = (text: string) => {
        setPassword(text);
        setValidationResults((prevResults) => {
            const newResults = { ...prevResults };
            newResults['password'] = '';
            return newResults;
        });
    };

    useEffect(() => {
        const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
            setKeyboardStatus(true);
        });
        const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardStatus(false);
        });

        return () => {
            clearSignUpError();
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, []);
    const checkError = (error1, error2) => {
        if (error1?.length > 0) {
            return error1;
        }
        if (error2?.trim() !== '') {
            return [error2];
        }
        return [];
    };
    const { signUp, isErrored, isLoading, signUpErrors, clearSignUpError } = useAuth();
    console.log('creataccountdetailsscreen signup errors: ', signUpErrors);
    const submitSignUp = (username, email, password) => {
        const results = { username: '', password: '', email: '' };

        if (username?.trim() === '') {
            results.username = 'Username is required.';
        }

        if (password?.length < 8) {
            results.password = 'Password must be at least 8 characters long.';
        }

        if (email?.trim() === '') {
            results.email = 'Email is required.';
        } else if (!validateEmail(email)) {
            results.email = 'Email is invalid.';
        }
        // Update the validation results
        setValidationResults(results);
        if (results.username === '' && results.password === '' && results.email === '') {
            signUp(username, password, email)
                .then((user) => {
                    if (user) {
                        navigation.navigate('CreateAccountConfirmationScreen', {
                            username: username,
                        });
                    } else {
                        //console.log('submitSignUp NO USER', typeof user);
                    }
                })
                .catch((error) => {
                    // console.log('Error signing up', error);
                    Logger(
                        ErrorType.COGNITO,
                        'CreateAccountDetailsScreen',
                        error,
                        'src/components/screens/auth/accountCreation/CreateAccountDetailsScreen.tsx',
                        42,
                        0,
                        'Error signing up (submitSignUp)',
                        null,
                        'NO ENDPOINT',
                        { username, email },
                    );
                });
        }
    };

    const LinkToTermsOfUse = () => {
        return (
            <MemareeText
                style={{ color: colors.primary, textDecorationLine: 'underline', fontSize: 13 }}
                onPress={() => navigation.navigate('TermsOfUseScreen')}
            >
                Terms of Use
            </MemareeText>
        );
    };

    const LinkToPrivacyPolicy = () => {
        return (
            <MemareeText
                style={{ color: colors.primary, textDecorationLine: 'underline', fontSize: 13 }}
                onPress={() => navigation.navigate('PrivacyPolicyScreen')}
            >
                Privacy Policy
            </MemareeText>
        );
    };

    useLayoutEffect(() => {
        if (Platform.OS === 'android') {
            navigation.setOptions({
                headerShown: !keyboardStatus,
            });
        }
    }, [keyboardStatus]);

    return (
        <SafeAreaView
            style={{
                alignItems: 'center',
                flexDirection: 'column',
                width: '100%',
                height: '100%',
                flex: 1,
            }}
        >
            {/* {isErrored && <MemareeText style={{color: Colors.error}}>{signUpErrors.other}</MemareeText>} */}
            <KeyboardAvoidingView
                style={{
                    justifyContent: 'center',
                    flex: 1,
                }}
                behavior={Platform.select({ ios: 'position' })}
                keyboardVerticalOffset={headerHeight}
            >
                <ScrollView
                    style={{
                        overflow: 'visible',
                    }}
                    contentContainerStyle={{
                        alignItems: 'center',
                        justifyContent:
                            keyboardStatus && Platform.OS === 'ios' ? 'flex-end' : 'space-between',
                        flex: Platform.OS === 'ios' ? 1 : 0,
                    }}
                    keyboardDismissMode="interactive"
                    keyboardShouldPersistTaps="handled"
                >
                    <View>
                        <Image
                            source={require('../../../../../assets/memaree.png')}
                            style={[
                                {
                                    width: 200,
                                    height: keyboardStatus ? 0 : 200,
                                    alignSelf: 'center',
                                },
                                ImageRotationFix,
                            ]}
                        />
                        <MemareeInput
                            autoCapitalize={'none'}
                            onChangeText={handleSetEmail}
                            onFocus={() => {
                                setKeyboardStatus(true);
                            }}
                            value={email}
                            autoComplete={'email'}
                            autoCorrect={false}
                            keyboardType={'email-address'}
                            placeholder={'Enter your email'}
                            returnKeyLabel={'next'}
                            secureTextEntry={false}
                            textContentType={'emailAddress'}
                            // label={'Email address'}
                            errors={checkError(signUpErrors.email, validationResults.email)}
                            autoFocus={true}
                        />
                        <MemareeInput
                            onChangeText={handleSetUsername}
                            onFocus={() => {
                                setKeyboardStatus(true);
                            }}
                            value={username}
                            autoComplete={'username-new'}
                            autoCorrect={false}
                            autoFocus={false}
                            keyboardType={'default'}
                            maxLength={16}
                            placeholder={'Choose a username'}
                            returnKeyLabel={'next'}
                            secureTextEntry={false}
                            textContentType={'username'}
                            autoCapitalize={'none'}
                            // label={"Username"}
                            errors={checkError(signUpErrors.username, validationResults.username)}
                        />
                        <MemareeInput
                            autoCapitalize={'none'}
                            onFocus={() => {
                                setKeyboardStatus(true);
                            }}
                            onChangeText={handleSetPassword}
                            value={password}
                            autoComplete={'password-new'}
                            autoCorrect={false}
                            keyboardType={'default'}
                            placeholder={'Enter your password'}
                            returnKeyLabel={'done'}
                            secureTextEntry={true}
                            textContentType={'password'}
                            // label={'Password'}
                            errors={checkError(signUpErrors.password, validationResults.password)}
                        />
                    </View>
                    {Platform.OS === 'ios' && (
                        <View
                            style={{
                                alignItems: 'center',
                                paddingBottom: 20,
                                backgroundColor: colors.background,
                            }}
                        >
                            <Button
                                disabled={!(username && password && email) && isLoading}
                                onPress={() => submitSignUp(username, email, password)}
                                labelStyle={{ color: colors.background, fontFamily: 'Outfit-Bold' }}
                                style={{
                                    marginBottom: 20,
                                    marginTop: 15,
                                    backgroundColor: colors.primary,
                                    borderColor: colors.primary,
                                    flex: 0,
                                    justifyContent: 'center',
                                    borderWidth: 1.7,
                                    width: ptValue,
                                    height: 50,
                                }}
                            >
                                Sign Up
                            </Button>
                            {/* <Button onPress={() => navigation.goBack()} textColor = {colors.text} style={{ flex:0, justifyContent:'center', backgroundColor: colors.background, borderColor: colors.text, borderWidth:1.7, width:ptValue, height:50}}>Cancel</Button> */}
                            <MemareeText
                                style={{ color: colors.text, textAlign: 'center', fontSize: 13 }}
                            >
                                By signing up, you agree to our <LinkToTermsOfUse /> and{' '}
                                <LinkToPrivacyPolicy />.
                            </MemareeText>
                        </View>
                    )}
                </ScrollView>
            </KeyboardAvoidingView>
            {Platform.OS === 'android' && (
                <View
                    style={{
                        alignItems: 'center',
                        paddingBottom: 20,
                        backgroundColor: colors.background,
                    }}
                >
                    <Button
                        disabled={!(username && password && email) && isLoading}
                        onPress={() => submitSignUp(username, email, password)}
                        labelStyle={{ color: colors.background }}
                        style={{
                            marginBottom: 20,
                            marginTop: 15,
                            backgroundColor: colors.primary,
                            borderColor: colors.primary,
                            flex: 0,
                            justifyContent: 'center',
                            borderWidth: 1.7,
                            width: ptValue,
                            height: 50,
                        }}
                    >
                        Sign Up
                    </Button>
                    {/* <Button onPress={() => navigation.goBack()} textColor = {colors.text} style={{ flex:0, justifyContent:'center', backgroundColor: colors.background, borderColor: colors.text, borderWidth:1.7, width:ptValue, height:50}}>Cancel</Button> */}
                    <MemareeText style={{ color: colors.text, textAlign: 'center', fontSize: 13 }}>
                        By signing up, you agree to our <LinkToTermsOfUse /> and{' '}
                        <LinkToPrivacyPolicy />.
                    </MemareeText>
                </View>
            )}
        </SafeAreaView>
    );
};

export default CreateAccountDetailsScreen;

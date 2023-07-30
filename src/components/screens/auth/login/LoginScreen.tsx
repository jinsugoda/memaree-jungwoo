import React, { useEffect, useLayoutEffect, useState } from 'react';
import {
    Dimensions,
    Image,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    View,
} from 'react-native';
import { Button } from 'react-native-paper';

// types
import { StackNavigationProp } from '@react-navigation/stack';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from 'types/Screens';
import { CustomTheme } from 'styles/theme/customThemeProps';

// 3rd party hooks
import useAuth from 'hooks/useAuth';
import { useHeaderHeight } from '@react-navigation/elements';
import { useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

// custom components
import MemareeInput from 'components/common/textAndInputs/MemareeInput';
import MemareeText from 'components/common/textAndInputs/MemareeText';

// styles
import { Colors } from 'styles';
import { ImageRotationFix } from 'styles/stylesheets/imagesStyles';

type LoginScreenProps = NativeStackScreenProps<RootStackParamList, 'LoginScreen'>;

const LoginScreen = (props: LoginScreenProps) => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const screenWidth = Dimensions.get('window').width;
    const headerHeight = useHeaderHeight();
    const ptValue = screenWidth * 0.9;
    const { colors }: CustomTheme = useTheme();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [loginSubmitted, setLoginSubmitted] = useState(false);
    const { login, errors, isLoading, isErrored, requiresConfirmation } = useAuth();
    const [keyboardStatus, setKeyboardStatus] = useState(true);

    useLayoutEffect(() => {
        const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
            setKeyboardStatus(true);
        });
        const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardStatus(false);
        });

        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, []);

    const submitLogin = async (username: string, password: string) => {
        if (loginSubmitted) {
            return;
        }
        setLoginSubmitted(true);
        await login(username, password);
        setTimeout(() => setLoginSubmitted(false), 2000);
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

    return (
        <SafeAreaView
            style={{
                flex: 1,
                alignItems: 'center',
                flexDirection: 'column',
                justifyContent: 'center',
            }}
        >
            {
                <Image
                    source={require('assets/memaree.png')}
                    style={[
                        {
                            width: 200,
                            height: keyboardStatus ? 0 : 200,
                            alignSelf: 'center',
                        },
                        ImageRotationFix,
                    ]}
                />
            }
            <KeyboardAvoidingView
                style={{
                    justifyContent: 'center',
                    flex: 1,
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
                behavior={Platform.select({ ios: 'position' })}
                keyboardVerticalOffset={headerHeight + Platform.select({ ios: 0, android: 200 })}
            >
                <ScrollView
                    style={{
                        overflow: 'visible',
                    }}
                    contentContainerStyle={{
                        alignItems: 'center',
                        flex: Platform.OS === 'ios' ? 1 : 0,
                    }}
                    keyboardDismissMode="interactive"
                    keyboardShouldPersistTaps="always"
                >
                    <View style={{ flex: 1 }}></View>
                    {isErrored && (
                        <MemareeText style={{ color: Colors.error }}>{errors.login}</MemareeText>
                    )}
                    <MemareeInput
                        onFocus={() => {
                            setKeyboardStatus(true);
                        }}
                        onChangeText={setUsername}
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
                        containerStyle={{
                            alignItems: 'center',
                        }}
                    />
                    <MemareeInput
                        onFocus={() => {
                            setKeyboardStatus(true);
                        }}
                        autoCapitalize={'none'}
                        onChangeText={setPassword}
                        value={password}
                        autoComplete={'password'}
                        autoCorrect={false}
                        keyboardType={'default'}
                        placeholder={'Enter your password'}
                        returnKeyLabel={'done'}
                        secureTextEntry={true}
                        textContentType={'password'}
                        containerStyle={{
                            alignItems: 'center',
                        }}
                    />
                    <Button
                        onPress={() => submitLogin(username, password)}
                        disabled={!(username && password)}
                        loading={isLoading}
                        labelStyle={{
                            color: loginSubmitted ? 'white' : 'black',
                            fontFamily: 'Outfit-Bold',
                        }}
                        style={{
                            backgroundColor: loginSubmitted ? '#2F2F2F' : colors.tertiary,
                            borderColor: loginSubmitted ? '#2F2F2F' : colors.tertiary,
                            borderWidth: 1.7,
                            marginBottom: 20,
                            marginTop: 20,
                            paddingVertical: 2,
                            alignSelf: 'center',
                            width: ptValue,
                        }}
                    >
                        Log In
                    </Button>
                    <Button
                        onPress={() =>
                            navigation.navigate('ForgotPasswordScreen', { username: username })
                        }
                        textColor={colors.text}
                        labelStyle={{ fontFamily: 'Outfit-Bold' }}
                        style={{
                            backgroundColor: colors.background,
                            marginBottom: 20,
                            alignSelf: 'center',
                            width: ptValue,
                        }}
                    >
                        Forgot Password
                    </Button>
                    <MemareeText
                        style={{
                            color: colors.text,
                            textAlign: 'center',
                            fontSize: 13,
                            paddingBottom: 20,
                            alignSelf: 'center',
                            width: ptValue,
                        }}
                    >
                        By logging in, you agree to our <LinkToTermsOfUse /> and{' '}
                        <LinkToPrivacyPolicy />.
                    </MemareeText>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default LoginScreen;

import React, { useEffect } from 'react';
import { Dimensions, Image, SafeAreaView, View } from 'react-native';
import { Button } from 'react-native-paper';

// types
import { StackNavigationProp } from '@react-navigation/stack';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from 'types/Screens';
import { CustomTheme } from 'styles/theme/customThemeProps';

// 3rd party hooks
import useAuth from 'hooks/useAuth';
import { useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

// custom components
import MemareeText from 'components/common/textAndInputs/MemareeText';

// styles
import { AccountCreation } from 'styles';
import { ImageRotationFix } from 'styles/stylesheets/imagesStyles';

type LoginScreenProps = NativeStackScreenProps<RootStackParamList, 'LoginSignupScreen'>;

const LoginSignupScreen = (props: LoginScreenProps) => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const { colors }: CustomTheme = useTheme();
    const screenWidth = Dimensions.get('window').width;
    const ptValue = screenWidth * 0.9;
    const pressable = false;

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
        <SafeAreaView style={[AccountCreation.container]}>
            <View style={{ flex: 0, alignItems: 'center', width: '100%', marginBottom: 50 }}>
                <Image
                    source={require('assets/memaree.png')}
                    style={[{ width: 200, height: 200 }, ImageRotationFix]}
                />
                <MemareeText
                    style={{
                        color: colors.text,
                        fontSize: 30,
                        textAlign: 'center',
                    }}
                >
                    Connect with yourself, then everything else.
                </MemareeText>
            </View>
            <View style={{ flex: 0, alignItems: 'center', width: '100%', marginBottom: 50 }}>
                <Button
                    onPress={() => navigation.navigate('LoginScreen')}
                    disabled={pressable}
                    labelStyle={{ color: pressable ? 'white' : 'black', fontFamily: 'Outfit-Bold' }}
                    style={{
                        marginBottom: 20,
                        backgroundColor: pressable ? '#2F2F2F' : colors.primary,
                        borderColor: pressable ? '#2F2F2F' : colors.primary,
                        flex: 0,
                        justifyContent: 'center',
                        borderWidth: 1.7,
                        width: ptValue,
                        height: 50,
                    }}
                >
                    Log In
                </Button>
                <Button
                    onPress={() => navigation.navigate('CreateAccountDetailsScreen')}
                    disabled={pressable}
                    labelStyle={{ color: pressable ? 'white' : 'black', fontFamily: 'Outfit-Bold' }}
                    style={{
                        backgroundColor: pressable ? '#2F2F2F' : colors.tertiary,
                        borderColor: pressable ? '#2F2F2F' : colors.tertiary,
                        flex: 0,
                        justifyContent: 'center',
                        borderWidth: 1.7,
                        width: ptValue,
                        height: 50,
                    }}
                >
                    Sign Up
                </Button>
            </View>
            <View style={{ flex: 0, justifyContent: 'center', paddingBottom: 20 }}>
                <MemareeText style={{ color: colors.text, textAlign: 'center', fontSize: 13 }}>
                    By logging in, you agree to our <LinkToTermsOfUse /> and <LinkToPrivacyPolicy />
                    .
                </MemareeText>
            </View>
        </SafeAreaView>
    );
};

export default LoginSignupScreen;

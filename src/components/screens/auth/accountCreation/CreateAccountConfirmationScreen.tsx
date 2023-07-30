import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';

// types
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from 'types/Screens';

// 3rd party hooks
import useAuth from 'hooks/useAuth';

// custom component
import MemareeInput from 'components/common/textAndInputs/MemareeInput';
import MemareeButton from 'components/common/buttons/other/MemareeLogoButton';

// styles
import { AccountCreation } from 'styles';

type CreateAccountConfirmationScreenProps = NativeStackScreenProps<
    RootStackParamList,
    'CreateAccountConfirmationScreen'
>;

const CreateAccountConfirmationScreen = (props: CreateAccountConfirmationScreenProps) => {
    const { navigation, route } = props;
    const { username } = route?.params;
    const { cognitoUser, submitCode, resendCode, isLoading, errors, requiresConfirmation } =
        useAuth();

    const [code, setCode] = useState('');
    const handleSubmitCode = () => {
        submitCode(username, code).then((result) => {
            //console.log("submit confirmation code result: ", result)
        });
    };
    useEffect(() => {
        if (!requiresConfirmation && typeof cognitoUser !== 'undefined' && cognitoUser) {
            navigation.reset({
                index: 0,
                routes: [{ name: 'OnboardingScreen' }],
            });
        }
    }, [cognitoUser, requiresConfirmation]);

    return (
        <SafeAreaView style={AccountCreation.container}>
            <MemareeInput
                autoCapitalize={'none'}
                onChangeText={setCode}
                value={code}
                autoCorrect={false}
                keyboardType={'number-pad'}
                autoFocus={true}
                placeholder={'Code'}
                returnKeyLabel={'next'}
                secureTextEntry={false}
                textContentType={'oneTimeCode'}
                label={'Confirmation Code'}
                errors={errors?.submitCode}
            />
            <MemareeButton
                text={'Submit'}
                disabled={!code || isLoading}
                onPress={() => handleSubmitCode()}
                loading={isLoading}
            />
            <MemareeButton
                text={'Resend Code'}
                secondary
                onPress={() => resendCode(username)}
                loading={isLoading}
            />
        </SafeAreaView>
    );
};

export default CreateAccountConfirmationScreen;

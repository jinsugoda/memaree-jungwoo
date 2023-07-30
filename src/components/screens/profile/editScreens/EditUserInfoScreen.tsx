import React, { useEffect } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Button, HelperText, TextInput } from 'react-native-paper';
import { Avatar } from '@rneui/base';

// types
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from 'types/Screens';

// 3rd party hooks
import { useNavigation } from '@react-navigation/native';
import { useHeaderHeight } from '@react-navigation/elements';

// utils - validators
import { validateEmail, validatePhoneNumber } from 'utils/validators';

// styles
import { ProfileStyles } from 'styles';
import { screenRoot } from 'styles/stylesheets/ScreenStyles';

// constants
import { PROFILE_EDIT_TEMP_DATA } from 'utils/dataExamples/User';

const EditUserInfoScreen = () => {
    const [usernameText, setUsernameText] = React.useState(PROFILE_EDIT_TEMP_DATA.username);
    const [emailText, setemailText] = React.useState(PROFILE_EDIT_TEMP_DATA.email);
    const [phoneText, setPhoneText] = React.useState(PROFILE_EDIT_TEMP_DATA.phone);
    const [bioText, setBioText] = React.useState(PROFILE_EDIT_TEMP_DATA.bio);
    const [usernameValid, setUsernameValid] = React.useState(true);
    const [emailValid, setEmailValid] = React.useState(true);
    const [phoneValid, setPhoneValid] = React.useState(true);
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const headerHeight = useHeaderHeight();

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Button
                    mode="outlined"
                    textColor="black"
                    labelStyle={ProfileStyles.EditUserInfoScreenHeaderRightButtonLabel}
                    style={ProfileStyles.EditUserInfoScreenHeaderRightButton}
                    disabled={!(usernameValid && emailValid && phoneValid)}
                    onPress={() => onPressSave()}
                >
                    Save
                </Button>
            ),
        });
    }, []);

    const onPressSave = () => {
        alert('saved!');
        // do some updating
        navigation.goBack();
    };

    return (
        <SafeAreaProvider style={screenRoot}>
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
                        flex: Platform.OS === 'ios' ? 1 : 0,
                    }}
                    keyboardDismissMode="interactive"
                    keyboardShouldPersistTaps="handled"
                >
                    <Avatar
                        rounded
                        source={{
                            uri: 'https://randomuser.me/api/portraits/men/41.jpg',
                        }}
                        containerStyle={{ ...ProfileStyles.containerStyle }}
                        size={100}
                    >
                        <Avatar.Accessory
                            name="camera-plus-outline"
                            type="material-community"
                            color="black"
                            style={{
                                borderColor: 'black',
                                borderWidth: 1,
                                backgroundColor: 'white',
                            }}
                            size={25}
                            onPress={() => alert('change image menu')}
                        />
                    </Avatar>
                    <TextInput
                        label="Username"
                        mode="outlined"
                        outlineStyle={{ ...ProfileStyles.outlineStyle }}
                        style={ProfileStyles.textInput}
                        value={usernameText}
                        onChangeText={(text) => {
                            setUsernameValid(text.length > 16 || 0 >= text.length);
                            setUsernameText(text);
                        }}
                    />
                    <HelperText type="error" visible={!usernameValid}>
                        Username must be within 16 characters and not empty.
                    </HelperText>
                    <TextInput
                        label="Email"
                        mode="outlined"
                        outlineStyle={{ ...ProfileStyles.outlineStyle }}
                        style={ProfileStyles.textInput}
                        value={emailText}
                        onChangeText={(text) => {
                            setEmailValid(validateEmail(text));
                            setemailText(text);
                        }}
                    />
                    <HelperText type="error" visible={!emailValid}>
                        Email address is invalid!
                    </HelperText>
                    <TextInput
                        label="Phone"
                        mode="outlined"
                        outlineStyle={{ ...ProfileStyles.outlineStyle }}
                        style={ProfileStyles.textInput}
                        value={phoneText}
                        onChangeText={(text) => {
                            setPhoneValid(validatePhoneNumber(text));
                            setPhoneText(text);
                        }}
                    />
                    <HelperText type="error" visible={!phoneValid}>
                        Phone number is invalid!
                    </HelperText>
                    <TextInput
                        label="Bio"
                        mode="outlined"
                        outlineStyle={{ ...ProfileStyles.outlineStyle }}
                        style={ProfileStyles.textInput}
                        multiline={true}
                        numberOfLines={10}
                        value={bioText}
                        onChangeText={(text) => setBioText(text)}
                    />
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaProvider>
    );
};

export default EditUserInfoScreen;

import React, { useEffect, useState } from 'react';
import { SafeAreaView, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Button } from 'react-native-paper';
import { TextInput } from 'react-native-gesture-handler';

// types
import { RootStackParamList } from 'types/Screens';
import { StackNavigationProp } from '@react-navigation/stack';
import { CustomTheme } from 'styles/theme/customThemeProps';

// redux
import { selectUser, setUser } from 'store/slices/userSlice';

// 3rd party hooks
import { useNavigation } from '@react-navigation/native';
import { gql, useMutation } from '@apollo/client';
import { useTheme } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';

// custom components
import MemareeText from 'components/common/textAndInputs/MemareeText';
import GradientAvatar from 'components/common/avatars/single/GradientAvatar';
import {
    input,
    inputCounter,
    inputError,
    inputGroup,
    inputHead,
    inputLabel,
} from './editScreenStyles';

const UPDATE_USER_PROFILE = gql`
    mutation Mutation($set: UserUpdateInput!, $query: UserQueryInput) {
        updateOneUser(set: $set, query: $query) {
            _id
        }
    }
`;
const GET_USER_PROFILE = gql`
    query Query($query: UserQueryInput) {
        user(query: $query) {
            _id
            profilePicUrl
            username
            bio
            displayName
        }
    }
`;

const MAX_BIO_LINES = 6;

export const EditProfileScreen = () => {
    const { colors }: CustomTheme = useTheme();
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const user = useSelector(selectUser);

    console.log(user);

    const [displayName, setDisplayName] = useState('');
    const [bio, setBio] = useState('');
    const [username, setUsername] = useState('');
    const [bioError, setBioError] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const dispatch = useDispatch();

    const [updateOneUser] = useMutation(UPDATE_USER_PROFILE);

    useEffect(() => {
        if (user) {
            setDisplayName(user?.displayName);
            setUsername(user?.username);
            setBio(user?.bio);
        }
    }, [user]);

    const isDataValid = !bioError && !usernameError;

    const updateProfile = async () => {
        if (!isDataValid) return;

        await updateOneUser({
            variables: {
                set: {
                    bio,
                    username,
                    displayName,
                },
                query: {
                    _id: user?._id,
                },
            },
        });

        dispatch(setUser({ ...user, bio, username, displayName }));

        navigation.goBack();
    };

    const handleUpdateBio = (value: string) => {
        setBio(value);

        const lines = value.split('\n');

        if (lines.length > MAX_BIO_LINES) {
            setBioError('Maximum lines for your bio is 6');
        } else {
            setBioError('');
        }
    };

    const handleUpdateUsername = (value: string) => {
        setUsername(value);

        if (value.includes(' ')) {
            setUsernameError('Username should not include spaces');
        } else {
            setUsernameError('');
        }
    };

    console.log(isDataValid);

    return (
        <SafeAreaView>
            <KeyboardAwareScrollView style={{ paddingHorizontal: 16, marginBottom: 32 }}>
                <View>
                    <View style={{ alignItems: 'center', marginBottom: 16 }}>
                        <GradientAvatar
                            source={user.profilePicUrl}
                            size={110}
                            style={{ marginBottom: 12 }}
                            editable
                        />
                    </View>
                    <View style={[inputGroup]}>
                        <View style={[inputHead]}>
                            <MemareeText style={[inputLabel, { color: colors.text }]}>
                                Name:
                            </MemareeText>
                            <MemareeText style={[inputCounter]}>
                                {displayName?.length ?? 0}/24
                            </MemareeText>
                        </View>
                        <TextInput
                            style={[input, { color: colors.text }]}
                            cursorColor={colors.text}
                            placeholderTextColor={colors.text}
                            onChangeText={(value) => setDisplayName(value)}
                            value={displayName}
                            placeholder="Enter Name"
                            maxLength={24}
                            autoCorrect={false}
                        />
                    </View>
                    <View style={[inputGroup]}>
                        <View style={[inputHead]}>
                            <MemareeText style={[inputLabel, { color: colors.text }]}>
                                About:
                            </MemareeText>
                            <MemareeText style={[inputCounter]}>{bio?.length ?? 0}/150</MemareeText>
                        </View>
                        <TextInput
                            style={[input, { color: colors.text, minHeight: 100 }]}
                            numberOfLines={6}
                            textAlignVertical={'top'}
                            maxLength={150}
                            multiline={true}
                            cursorColor={colors.text}
                            placeholderTextColor={colors.text}
                            onChangeText={(value) => handleUpdateBio(value)}
                            value={bio}
                            placeholder="Say something about yourself."
                        />
                        {bioError && <MemareeText style={[inputError]}>{bioError}</MemareeText>}
                    </View>
                    <View style={[inputGroup]}>
                        <View style={[inputHead]}>
                            <MemareeText style={[inputLabel, { color: colors.text }]}>
                                Username:
                            </MemareeText>
                            <MemareeText style={[inputCounter]}>
                                {username?.length ?? 0}/24
                            </MemareeText>
                        </View>
                        <TextInput
                            style={[input, { color: colors.text }]}
                            cursorColor={colors.text}
                            placeholderTextColor={colors.text}
                            onChangeText={(value) => handleUpdateUsername(value)}
                            value={username}
                            placeholder="Enter Name"
                            maxLength={24}
                            autoCorrect={false}
                        />
                        {usernameError && (
                            <MemareeText style={[inputError]}>{usernameError}</MemareeText>
                        )}
                    </View>
                </View>
                <Button
                    onPress={updateProfile}
                    disabled={!isDataValid}
                    labelStyle={{
                        color: colors.background,
                        fontFamily: 'Outfit-Bold',
                    }}
                    style={{
                        backgroundColor: isDataValid ? colors.tertiary : '#2F2F2F',
                        paddingHorizontal: 32,
                        alignSelf: 'center',
                    }}
                >
                    Done
                </Button>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    );
};

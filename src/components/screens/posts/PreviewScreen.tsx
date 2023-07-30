import React, { useEffect, useState } from 'react';
import { View, Image, Dimensions } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { TextInput, Switch, Divider, Button, useTheme } from 'react-native-paper';
import * as Location from 'expo-location';
import { Video, ResizeMode } from 'expo-av';

// types
import { RootStackParamList } from 'types/Screens';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CustomTheme } from 'styles/theme/customThemeProps';
import { gql } from '@apollo/client';

// 1st party hooks
import { useMedia } from 'hooks/useMedia';

// 3rd party hooks
import { useHeaderHeight } from '@react-navigation/elements';
import { useMutation } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';

// custom components
import MemareeText from 'components/common/textAndInputs/MemareeText';

// gpl mutations
import { CREATE_POST } from './gpl/postingMutations';
const UPDATE_USER_PROFILE = gql`
    mutation UpdateOneUser($set: UserUpdateInput!, $query: UserQueryInput!) {
        updateOneUser(set: $set, query: $query) {
            _id
        }
    }
`;

// redux
import { selectUser, selectUserId, setUserProfilePicUrl } from 'store/slices/userSlice';

// styles
import { PreviewStyles } from 'styles';
import { ImageRotationFix } from 'styles/stylesheets/imagesStyles';

// svgs
import CircleButtonSVG from 'assets/buttonIcons/features/CircleIcon.svg';
import VisionButtonSVG from 'assets/buttonIcons/features/VisionIcon.svg';
import { TouchableOpacity } from 'react-native-gesture-handler';

type TaggedUser = {
    _id: string;
    username: string;
};

type PreviewScreenProps = NativeStackScreenProps<RootStackParamList, 'PreviewScreen'>;

const PreviewScreen = (props: PreviewScreenProps) => {
    // Access the context and its values using useContext
    const { onMediaVerified, setIsAvatar, isSharedToVision, setIsSharedToVision, cacheImage } =
        useMedia();

    const screenWidth = Dimensions.get('window').width;
    const ptValue = screenWidth * (45 / 100);
    const { colors }: CustomTheme = useTheme();
    const headerHeight = useHeaderHeight();

    const [alreadySent, setAlreadySent] = useState(false);
    const [captionText, setCaptionText] = useState('');
    const [isExperienceSwitchOn, setIsExperienceSwitchOn] = useState(false);
    const [isVisionSwitchOn, setIsVisioneSwitchOn] = useState(isSharedToVision);

    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);

    const dispatch = useDispatch();
    const userId = useSelector(selectUserId);
    const { navigation, route } = props;
    const { mediaUri, imageBase64, type } = route.params;
    const video = React.useRef(null);

    const [mutateFunction, { data, loading, error }] = useMutation(CREATE_POST);
    const [updateUserProfile, { loading: loadingLazy, error: errorLazy, data: dataLazy }] =
        useMutation(UPDATE_USER_PROFILE);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.log('Permission to access location was denied');
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLatitude(location.coords.latitude);
            setLongitude(location.coords.longitude);
            setLocation(location.coords);
        })();
        return () => {
            setAlreadySent(false);
            setIsAvatar(false);
            setIsSharedToVision(false);
        };
    }, []);

    const createPost = async () => {
        const variables = {
            userId: userId,
            imageUrls: [mediaUri.split('/').pop()],
            caption: captionText,
            createdAt: new Date(),
            lat: latitude ?? 0.0,
            lon: longitude ?? 0.0,
            isSharedToVision: isSharedToVision,
            isSharedToCircle: isExperienceSwitchOn,
            base64: false,
        };

        mutateFunction({
            variables: variables,
        }).then((result) => {
            // CACHING (COMMENTED OUT FOR NOW)
            let correctFeed: string;

            if (isSharedToVision) {
                correctFeed = 'VisionScreen';
            } else if (isExperienceSwitchOn) {
                correctFeed = 'CircleScreen';
            } else {
                correctFeed = 'MemareeScreen';
            }
            let toCache = mediaUri.split('/').pop();
            console.log('toCache', toCache);
            cacheImage(toCache, imageBase64).then(() => {
                navigation.reset({
                    index: 0,
                    routes: [
                        {
                            name: 'HomeScreen',
                            params: {
                                screen: 'FeedScreen',
                                params: { screen: correctFeed },
                            },
                        },
                    ],
                });
            });
        });
    };

    const createScene = () => {
        //     variables: {
        //         _id: "1",
        //         // type: "media",
        //         type: mediaType,
        //         // TODO: postType: isVisionSwitchOn ? "vision" : isExperienceSwitchOn ? "experience" : "memaree",
        //         content: {
        //             imageUrls: [mediaUri],
        //             caption: captionText,
        //         },
        //         // TODO: filters: filters,
        //         // TODO: taggedUsers: taggedUsers,
        //     },
        // });
        // TODO: Navigate to single lane screen...
        // navigation.navigate('HomeScreen', { screen: 'Lanes' });
    };

    const onPressSave = async () => {
        try {
            if (alreadySent) {
                return;
            }
            setAlreadySent(true);
            setIsVisioneSwitchOn(isSharedToVision);
            switch (type) {
                case 'createPost':
                    await onMediaVerified(false);
                    createPost();
                    break;
                case 'createScene':
                    await onMediaVerified(false);
                    createScene();
                    break;
                case 'avatarUpload':
                    setIsAvatar(true);
                    await onMediaVerified(true);
                    handleAvatarUpload();
                    break;
            }
        } catch (err) {
            console.log('could not save err: ', err);
        } finally {
            setTimeout(() => setAlreadySent(false), 2000);
        }
    };

    const handleAvatarUpload = () => {
        const prepped_out = mediaUri.split('/').pop();
        updateUserProfile({
            variables: {
                set: {
                    profilePicUrl: prepped_out,
                },
                query: {
                    _id: userId,
                },
            },
            onCompleted: () => {
                cacheImage(prepped_out, imageBase64).then(() => {
                    dispatch(setUserProfilePicUrl(prepped_out));
                    navigation.navigate('EditProfileScreen');
                });
            },
        });

        //tracking upload mutation status
        if (loading) return 'Uploading..';
        if (error) return `Error occoured while uploading ${error.message}`;
    };

    if (route.params === undefined) {
        return (
            <View>
                <MemareeText style={{ color: colors.text }}>Undefined</MemareeText>
            </View>
        );
    }
    return (
        <SafeAreaProvider
            style={[PreviewStyles.safeAreaProvider, { backgroundColor: colors.background }]}
        >
            <KeyboardAwareScrollView
                style={{ flex: 1 }}
                viewIsInsideTabBar={true}
                extraHeight={headerHeight + 210}
                enableOnAndroid={true}
                keyboardDismissMode="interactive"
                keyboardShouldPersistTaps={'handled'}
            >
                <View style={PreviewStyles.container}>
                {
                    props.route.params.mediaType === 'video'?
                    <View
                        style={PreviewStyles.imageContainer}>
                        <Video
                            ref={video}
                            style={{width:"100%", aspectRatio: 4/5}}
                            source={{
                                uri: props.route.params.mediaUri,
                            }}
                            useNativeControls
                            resizeMode={ResizeMode.COVER}
                            isLooping
                            shouldPlay={true}
                        >
                        </Video>
                    </View>

                    :
                    <View style={PreviewStyles.imageContainer}>
                        <Image
                            // source={{ uri: (mediaUri.slice(0, 5) === 'data:') ? mediaUri : ('data:image/png;base64,' + mediaUri)}}
                            source={{ uri: 'data:image/png;base64,' + imageBase64 }}
                            //resizeMethod="scale"
                            style={[
                                PreviewStyles.image,
                                ImageRotationFix,
                                { aspectRatio: type === 'avatarUpload' ? 1 : 0.8 },
                            ]}
                            resizeMode="cover"
                        />
                    </View>
                }
                    {type === 'avatarUpload' ? (
                        <>
                            <View style={[PreviewStyles.actions, { marginTop: '10%' }]}>
                                <Button
                                    style={[
                                        PreviewStyles.action,
                                        { width: ptValue, borderColor: colors.tertiary },
                                    ]}
                                    labelStyle={{
                                        color: colors.tertiary,
                                        fontFamily: 'Outfit-Bold',
                                    }}
                                    textColor="#273737"
                                    mode="outlined"
                                    onPress={() => navigation.navigate('SelfProfileScreen')}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    disabled={loadingLazy === true || alreadySent}
                                    labelStyle={{
                                        color: loadingLazy === true ? 'white' : 'black',
                                        fontFamily: 'Outfit-Bold',
                                    }}
                                    buttonColor={colors.tertiary}
                                    style={[
                                        PreviewStyles.action,
                                        {
                                            width: ptValue,
                                            backgroundColor:
                                                loadingLazy === true ? '#2F2F2F' : colors.tertiary,
                                            borderColor:
                                                loadingLazy === true ? '#2F2F2F' : colors.tertiary,
                                        },
                                    ]}
                                    onPress={
                                        loadingLazy || alreadySent ? () => {} : () => onPressSave()
                                    }
                                >
                                    {loadingLazy === true ? 'Saving...' : 'Save'}
                                </Button>
                            </View>
                        </>
                    ) : (
                        <>
                            <TextInput
                                mode="outlined"
                                outlineStyle={[
                                    PreviewStyles.textInputOutline,
                                    { backgroundColor: colors.background },
                                ]}
                                style={[
                                    PreviewStyles.textInput,
                                    {
                                        backgroundColor: '#2F2F2F',
                                        marginBottom: 10,
                                        fontFamily: 'Outfit-Bold',
                                    },
                                ]}
                                placeholderTextColor={colors.text}
                                textColor={colors.text}
                                multiline={true}
                                numberOfLines={4}
                                value={captionText}
                                cursorColor={colors.text}
                                onChangeText={(text) => setCaptionText(text)}
                                placeholder="Write a caption"
                            />
                            <View style={[PreviewStyles.switchGroup, { marginTop: '0%' }]}>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    <CircleButtonSVG fill={colors.text} />
                                    <MemareeText
                                        style={[
                                            PreviewStyles.memareeText,
                                            { color: colors.text, marginLeft: 10 },
                                        ]}
                                    >
                                        Circle
                                    </MemareeText>
                                    <MemareeText
                                        style={[
                                            PreviewStyles.memareeText,
                                            {
                                                color: colors.text,
                                                marginLeft: -5,
                                                fontSize: 12,
                                            },
                                        ]}
                                    >
                                        Private, only people in your
                                    </MemareeText>
                                </View>
                                <Switch
                                    value={isExperienceSwitchOn}
                                    onValueChange={() => setIsExperienceSwitchOn((prev) => !prev)}
                                    trackColor={{ false: colors.text, true: colors.tertiary }}
                                    thumbColor="white"
                                    ios_backgroundColor="white"
                                    style={PreviewStyles.switchInput}
                                />
                            </View>
                            <View style={PreviewStyles.switchGroup}>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    <VisionButtonSVG fill={colors.text} />
                                    <MemareeText
                                        style={[
                                            PreviewStyles.memareeText,
                                            { color: colors.text, marginLeft: 10 },
                                        ]}
                                    >
                                        Vision
                                    </MemareeText>
                                    <MemareeText
                                        style={[
                                            PreviewStyles.memareeText,
                                            {
                                                color: colors.text,
                                                marginLeft: -5,
                                                fontSize: 12,
                                            },
                                        ]}
                                    >
                                        Public, anyone in the the app.
                                    </MemareeText>
                                </View>
                                <Switch
                                    value={alreadySent ? isVisionSwitchOn : isSharedToVision}
                                    onValueChange={() => setIsSharedToVision((prev) => !prev)}
                                    trackColor={{ false: colors.text, true: colors.tertiary }}
                                    thumbColor="white"
                                    ios_backgroundColor="white"
                                    style={PreviewStyles.switchInput}
                                />
                            </View>
                            <MemareeText
                                style={{
                                    color: colors.text,
                                    fontSize: 12,
                                    textAlign: 'center',
                                    marginBottom: 10,
                                    marginTop: 0,
                                }}
                            >
                                Anything you share is remembered on your private Memaree feed.
                            </MemareeText>
                            <Divider />
                            <View style={[PreviewStyles.actions, { marginTop: 10 }]}>
                                <Button
                                    style={[
                                        PreviewStyles.action,
                                        { width: ptValue, borderColor: colors.tertiary },
                                    ]}
                                    labelStyle={{
                                        color: colors.tertiary,
                                        fontFamily: 'Outfit-Bold',
                                    }}
                                    textColor="#273737"
                                    mode="outlined"
                                    // onPress={() => navigation.goBack()}
                                    onPress={() => navigation.navigate('HomeScreen')}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    //   labelStyle={wideText}
                                    labelStyle={{
                                        color: colors.background,
                                        fontFamily: 'Outfit-Bold',
                                    }}
                                    buttonColor={colors.tertiary}
                                    style={[PreviewStyles.action, { width: ptValue }]}
                                    onPress={
                                        loading || alreadySent ? () => {} : () => onPressSave()
                                    }
                                >
                                    {loading || alreadySent ? 'Loading' : 'Share'}
                                </Button>
                            </View>
                        </>
                    )}
                </View>
            </KeyboardAwareScrollView>
        </SafeAreaProvider>
    );
};

export default PreviewScreen;

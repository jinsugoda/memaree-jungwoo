import React, { MutableRefObject, useEffect, useState } from 'react';
import { Pressable, Button, Text, View, LogBox, StyleProp, ViewStyle } from 'react-native';
import BottomSheet, { BottomSheetBackdropProps, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome/index';
import { Icon, Divider } from '@rneui/base';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';

// types
import { RootStackParamList } from 'types/Screens';
import { StackNavigationProp } from '@react-navigation/stack';

// 3rd party hooks
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'react-native-paper';
import { useMedia } from 'hooks/useMedia';

// custom components
import MemareeText from 'components/common/textAndInputs/MemareeText';

// styles
import { CustomTheme } from 'styles/theme/customThemeProps';
import { HomeStyles, InputStyles } from 'styles';

LogBox.ignoreLogs(['Non-serializable values were found in the navigation state']);

type AddScreenModalProps = {
    bottomSheetRef?: MutableRefObject<BottomSheet>;
};

const AddScreenModal = (props) => {
    const { colors }: CustomTheme = useTheme();
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const [hasCameraPermission, setHasCameraPermission] = useState(false);
    const [hasMicrophonePermission, setHasMicrophonePermission] = useState(false);

    // Access the context and its values using useContext
    const { setMediaUri, setMediaType } = useMedia();

    useEffect(() => {
        (async () => {
            const cameraPermission = await Camera.requestCameraPermissionsAsync();
            setHasCameraPermission(cameraPermission?.status === 'granted');
            const microphonePermission = await Camera.requestMicrophonePermissionsAsync();
            setHasMicrophonePermission(microphonePermission?.status === 'granted');
        })();
    }, []);

    const promptForPermissions = async () => {
        const cameraPermission = await Camera.requestCameraPermissionsAsync();
        setHasCameraPermission(cameraPermission?.status === 'granted');
        const microphonePermission = await Camera.requestMicrophonePermissionsAsync();
        setHasMicrophonePermission(microphonePermission?.status === 'granted');
    };

    const pickImage = async () => {
        try {
            // No permissions request is necessary for launching the image library
            let result = await ImagePicker?.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });
            if (!result?.canceled) {
                setMediaUri(result?.assets[0]?.uri);
                setMediaType(result?.assets[0]?.type);
                // navigation.navigate("EditingScreen", {mediaType: mediaType, mediaUri: mediaUri, onMediaVerified: onMediaVerified})
            }
            console.log('CANCELLED', result?.canceled);
        } catch (error) {
            console.error('ERROR', error);
        }
    };

    return (
        <BottomSheet
            ref={props.bottomSheetRef}
            snapPoints={['35%']}
            index={-1}
            detached={false}
            backdropComponent={(props: BottomSheetBackdropProps) => {
                return (
                    <BottomSheetBackdrop
                        {...props}
                        pressBehavior={'close'}
                        appearsOnIndex={0}
                        disappearsOnIndex={-1}
                    />
                );
            }}
            enablePanDownToClose={true}
            handleComponent={null}
            enableOverDrag={true}
            backgroundStyle={{ backgroundColor: colors.background }}
        >
            {hasCameraPermission === false ? (
                <>
                    <MemareeText style={HomeStyles.permissionsText}>
                        Permission for camera not granted. Please change this in settings.
                    </MemareeText>
                    <Button onPress={promptForPermissions} title="Permissions" />
                </>
            ) : (
                <View>
                    <View
                        style={[
                            HomeStyles.sheetHeaderContainer,
                            { backgroundColor: colors.background, borderRadius: 99 },
                        ]}
                    >
                        <Divider orientation="horizontal" width={1} />
                        <MemareeText style={[HomeStyles.sheetHeader, { color: colors.text }]}>
                            Create
                        </MemareeText>
                        <Pressable onPress={() => props?.bottomSheetRef.current?.close()}>
                            <FontAwesomeIcon color={colors.text} icon={'xmark'} />
                        </Pressable>
                    </View>

                    {/* Open Camera */}

                    <View
                        style={[
                            InputStyles.createNewPostItem,
                            { backgroundColor: colors.background },
                        ]}
                    >
                        <Icon
                            color={colors.text}
                            style={{
                                paddingLeft: 40,
                                paddingRight: 0,
                            }}
                            name={'camera-outline'}
                            type="material-community"
                            size={InputStyles.uploadIconSize - 2}
                            containerStyle={InputStyles.uploadIcons as StyleProp<ViewStyle>}
                        />
                        <MemareeText
                            style={[HomeStyles.option, { color: colors.text }]}
                            onPress={() => {
                                props?.bottomSheetRef?.current?.close();
                                navigation.navigate('TakePhotoScreen', {
                                    name: 'Post Picture',
                                    type: 'createPost',
                                });
                            }}
                        >
                            Create a Post
                        </MemareeText>
                    </View>

                    {/* Create a Lane */}
                    <View
                        style={[
                            InputStyles.createNewPostItem,
                            { backgroundColor: colors.background },
                        ]}
                    >
                        <Icon
                            color={colors.text}
                            style={{
                                paddingLeft: 40,
                                paddingRight: 0,
                            }}
                            name={'image-multiple-outline'}
                            type="material-community"
                            size={InputStyles.uploadIconSize}
                            containerStyle={InputStyles.uploadIcons as StyleProp<ViewStyle>}
                        />
                        <MemareeText
                            style={[HomeStyles.option, { color: colors.text }]}
                            onPress={() => {
                                props?.bottomSheetRef?.current?.close();
                                navigation.navigate('CreateGroupScreen');
                            }}
                        >
                            Create a Group
                        </MemareeText>
                    </View>
                    {/* Add a Scene */}
                    {/* <View style={[InputStyles.createNewPostItem, {backgroundColor: colors.background}]}>
            <Icon
              color={colors.text}
                style={{
                    paddingLeft: 40,
                    paddingRight: 0
                }}
                name={'image-outline'}
                type="material-community"
                size={InputStyles.uploadIconSize}
                containerStyle={ InputStyles.uploadIcons as StyleProp<ViewStyle>}
            />
            <MemareeText style={[HomeStyles.option, {color: colors.text}]} onPress={() => {
              pickImage();
            }}>
            Add a Scene
            </MemareeText>
            </View> */}
                </View>
            )}
        </BottomSheet>
    );
};

export default AddScreenModal;

import React, { useRef, useState } from 'react';
import { Dimensions, TouchableOpacity, View, StyleSheet } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import { Video } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Circle } from 'react-native-svg';

// types
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from 'types/Screens';
import { CustomTheme } from 'styles/theme/customThemeProps';

// 1st party hooks
import { useMedia } from 'hooks/useMedia';

// 3rd party hooks
import { useIsFocused } from '@react-navigation/native';
import { useTheme } from 'react-native-paper';

// utils
import Logger, { ErrorType } from 'utils/logger';

// styles
import { PostingStyles } from 'styles';

const CirclePhotoIcon = ({ fill }) => {
    const fill2 = 'black';
    return (
        <Svg height={200} width={200}>
            <Circle cx="100" cy="50" r="40" stroke={fill} stroke-width="10" fill={fill} />
            <Circle cx="100" cy="50" r="30" stroke={fill2} stroke-width="2" fill={fill} />
        </Svg>
    );
};

type TakePhotoProps = NativeStackScreenProps<RootStackParamList, 'TakePhotoScreen'>;
const deviceWidth = Dimensions.get('window').width;

// Show the Camera and buttons needed to navigate camera (gallery, flip, etc)
const TakePhotoScreen = (props: TakePhotoProps) => {
    const { colors }: CustomTheme = useTheme();

    const { navigation, route } = props;
    const { type } = route.params;

    const [circleColor, setCircleColor] = useState(colors.text);

    // Access the context and its values using useContext
    const {
        setMediaUri,
        setMediaType,
        handleTakePic,
        handlePickImage,
        setFileName,
        setImageBase64,
        onMediaVerified,
        setIsAvatar,
        setIsSharedToVision,
        handleTakeVideo
    } = useMedia();

    // Max length of video recording in seconds
    const MAX_VIDEO_DURATION = 10;
    const cameraRef = useRef<Camera>();
    let videoRef = useRef<Video>();

    const [videoRecordingStatus, setVideoRecordingStatus] = useState(false);
    const [videoPlayingStatus, setVideoPlayingStatus] = useState({});
    const [cameraType, setCameraType] = useState(CameraType.back);
    const [isCameraReady, setIsCameraReady] = useState(false);
    const onCameraReady = () => {
        setIsCameraReady(true);
    };

    // This handles this flipping from the front to back camera on the device.
    const handleCameraType = () => {
        setCameraType(cameraType === CameraType.back ? CameraType.front : CameraType.back);
    };

    const Retake = () => {
        setMediaType(null);
        setMediaUri(null);
    };

    // This is the gallery image selection option.
    const pickImage = async () => {
        return handlePickImage(PreviewPhoto);
    };

    const isFocused = useIsFocused();

    const takeVideo = async () => {
        if (cameraRef) {
            try {
                setVideoRecordingStatus(true);

                console.log('TAKING VIDEO...');
                setVideoRecordingStatus(true);

                // change color of circle...
                setCircleColor('red');
                 await handleTakeVideo(PreviewVideo, cameraRef);

                // WARNING: Happens during testing on emulator: Error: Call to function 'ExponentCamera.record' has been rejected. → Caused by: Camera is not running...
                const data = await cameraRef.current.recordAsync({
                    maxDuration: MAX_VIDEO_DURATION,
                });

                setMediaUri(data.uri);
                setFileName(data.uri.split('/').pop());
                setMediaType('video');
            } catch (error) {
                Logger(
                    ErrorType.OTHER,
                    'TakePhoto',
                    error,
                    'src/components/screens/posts/TakePhoto.tsx',
                    122,
                    0,
                    `Failed to take video.`,
                    null,
                    'NO ENDPOINT',
                    { props },
                );
            }
        }
    };

    const stopVideo = async () => {
        setVideoRecordingStatus(false);
        cameraRef.current.stopRecording();
    };

    // This takes the picture when the camera button is pressed
    const takePic = () => {
        handleTakePic(PreviewPhoto, cameraRef);
    };

    const PreviewPhoto = (uri, type, base64) => {
        navigation.navigate('PreviewScreen', {
            type: props.route.params.type,
            mediaUri: uri,
            mediaType: type,
            onMediaVerified: onMediaVerified,
            imageBase64: base64,
            setIsAvatar,
            setIsSharedToVision,
        });
    };

    const PreviewVideo = (uri, type) => {
        navigation.navigate('PreviewScreen', {
            type: props.route.params.type,
            mediaUri: uri,
            mediaType: type,
            onMediaVerified: onMediaVerified,
            imageBase64: '',
            setIsAvatar,
            setIsSharedToVision,
        });
    };

    return (
        <View style={styles.container_top_level}>
            <View style={{ flexBasis: '83%', justifyContent: 'center' }}>
                {isFocused && (
                    <Camera
                        style={[{ height: deviceWidth * 1.25 }]}
                        ref={cameraRef}
                        onCameraReady={onCameraReady}
                        type={cameraType}
                    />
                )}
            </View>

            <View style={styles.container_controls}>
                <TouchableOpacity style={styles.element_controls} onPress={() => pickImage()}>
                    <Ionicons
                        name="images-outline"
                        style={[PostingStyles.icon_images_outline]}
                        strokeWidth={6}
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.element_controls}
                    disabled={!isCameraReady}
                    onPress={() => takePic()}
                    onLongPress={() => takeVideo()}
                >
                    <View
                        style={{
                            //backgroundColor: 'white',
                            backgroundColor: circleColor,
                            width: 84,
                            height: 84,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 100,
                        }}
                    >
                        <View
                            style={{
                                width: 70,
                                height: 70,
                                borderRadius: 50,
                                borderWidth: 2.4,
                                borderColor: '#000',
                            }}
                        ></View>
                    </View>
                </TouchableOpacity>

                {/* in the avatar upload flow [AND ALSO MVP], video is not available as of now */}
                {/* {type !== "avatarUpload" && (
            <TouchableOpacity
            onPress={() => {
                videoRecordingStatus === false ? takeVideo() : stopVideo();
            }}
            >
            <Ionicons
                name="videocam-outline"
                style={
                videoRecordingStatus === false
                    ? PostingStyles.videoButtonNormal
                    : PostingStyles.videoButtonRecording
                }
            />
            </TouchableOpacity>
        )} */}

                <TouchableOpacity
                    style={styles.element_controls}
                    onPress={() => handleCameraType()}
                >
                    <Ionicons
                        name="camera-reverse-outline"
                        style={[PostingStyles.icon_camera_reverse_outline]}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container_top_level: {
        flex: 1,
        flexDirection: 'column',
    },

    container_controls: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    element_controls: {
        justifyContent: 'center',
    },
});
export default TakePhotoScreen;

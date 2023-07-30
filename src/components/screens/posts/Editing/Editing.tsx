import React, { useEffect } from 'react';
import { Image, View } from 'react-native';
import { Button } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// types
import { RootStackParamList } from 'types/Screens';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

// custom components
import { PhotoEditor } from './PhotoEditor';
import { VideoEditor } from './VideoEditor';
import MemareeText from 'components/common/textAndInputs/MemareeText';

// styles
import { ImageRotationFix } from 'styles/stylesheets/imagesStyles';

type EditingScreenProps = NativeStackScreenProps<RootStackParamList, 'EditingScreen'>;

const PREBUILD = process.env.ENV === 'local' ? false : true;

const EditingScreen = (props: EditingScreenProps) => {
    const { navigation, route } = props;
    const { mediaUri, mediaType, onMediaVerified } = route.params;
    const { type } = route.params;

    useEffect(() => {
        const unsubscribe = navigation.setOptions({
            headerRight: () => (
                <Button
                    mode="outlined"
                    textColor="black"
                    style={{ marginRight: 10 }}
                    labelStyle={{ fontFamily: 'Outfit-Bold' }}
                    onPress={() => {
                        navigation.navigate('PreviewScreen', {
                            type: type,
                            mediaUri: mediaUri,
                            mediaType: mediaType,
                            onMediaVerified: onMediaVerified,
                        });
                    }}
                >
                    Preview
                </Button>
            ),
        });
        return () => {
            unsubscribe;
        };
    }, []);

    const render = () => {
        if (PREBUILD === true) {
            if (mediaType === 'video') {
                return (
                    <VideoEditor
                        media={mediaUri}
                        visible={true}
                        onFinish={() => {
                            navigation.navigate('PreviewScreen', {
                                type: type,
                                mediaUri: mediaUri,
                                mediaType: mediaType,
                                onMediaVerified: onMediaVerified,
                            });
                        }}
                    />
                );
            } else if (mediaType === 'image') {
                return (
                    <PhotoEditor
                        media={mediaUri}
                        visible={true}
                        onFinish={() => {
                            navigation.navigate('PreviewScreen', {
                                type: type,
                                mediaUri: mediaUri,
                                mediaType: mediaType,
                                onMediaVerified: onMediaVerified,
                            });
                        }}
                    />
                );
            } else {
                console.error('Invalid media type');
                return (
                    <View>
                        <MemareeText>Invalid media type</MemareeText>
                    </View>
                );
            }
        } else {
            return (
                <View>
                    <MemareeText>Prebuild testing.</MemareeText>
                    <MemareeText>{mediaType}</MemareeText>
                    <MemareeText>{mediaUri}</MemareeText>
                    <Image source={{ uri: mediaUri }} style={ImageRotationFix} />
                </View>
            );
        }
    };

    return <SafeAreaProvider>{render()}</SafeAreaProvider>;
};

export default EditingScreen;

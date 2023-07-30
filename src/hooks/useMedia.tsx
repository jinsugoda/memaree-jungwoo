// Define the type for the context value
import React, { createContext, useContext, useState } from 'react';
import { Platform } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';

// types
import { ImageType } from 'expo-camera/build/Camera.types';

// env vars
import {
    CAMERA_API_ENDPOINT,
    CAMERA_VIDEO_API_ENDPOINT,
    FILE_UPLOAD_API_KEY,
    VIDEO_API_KEY,
} from '../../environment';

// utils
import Logger, { ErrorType } from 'utils/logger';

type MediaContextType = {
    mediaUri: string;
    setMediaUri: React.Dispatch<React.SetStateAction<string>>;
    mediaType: string;
    setMediaType: React.Dispatch<React.SetStateAction<string>>;
    fileName: string | null;
    setFileName: React.Dispatch<React.SetStateAction<string | null>>;
    imageBase64: string | null;
    setImageBase64: React.Dispatch<React.SetStateAction<string | null>>;
    loading: boolean;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    isAvatar: boolean;
    setIsAvatar: React.Dispatch<React.SetStateAction<boolean>>;
    isGroupImage: boolean;
    setIsGroupImage: React.Dispatch<React.SetStateAction<boolean>>;
    setImageSize: React.Dispatch<React.SetStateAction<number>>;
    isSharedToVision: boolean;
    setIsSharedToVision: React.Dispatch<React.SetStateAction<boolean>>;
    handleTakePic: (
        PreviewPhoto: (uri: string, type: string, base64: string) => void,
        cameraRef: React.RefObject<any>,
    ) => Promise<void>;
    handlePickImage: (
        PreviewPhoto: (uri: string, type: string, base64: string) => void,
    ) => Promise<void>;
    constructPreview: () => string;
    onMediaVerified: (isAvatarReal?: boolean) => Promise<void>;
    cacheImage: (fileName1: string, image: any) => Promise<string>;
    handleTakeVideo: (
        PreviewVideo: (uri: string, type: string) => void,
        cameraRef: React.RefObject<any>,
    ) => Promise<void>;
};

// creating the context
export const MediaContext = createContext<MediaContextType>({} as MediaContextType);

// create a provider
export const MediaProvider = ({ children }) => {
    const hook = useHook();
    return <MediaContext.Provider value={hook}>{children}</MediaContext.Provider>;
};

export const useMedia = () => useContext(MediaContext);

const fetchImageFromUri = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    return blob;
};

const useHook = () => {
    const [mediaUri, setMediaUri] = useState('');
    const [mediaType, setMediaType] = useState('');
    const [fileName, setFileName] = useState(null);
    const [imageBase64, setImageBase64] = useState(null);
    const [loading, setIsLoading] = useState(false);
    const [isAvatar, setIsAvatar] = useState(false);
    const [isGroupImage, setIsGroupImage] = useState(false);
    const [isSharedToVision, setIsSharedToVision] = useState(false);
    const [imageSize, setImageSize] = useState(0);

    const compressImage = async (uri, originalImageSize) => {
        let compressQuant = 1;
        if (originalImageSize > 6_000_000) {
            compressQuant = 0;
        } else if (originalImageSize > 1_000_000) {
            compressQuant = 0.2;
        } else if (originalImageSize > 600_000) {
            compressQuant = 0.5;
        } else if (originalImageSize > 100_000) {
            compressQuant = 1;
        }
        const manipResult = await ImageManipulator.manipulateAsync(uri, [], {
            base64: true,
            compress: compressQuant,
            format: ImageManipulator.SaveFormat.JPEG,
        });
        return manipResult.base64;
    };
    const handleTakePic = async (PreviewPhoto, cameraRef) => {
        const options = {
            forceUpOrientation: true,
            fixOrientation: true,
            quality: 1,
            base64: true,
            exif: false,
            imageType: ImageType.png,
            //skipProcessing: true,
            onPictureSaved: (newPhoto) => {
                newPhoto.uri !== null && PreviewPhoto(newPhoto.uri, 'image', newPhoto.base64);
                setMediaUri(newPhoto.uri);
                setMediaType('image');
                setFileName(newPhoto.uri.split('/').pop());
                setImageBase64(newPhoto.base64);
                setImageSize(newPhoto.base64.length);
            },
        };
        await cameraRef.current.takePictureAsync(options);
    };

    const handlePickImage = async (PreviewPhoto) => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,

            base64: true,
            quality: 1,
        });
        if (result && !result.canceled) {
            setMediaUri(result.assets[0].uri);
            setMediaType('image');
            setFileName(result.assets[0].uri.split('/').pop());
            setImageBase64(result.assets[0].base64);
            setImageSize(result.assets[0].fileSize);
            result.assets[0].uri !== null &&
                PreviewPhoto(result.assets[0].uri, 'image', result.assets[0].base64);
        }
    };

    const constructPreview = () => {
        return 'data:image/jpg;base64,' + imageBase64;
    };

    const handleTakeVideo = async (PreviewVideo, cameraRef) => {
        const MAX_VIDEO_DURATION = 10;
        const data = await cameraRef.current.recordAsync({
            maxDuration: MAX_VIDEO_DURATION,
        });

        setMediaUri(data.uri);
        setFileName(data.uri.split('/').pop());
        setMediaType('video');
        data.uri !== null && PreviewVideo(data.uri, 'video');
    };

    const onMediaVerified = async (isAvatarReal: boolean = false) => {
        setIsLoading(true);
        if (mediaUri !== null && mediaType === 'video') {
            try {
                const response = await fetch(
                    CAMERA_VIDEO_API_ENDPOINT +
                        `?fileName=${fileName}` +
                        `&isSharedToVision=${isSharedToVision}`,
                    {
                        method: 'GET',
                        headers: { 'x-api-key': VIDEO_API_KEY },
                    },
                );

                const data = await response.json();

                //const amzSecurityToken = data.amz_header;
                let decodedUrl = data.data;

                //const public_url = 'https://memareeposts1.s3.amazonaws.com/'+fileName
                let file;
                try {
                    file = await fetchImageFromUri(mediaUri);
                } catch (error) {
                    Logger(
                        ErrorType.OTHER,
                        'useMedia',
                        error,
                        'src/composables/useMedia.tsx',
                        197,
                        0,
                        'file = await fetchImageFromUri(mediaUri);',
                    );
                }

                try {
                    const decocedUrlresponse = await fetch(decodedUrl, {
                        method: 'PUT',
                        body: file,
                    });
                } catch (error) {
                    Logger(
                        ErrorType.REQUEST,
                        'useMedia',
                        error,
                        'src/composables/useMedia.tsx',
                        197,
                        0,
                        'const decocedUrlresponse = await fetch(decodedUrl, {method: "PUT",body: file,});',
                        {
                            mediaUri,
                            mediaType,
                            fileName,
                            method: 'PUT',
                        },
                    );
                }
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
                Logger(
                    ErrorType.OTHER,
                    'useMedia',
                    error,
                    'src/composables/useMedia.tsx',
                    197,
                    0,
                    'Failed to upload video to S3',
                );
            }
        } else if (mediaUri !== null && mediaType === 'image') {
            let compressed = false;
            let manipResult;
            // if (imageSize > 4_000_000) {
            //     const format = ImageManipulator.SaveFormat.PNG;

            //     manipResult = await ImageManipulator.manipulateAsync(mediaUri, [], {
            //         base64: true,
            //         compress: 0.9,
            //         format: format,
            //     });
            //     compressed = true;
            //     console.log(manipResult.base64.length);
            // }
            // if (compressed && manipResult?.base64?.length > 4_000_000) {
            const format = ImageManipulator.SaveFormat.JPEG;

            manipResult = await ImageManipulator.manipulateAsync(mediaUri, [], {
                base64: true,
                compress: 0.9,
                format: format,
            });
            compressed = true;
            console.log(manipResult.base64.length);
            // }
            console.log('shared to vision', isSharedToVision);
            const headers = {
                'Content-Type': 'application/json',
                'x-api-key': FILE_UPLOAD_API_KEY,
                'X-My-Custom-Header-File-Name': fileName,
                'X-My-Custom-Header-Media-Type': mediaType,
            };
            const requestOptions = {
                method: 'POST',
                headers: headers,
                // body: constructPreview() //+ postCaption
                body: compressed ? manipResult.base64 : imageBase64,
            };

            const endpoint =
                CAMERA_API_ENDPOINT +
                `?fileName=${fileName}&mediaType=${mediaType}&isAvatar=${isAvatarReal}&isSharedToVision=${isSharedToVision}&isGroupImage=${isGroupImage}`;
            try {
                fetch(endpoint, requestOptions)
                    .then((response) => response.json())
                    .then((data) => {
                        if (data?.message === 'Internal server error') {
                            Logger(
                                ErrorType.REQUEST,
                                'useMedia',
                                data,
                                'src/composables/useMedia.tsx',
                                123,
                                0,
                                'Attempting to upload image to S3 (part II).',
                                {
                                    method: 'POST',
                                    headers,
                                    body: imageBase64 ? imageBase64.length : null,
                                },
                                endpoint,
                                data,
                            );
                        }
                        console.log('IMAGE RESPONSE DATA', data);
                    })
                    .finally(() => {
                        setIsGroupImage(false);
                        setIsSharedToVision(false);
                        setIsAvatar(false);
                    });
                setImageBase64(imageBase64);
            } catch (error) {
                console.log('ERROR....', error);
                Logger(
                    ErrorType.REQUEST,
                    'useMedia',
                    error,
                    'src/composables/useMedia.tsx',
                    123,
                    0,
                    'Attempting to upload image to S3.',
                    {
                        method: 'POST',
                        headers,
                        body: imageBase64 ? imageBase64.length : null,
                    },
                    endpoint,
                );
                setIsLoading(false);
            }
        }
        setIsGroupImage(false);
        setIsSharedToVision(false);
        setIsAvatar(false);
    };

    async function cacheImage(fileName1: string, image) {
        const fileName = `${FileSystem.cacheDirectory}${fileName1}`;
        // console.log('caching');
        // Check if the image file already exists in local cache
        const { exists } = await FileSystem.getInfoAsync(fileName);
        // const results = await FileSystem.getInfoAsync(mediaUri);
        // console.log('checking uri exists???: ', results.exists);
        console.log('upload pic uri', mediaUri);
        const result = await FileSystem.getInfoAsync(mediaUri);
        console.log('upload photo exists', result);
        if (!exists) {
            // If the image is not cached, write the base64 string to the file
            // const compressedImage = await compressImage(mediaUri, imageSize);
            let compressQuant = 1;
            if (imageSize > 6_000_000) {
                compressQuant = 0.8;
            } else if (imageSize > 1_000_000) {
                compressQuant = 0.9;
            } else if (imageSize > 600_000) {
                compressQuant = 0.9;
            } else if (imageSize > 100_000) {
                compressQuant = 1;
            }
            const format = ImageManipulator.SaveFormat.JPEG;

            const manipResult = await ImageManipulator.manipulateAsync(
                mediaUri,
                //[{ resize: { width: 800, height: 1000 } }],
                [],
                {
                    base64: true,
                    compress: compressQuant,
                    format: format,
                },
            );
            await FileSystem.writeAsStringAsync(fileName, manipResult.base64, {
                encoding: FileSystem.EncodingType.Base64,
            });
        }

        return fileName;
    }

    return {
        mediaUri,
        setMediaUri,
        mediaType,
        setMediaType,
        fileName,
        setFileName,
        loading,
        setIsLoading,
        isAvatar,
        setIsAvatar,
        isSharedToVision,
        setIsSharedToVision,
        imageBase64,
        setImageBase64,
        onMediaVerified,
        constructPreview,
        handleTakePic,
        handlePickImage,
        setImageSize,
        cacheImage,
        isGroupImage,
        setIsGroupImage,
        handleTakeVideo,
    };
};

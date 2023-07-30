import React, { useEffect, memo, useState } from 'react';
import { Image as RNImage, ActivityIndicator, View, ViewStyle } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { Image } from 'expo-image';

// styles
import { ImageStyles } from 'styles';
import { ImageRotationFix } from 'styles/stylesheets/imagesStyles';

import Logger, { ErrorType } from 'utils/logger';
import { ENVIRONMENT_NAME } from '../../../../environment';
import { useFocusEffect } from '@react-navigation/native';

interface RoundedImageProps {
    uri: string;
    cacheKey?: string;
    style?: ViewStyle;
    imageStyle?: any;
    aspectRatio?: number;
    borderRadius?: number;
    thumbnail?: boolean;
    postCardSmall?: boolean;
}

const backupUrlDir = `${FileSystem.cacheDirectory}`;

const RoundedImage = ({
    uri,
    cacheKey,
    style,
    borderRadius,
    imageStyle,
    postCardSmall = false,
}: RoundedImageProps) => {
    const [failedToLoadCache, setFailedToLoadCache] = useState(false);
    const [failedToLoadUrl, setFailedToLoadUrl] = useState(false);

    const [loadedUrl, setLoadedUrl] = useState(false);
    const [loadedCache, setLoadedCache] = useState(false);

    const [tryCachedImage, setTryCachedImage] = useState(false);
    const [componentKey, setComponentKey] = useState(uri + (cacheKey || 'cachekey'));
    const placeholder =
        'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.png';

    useEffect(() => {
        const completedCacheBackupUrl = backupUrlDir + cacheKey;
        FileSystem.getInfoAsync(completedCacheBackupUrl)
            .then((result) => {
                if (result && result?.exists) {
                    setTryCachedImage(true);
                } else {
                    setTryCachedImage(false);
                }
            })
            .catch((err) => {
                console.log('GOODBYE', uri, cacheKey);
                console.log('failed to get backup: ', err);
                setTryCachedImage(false);
            });
    }, [cacheKey]);

    useEffect(() => {
        setComponentKey(uri + (cacheKey || 'cachekey'));
    }, [uri]);

    useFocusEffect(() => {
        if (
            !loadedCache &&
            !loadedUrl &&
            failedToLoadUrl &&
            !componentKey?.includes('retriedTwice')
        ) {
            setTimeout(() => {
                // console.log('retrying url: ', uri);
                setFailedToLoadUrl(false);
                setLoadedUrl(false);
                if (componentKey?.includes('retried')) {
                    setComponentKey((prev) => prev + 'retriedTwice');
                } else {
                    setComponentKey((prev) => prev + 'retried');
                }
            }, 2000);
        }
    });
    return (
        <View style={[ImageStyles.roundedImageContainer, style]}>
            {!tryCachedImage || failedToLoadCache || loadedUrl ? (
                <View style={{}}>
                    <Image
                        source={{
                            uri: uri,
                            cacheKey: cacheKey ? cacheKey : uri,
                        }}
                        key={componentKey}
                        style={[
                            {
                                width: '100%',
                                aspectRatio: 0.8,
                                borderRadius: borderRadius ?? 0,
                            },
                            imageStyle ?? {},
                            ImageRotationFix,
                        ]}
                        cachePolicy={'disk'}
                        contentFit="cover"
                        recyclingKey={uri}
                        onLoadStart={() => {
                            //console.log('trying url: ', uri);
                        }}
                        onLoad={() => {
                            setLoadedUrl(true);
                        }}
                        onError={(error) => {
                            setFailedToLoadUrl(true);
                            // console.log('rounded image error: ', error, uri, cacheKey);
                            Logger(
                                ErrorType.OTHER,
                                'RoundedImage',
                                new Error('Custom error: rounded image error'),
                                'RoundedImage.tsx',
                                134,
                                0,
                                'rounded image error',
                                null,
                                'NO ENDPOINT',
                                {
                                    error,
                                    uri,
                                    cacheKey,
                                },
                            );
                        }}
                    />
                </View>
            ) : (
                <Image
                    source={{
                        uri: backupUrlDir + cacheKey,
                    }}
                    style={[
                        {
                            width: '100%',
                            aspectRatio: 0.8,
                            borderRadius: borderRadius ?? 0,
                        },
                        imageStyle ?? {},
                        ImageRotationFix,
                    ]}
                    cachePolicy={'none'}
                    contentFit="cover"
                    recyclingKey={uri + cacheKey}
                    onLoad={() => {
                        setLoadedCache(true);
                    }}
                    onError={(error) => {
                        setFailedToLoadCache(true);
                        console.log('failed to use cached backup: ', error, uri, cacheKey);
                        Logger(
                            ErrorType.OTHER,
                            'RoundedImage',
                            new Error('Custom error: failed to use cached backup'),
                            'RoundedImage.tsx',
                            134,
                            0,
                            'failed to use cached backup',
                            null,
                            'NO ENDPOINT',
                            {
                                error,
                                uri,
                                cacheKey,
                            },
                        );
                    }}
                />
            )}
            <ActivityIndicator
                color={'green'}
                size={postCardSmall ? 'small' : 'large'}
                style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: postCardSmall ? 0 : -100,
                    bottom: 0,
                }}
                animating={!loadedUrl && !loadedCache}
            />
        </View>
    );
};

export default memo(RoundedImage);

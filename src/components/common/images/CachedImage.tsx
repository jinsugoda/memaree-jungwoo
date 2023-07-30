import React, { useState, useEffect } from 'react';
import { Image, View, ViewStyle } from 'react-native';
import * as FileSystem from 'expo-file-system';

// 3rd party hooks
import { gql, useQuery } from '@apollo/client';

// custom components
import MemareeText from 'components/common/textAndInputs/MemareeText';

// styles
import { ImageStyles } from 'styles';
import { ImageRotationFix } from 'styles/stylesheets/imagesStyles';

export async function cacheImage(postId: string, base64Image?: string) {
    const fileName = `${FileSystem.cacheDirectory}${postId}.txt`;

    // Check if the image file already exists in local cache
    const { exists } = await FileSystem.getInfoAsync(fileName);

    if (!exists) {
        // If the image is not cached, write the base64 string to the file
        await FileSystem.writeAsStringAsync(fileName, base64Image, {
            encoding: FileSystem.EncodingType.Base64,
        });
    }

    return fileName;
}

export const GetPostImageQry = gql`
    query GetPostImage($input: GetPostImageQueryInput!) {
        getPostImage(input: $input) {
            content {
                imageUrls
            }
        }
    }
`;

interface CachedImageProps {
    post: {
        _id: string;
    };
    style?: ViewStyle;
    imageStyle?: any;
    aspectRatio?: number;
    borderRadius: number;
}

const CachedImage = ({
    post,
    style,
    aspectRatio = 0.7,
    borderRadius,
    imageStyle,
}: CachedImageProps) => {
    const [uri, setUri] = useState<string | null>(null);
    const [imageAspectRatio, setImageAspectRatio] = useState(aspectRatio);

    console.log('POST', post);
    const postId = post?._id;

    const { loading, error, data } = useQuery(GetPostImageQry, {
        variables: { input: { postId } },
    });

    useEffect(() => {
        if (data) {
            const base64Image = data?.getPostImage?.content?.imageUrls[0];
            cacheImage(postId, base64Image);
        }
    }, [data]);

    useEffect(() => {
        async function loadCachedImage() {
            const fileUri = `${FileSystem.cacheDirectory}${postId}.txt`;
            const base64Data = await FileSystem.readAsStringAsync(fileUri, {
                encoding: FileSystem.EncodingType.Base64,
            });
            setUri(`data:image/png;base64,${base64Data}`);
        }

        loadCachedImage();
    }, [postId]);

    useEffect(() => {
        if (uri) {
            //Image.getSize(uri, (width, height) => setImageAspectRatio(width / height));
        }
    }, [uri]);

    if (!uri) {
        return null; // You can return a placeholder here
    }

    if (loading) return null; // or return a loading placeholder
    if (error)
        return <MemareeText style={{ color: 'white' }}>Error!{JSON.stringify(error)}</MemareeText>; // or handle the error as you see fit
    if (!uri) return null;

    return (
        <View style={[ImageStyles.roundedImageContainer, style]}>
            <Image
                source={{ uri }}
                style={[
                    {
                        width: '100%',
                        aspectRatio: 1,
                        borderRadius: borderRadius,
                    },
                    imageStyle ?? {},
                    ImageRotationFix,
                ]}
                resizeMode="cover"
                defaultSource={require('assets/400x400.png')}
                onError={(error) => console.log('cached image error', error?.nativeEvent)}
            />
        </View>
    );
};

export default CachedImage;

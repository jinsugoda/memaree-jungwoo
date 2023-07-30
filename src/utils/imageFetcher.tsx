import { useMemo } from 'react';
import * as FileSystem from 'expo-file-system';
import { Auth } from 'aws-amplify';

// types
import { Post } from 'types/DataModels';

export const storeImages = useMemo(
    () => async (posts: Post[], thumbnail) => {
        const editedArray = await Promise.all(
            posts.map(async (post: Post, i) => {
                const fileName = `${FileSystem.cacheDirectory}${post.content.imageUrls[0]}`;
                const fileInfo = await FileSystem.getInfoAsync(fileName);
                if (fileInfo?.exists) {
                    let base64Data = await FileSystem.readAsStringAsync(fileInfo.uri, {
                        encoding: FileSystem.EncodingType.Base64,
                    });
                    //encoded string missing this , need to concat below string
                    base64Data = 'data:application/octet-stream;base64,' + base64Data;
                    //postCardSmall is looking for base64Image_thumbnail thats is why passing this attribute
                    let editedPost = null;
                    thumbnail == true
                        ? (editedPost = {
                              ...post,
                              content: { ...post.content, base64Image_thumbnail: base64Data },
                          })
                        : (editedPost = {
                              ...post,
                              content: { ...post.content, base64Image: base64Data },
                          });
                    if (thumbnail) {
                        editedPost = {
                            ...post,
                            content: { ...post.content, base64Image_thumbnail: base64Data },
                        };
                    }
                    return editedPost;
                }
                if (thumbnail) {
                    const signedUrl = post.signedUrl.replace('resized_', 'thumbnail_');
                    const alreadyFetched =
                        post.content.base64Image && post.content.base64Image.length > 0;
                    const base64EncodedImage = alreadyFetched
                        ? post.content.base64Image_thumbnail
                        : await fetchImage(signedUrl);
                    const editedPost = {
                        ...post,
                        content: { ...post.content, base64Image_thumbnail: base64EncodedImage },
                    };
                    return editedPost;
                } else {
                    const signedUrl = post.signedUrl;
                    const alreadyFetched =
                        post.content.base64Image && post.content.base64Image.length > 0;
                    const base64EncodedImage = alreadyFetched
                        ? post.content.base64Image
                        : await fetchImage(signedUrl);
                    const editedPost = {
                        ...post,
                        content: { ...post.content, base64Image: base64EncodedImage },
                    };
                    return editedPost;
                }
            }),
        );
        return editedArray;
    },
    [],
);

export const fetchImage = async (signedUrl) => {
    try {
        const response = await fetch(signedUrl); // Fetch the image using the signed URL
        const blob = await response.blob(); // Convert the response to a Blob
        const reader = new FileReader(); // Create a FileReader object

        return new Promise((resolve, reject) => {
            reader.onloadend = () => {
                // When the FileReader finishes loading the data
                const base64data = reader.result; // Get the base64 string
                resolve(base64data); // Resolve the promise with the base64 data
            };
            reader.onerror = reject;
            reader.readAsDataURL(blob); // Read the Blob data as a base64 string
        });
    } catch (error) {
        console.log('Error fetching image:', error);
        throw error;
    }
};

export const getSignedUrl = useMemo(
    () =>
        async (uri: string, thumbnail: boolean): Promise<string> => {
            const p = uri.split('/').pop();
            if (!p) {
                throw new Error('Invalid URI');
            }

            const prepend = thumbnail ? 'thumbnail_' : 'resized_';
            const fileName = `${FileSystem.cacheDirectory}${p}`;

            const fileInfo = await FileSystem.getInfoAsync(fileName);
            if (fileInfo?.exists) {
                console.log('SETTING SIGNED URL', fileName);
                return fileName;
            } else {
                try {
                    const user = await Auth.currentAuthenticatedUser();
                    const token = user.signInUserSession.idToken.jwtToken;
                    const signedUrlResponse = await fetch(
                        `https://lm8sn7zi82.execute-api.us-east-1.amazonaws.com/default/signUrl?fileName=${prepend}${p}`,
                        {
                            headers: {
                                Authorization: token,
                            },
                        },
                    );
                    if (!signedUrlResponse.ok) {
                        throw new Error(
                            `Error getting signed URL. HTTP error ${signedUrlResponse.status}`,
                        );
                    }
                    const signedUrl = await signedUrlResponse.text();
                    return signedUrl;
                } catch (error) {
                    console.error('Error getting signed URL', error);
                    throw error;
                }
            }
        },
    [],
);

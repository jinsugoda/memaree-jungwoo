import React, { useEffect } from 'react';
import { ViewStyle, TouchableOpacity, StyleSheet, Dimensions, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';
import { Image } from 'expo-image';

// types
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from 'types/Screens';

// 3rd party hooks
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'react-native-paper';

// constants
import { DEFAULT_PROFILE_PIC } from './DefaultProfilePic';

// styles
import { GradientAvatarStyles } from 'styles';
import { ImageRotationFix } from 'styles/stylesheets/imagesStyles';

import { MEMAREE_AVATARS_BUCKET } from '../../../../../environment';

export interface GradientAvatarProps {
    size?: number;
    editable?: boolean;
    style?: ViewStyle;
    source: string;
}

const GradientAvatar = (props: GradientAvatarProps) => {
    const { colors } = useTheme();
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const screenHeight = Dimensions.get('window').height;

    function editAvatar() {
        // navigate to avatar upload
        navigation.navigate('TakePhotoScreen', { name: 'New Avatar Image', type: 'avatarUpload' });
    }

    let [avatarUrl, setAvatarUrl] = React.useState<string | undefined>(props?.source);

    const getAvatarUrl = () => {
        if (!props?.source) {
            return;
        }
        const p = props?.source?.split('/').pop();
        if (p === '') {
            return;
        }
        const fileName = `${FileSystem.cacheDirectory}${p}`;
        FileSystem.getInfoAsync(fileName)
            .then((tmp) => {
                if (tmp?.exists === true) {
                    setAvatarUrl(`${FileSystem.cacheDirectory}${p}`);
                } else {
                    if (props?.source === 'DEFAULT' || !props?.source) {
                        setAvatarUrl('data:image/png;base64,' + DEFAULT_PROFILE_PIC);
                    } else {
                        setAvatarUrl(MEMAREE_AVATARS_BUCKET + props?.source.split('/').pop());
                    }
                }
            })
            .catch((err) => {
                console.log('gradient avatar error', err);
            });
    };

    useEffect(() => {
        getAvatarUrl();
    }, [props?.source]);

    return (
        <View>
            <LinearGradient
                colors={['#6FF1F6', '#FC9DED']}
                style={[
                    GradientAvatarStyles.container,
                    {
                        width: props?.size,
                        height: props?.size,
                        borderRadius: props?.size * 0.4,
                    },
                    props?.style,
                ]}
            >
                {props.source && (
                    <Image
                        source={{
                            uri: avatarUrl,
                        }}
                        style={[
                            GradientAvatarStyles.image,
                            {
                                width: props?.size * 0.92,
                                height: props?.size * 0.92,
                                borderWidth: props?.size * 0.05,
                                borderRadius: props?.size * 0.35,
                                borderColor: colors.background,
                            },
                        ]}
                    />
                )}
            </LinearGradient>

            {/*  following TouchableOpacity is displayed only in the SelfProfileScreen screen
      because props.editable is passed as true*/}
            {props?.editable && (
                <TouchableOpacity
                    style={[
                        styles.editButton,
                        { bottom: screenHeight * 0.01, right: 0, backgroundColor: colors.tertiary },
                    ]}
                    onPress={editAvatar}
                >
                    <MaterialIcons name="edit" size={props?.size * 0.18} color="black" />
                </TouchableOpacity>
            )}
        </View>
    );
};

GradientAvatar.defaultProps = {
    size: 60,
};

const styles = StyleSheet.create({
    editButton: {
        position: 'absolute',
        padding: 8,
        borderRadius: 99,
    },
});
export default GradientAvatar;

import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import MemareeText from 'components/common/textAndInputs/MemareeText';
import { useMedia } from 'hooks/useMedia';
import React, { useState } from 'react';
import { View, Image, TouchableOpacity, Dimensions } from 'react-native';
import { useTheme } from 'react-native-paper';
import { color } from 'react-native-reanimated';
import { CustomTheme } from 'styles/theme/customThemeProps';
import { RootStackParamList } from 'types/Screens';

type GroupPhotoUploaderProps = {
    pickImage: () => void;
};

export const GroupPhotoUploader = ({ pickImage }: GroupPhotoUploaderProps) => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const { colors }: CustomTheme = useTheme();
    const screenWidth = Dimensions.get('window').width;

    const { imageBase64, mediaUri } = useMedia();

    const placeHolder = 'https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg';

    return (
        <View
            style={{
                width: screenWidth * 0.4,
                aspectRatio: 0.8,
            }}
        >
            <Image
                style={{
                    width: screenWidth * 0.4,
                    aspectRatio: 0.8,
                }}
                source={{
                    uri: mediaUri ? mediaUri : placeHolder,
                }}
                defaultSource={{ uri: placeHolder }}
            />
            <TouchableOpacity
                style={{
                    flex: 0,
                    position: 'absolute',
                    width: '100%',
                    height: '25%',
                    bottom: 0,
                    backgroundColor: 'rgba(10, 10, 10, 0.65)',
                    justifyContent: 'center',
                }}
                onPress={() => pickImage()}
            >
                <MemareeText style={{ color: colors.text, textAlign: 'center' }}>
                    + Upload Photo
                </MemareeText>
            </TouchableOpacity>
        </View>
    );
};

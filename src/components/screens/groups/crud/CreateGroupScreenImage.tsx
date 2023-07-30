import React, { useEffect, useState } from 'react';
import { Dimensions, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GroupPhotoUploader } from './GroupPhotoUploader';
import MemareeInput from 'components/common/textAndInputs/MemareeInput';
import { CustomTheme } from 'styles/theme/customThemeProps';
import { Button, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from 'types/Screens';
import MemareeText from 'components/common/textAndInputs/MemareeText';
import { useMedia } from 'hooks/useMedia';

import * as ImagePicker from 'expo-image-picker';

export const CreateGroupScreenImage = () => {
    const [name, setName] = useState('');
    const screenWidth = Dimensions.get('window').width;
    const { colors }: CustomTheme = useTheme();
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const [imageSrc, setimgeSrc] = useState('');
    const {
        onMediaVerified,
        setFileName,
        setImageBase64,
        setMediaType,
        mediaUri,
        setMediaUri,
        setImageSize,
        setIsGroupImage,
    } = useMedia();

    useEffect(() => {
        setMediaUri('https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg');
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            aspect: [4, 5],
            base64: true,
            quality: 1,
        });

        setMediaUri(result?.assets[0]?.uri);
        setMediaType('image');
        setFileName(result?.assets[0]?.uri.split('/').pop());
        setImageBase64(result?.assets[0]?.base64);
        setImageSize(result?.assets[0]?.fileSize);
        setIsGroupImage(true);
    };
    const NextScreen = () => {
        navigation.navigate('CreateGroupScreen', { mediaUri: mediaUri, name: name });
    };

    let pressable = !(name.length > 1);
    return (
        <SafeAreaView style={{ height: screenWidth, flex: 1, alignItems: 'center' }}>
            <View style={{ flex: 0, width: '100%', alignItems: 'center', marginBottom: 20 }}>
                <GroupPhotoUploader pickImage={pickImage} />
            </View>

            <MemareeText style={{ color: colors.text, width: '90%', marginBottom: 10 }}>
                Group name:
            </MemareeText>
            <TextInput
                style={{
                    color: colors.text,
                    height: 50,
                    width: screenWidth * 0.9,
                    fontSize: 17,
                    backgroundColor: '#2F2F2F',
                    borderRadius: 99,
                    borderWidth: 0.7,
                    marginBottom: 10,
                    paddingLeft: 20,
                    fontFamily: 'Outfit-Bold',
                }}
                onChangeText={(newName) => setName(newName)}
                defaultValue={name}
                cursorColor={colors.text}
                placeholderTextColor={colors.text}
                placeholder="Enter your Group name"
            />
            <MemareeText style={{ color: colors.text, fontSize: 12, width: '90%' }}>
                By creating a Group, you are agreeing to Memaree's Community Guidelines
            </MemareeText>
            <Button
                onPress={() => NextScreen()}
                disabled={pressable}
                labelStyle={{
                    color: pressable ? 'white' : 'black',
                    fontFamily: 'Outfit-Bold',
                }}
                style={{
                    position: 'absolute',
                    backgroundColor: pressable ? '#2F2F2F' : colors.tertiary,
                    borderColor: pressable ? '#2F2F2F' : colors.tertiary,
                    flex: 0,
                    justifyContent: 'center',
                    borderWidth: 1.7,
                    width: 160,
                    height: 50,
                    bottom: 20,
                    right: 10,
                }}
            >
                Next
            </Button>
        </SafeAreaView>
    );
};

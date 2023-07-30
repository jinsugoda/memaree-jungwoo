import React, { MutableRefObject, useState } from 'react';
import { View, TextInput, TouchableOpacity, Image } from 'react-native';
import { Icon } from '@rneui/base';

import * as ImagePicker from 'expo-image-picker';

// types
import { CustomTheme } from 'styles/theme/customThemeProps';

// 3rd party hooks
import { useTheme } from 'react-native-paper';

// styles
import { InputStyles } from 'styles';
import { ImageRotationFix } from 'styles/stylesheets/imagesStyles';

type MessagingInputProps = {
    padding?: number;
    handleSubmit: (text: string) => void;
    handleFocus?: () => void;
    handleBlur?: () => void;
    isFocused?: boolean;
    backgroundColor?: string;
    inputRef: MutableRefObject<TextInput>;
};

// temp prop, replace with socket with redux app state when that is ready
const TextAndImageInput = (props: MessagingInputProps) => {
    const { colors }: CustomTheme = useTheme();
    const [text, setText] = useState('');
    const [image, setImage] = useState(null);

    const handleTakePhoto = async () => {
        try {
            const result = await ImagePicker?.launchCameraAsync();
            if (!result?.canceled) {
                setImage(result?.assets);
            }
        } catch {}
    };

    const handlePickImage = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync();
            if (!result?.canceled) {
                setImage(result?.assets);
            }
        } catch {}
    };

    const handleSend = () => {
        if (text.trim() !== '') {
            props?.handleSubmit(text);
            setText('');
            setImage(null);
        }
    };

    return (
        <>
            <View style={[InputStyles.container, { backgroundColor: props.backgroundColor ??  '#2F2F2F', padding: props.padding ?? 10 }]}>
                {/* <TouchableOpacity onPress={handleTakePhoto}>
                <Icon
                    style={InputStyles.CameraIcon}
                    name={'camera-outline'}
                    type="material-community"
                    size={InputStyles.uploadIconSize}
                    containerStyle={ InputStyles.uploadIcons as StyleProp<ViewStyle>}
                />
            </TouchableOpacity>
            <TouchableOpacity onPress={handlePickImage}>
                <Icon
                    style={InputStyles.ImageIcon}
                    name={'image-outline'}
                    type="material-community"
                    size={InputStyles.uploadIconSize - 2}
                    containerStyle={ InputStyles.uploadIcons as StyleProp<ViewStyle>}
                />
            </TouchableOpacity>
            <Divider orientation="vertical" width={1} /> */}
                <TextInput
                    ref={props?.inputRef}
                    style={[
                        InputStyles.textInput,
                        {
                            backgroundColor: props.backgroundColor ?? '#2F2F2F',
                            fontFamily: 'Outfit',
                            color: colors.text,
                            fontSize: 16
                        },
                    ]}
                    cursorColor={colors.text}
                    placeholderTextColor={colors.text}
                    placeholder={props.isFocused? "": "Add a comment..."}
                    value={text}
                    onChangeText={setText}
                    onFocus={props.handleFocus}
                    onBlur={props.handleBlur}
                />
               { 
                text !== '' &&
                <TouchableOpacity onPress={handleSend}>
                        <Icon
                            style={InputStyles.SendIcon}
                            color={colors.tertiary}
                            name={'send'}
                            type="material-community"
                            size={InputStyles.uploadIconSize}
                        />
                    </TouchableOpacity>
                }
            </View>
            {image && (
                <Image source={image} style={[InputStyles.UploadImagePreview, ImageRotationFix]} />
            )}
        </>
    );
};

export default TextAndImageInput;

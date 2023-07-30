import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';

// types
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from 'types/Screens';

// 3rd party hooks
import { useNavigation } from '@react-navigation/native';

// styles
import { ButtonStyles } from 'styles';

// icons
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';

const CreateSceneButton = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    return (
        <TouchableOpacity
            onPress={() =>
                navigation.navigate('TakePhotoScreen', {
                    name: 'Make a scene',
                    type: 'createScene',
                })
            }
        >
            <View
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                    backgroundColor: '#6CF3F6',
                    borderRadius: 15,
                    height: 40,
                    padding: 10,
                }}
            >
                <FontAwesomeIcon
                    style={{ ...ButtonStyles.backButtonIcon }}
                    icon={faPlus}
                    size={ButtonStyles.backButtonSize}
                />
                <Text style={{ height: 40, padding: 10 }}>Add to Lane</Text>
            </View>
        </TouchableOpacity>
    );
};
export default CreateSceneButton;

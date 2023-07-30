import React, { useState } from 'react';
import { Dimensions, Switch, View } from 'react-native';

// types
import { CustomTheme } from 'styles/theme/customThemeProps';
import { Group } from 'types/DataModels';

// 3rd party hooks
import { List, useTheme } from 'react-native-paper';

// custom components
import MemareeText from 'components/common/textAndInputs/MemareeText';

// styles
import { PreviewStyles } from 'styles';
import RoundedImage from 'components/common/images/RoundedImage';

const screenWidth = Dimensions.get('window').width;
const ptValue = screenWidth * 0.92;

const placeholder =
    'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.png';

interface GroupSingleRowInterface {
    group: Group;
    onPress: () => void;
    postId: string;
}

export const GroupSingleRow = (props: GroupSingleRowInterface) => {
    const { colors }: CustomTheme = useTheme();
    const [checked, setChecked] = useState(false);

    const onToggle = () => {
        setChecked((prev) => !prev);
        props?.onPress();
    };

    return (
        <View style={{ flex: 1, alignItems: 'center' }}>
            <List.Item
                style={{ flex: 1, alignItems: 'center', justifyContent: 'center', width: ptValue }}
                titleStyle={{ color: colors.text, fontFamily: 'Outfit-Bold' }}
                title={<MemareeText>{props?.group?.name || 'name'}</MemareeText>}
                left={() => (
                    <RoundedImage
                        uri={props?.group?.signedGroupImageUrl || placeholder}
                        // placeholder={{ uri: placeholder }}
                        // recyclingKey={props?.group?._id}
                        // contentFit="fill"
                        style={{ width: 50, height: 50, borderRadius: 5, aspectRatio: 1 }}
                    />
                )}
                right={() => (
                    <Switch
                        value={checked}
                        onValueChange={onToggle}
                        trackColor={{ false: colors.text, true: colors.tertiary }}
                        thumbColor={colors.text}
                        ios_backgroundColor="white"
                        style={PreviewStyles.switchInput}
                    />
                )}
            />
        </View>
    );
};

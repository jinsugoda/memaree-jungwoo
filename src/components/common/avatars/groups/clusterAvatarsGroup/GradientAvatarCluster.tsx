import React from 'react';
import { TouchableOpacity, View } from 'react-native';

// types
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from 'types/Screens';
import { CustomTheme } from 'styles/theme/customThemeProps';

// 3rd party hooks
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'react-native-paper';

// custom components
//import RoundAvatarButton, { AvatarData, RoundAvatarButtonProps } from "components/common/buttons/RoundAvatarButton";
import GradientAvatar from '../../single/GradientAvatar';
import MemareeText from 'components/common/textAndInputs/MemareeText';
import { GradientAvatarRowStyles } from 'styles';

//interface AvatarsRow extends Omit<RoundAvatarButtonProps, "style"> {UsersList: AvatarData[]}
//type AvatarsData = {ids: string[]; size: number; borderWidth: number; marginLeft: number;};
// GradientAvatarGroup.defaultProps = {size: 60};
// type AvatarsData = {imgSources: string[]; size?: number;};

type user = {
    _id: string;
    profilePicUrl: string;
};

type GradientAvatarClusterProps = {
    name?: string;
    laneId: string;
    users: user[];
    owner: {
        _id: string;
    };
    size: number;
};

export const GradientAvatarCluster = (props: GradientAvatarClusterProps) => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const { colors }: CustomTheme = useTheme();

    //const group = useSelector((state) => state.lanes.lanes)
    //const imgSources = group.users.slice(0, 3).map((user) => user.profilePicUrl);

    // OLD ONE:
    // filterUserFunc
    // const postStory = (_id: string, urlDestination: string) => {navigation.navigate('ProfileScreen')};
    return (
        <View>
            <View style={[{ alignItems: 'center' }]}>
                <View style={{ flexDirection: 'row' }}>
                    {props?.users?.slice(0, 3).map((element, i) => {
                        return (
                            <GradientAvatar
                                key={element?._id}
                                source={element?.profilePicUrl}
                                size={props?.size}
                                style={{ marginLeft: i != 0 ? props?.size * -0.6 : 0 }}
                            />
                        );
                    })}
                </View>
                {props?.name && (
                    <MemareeText
                        style={{ fontSize: 11, color: colors.text, marginTop: 5, marginLeft: -20 }}
                    >
                        {props?.name}
                    </MemareeText>
                )}
            </View>
        </View>
    );
};

import React, { memo, useLayoutEffect, useState } from 'react';
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import * as FileSystem from 'expo-file-system';

// types
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from 'types/Screens';
import { CustomTheme } from 'styles/theme/customThemeProps';
import { Group } from 'types/DataModels';
import { ListRenderItemInfo } from '@shopify/flash-list';

// 3rd party hooks
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'react-native-paper';

// custom components
import MemareeText from 'components/common/textAndInputs/MemareeText';

//constants
const placeholder =
    'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.png';

interface GroupCardProps extends ListRenderItemInfo<Group> {
    openPostOptionsBottomSheet?: () => void;
    openSharePostBottomSheet?: () => void;
}

const GroupCard = (props: GroupCardProps) => {
    const { colors }: CustomTheme = useTheme();
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const [existsInCache, setExistsInCache] = useState(true);
    const cacheUri = `${FileSystem.cacheDirectory}${props?.item?.groupImage}`;

    useLayoutEffect(() => {
        FileSystem.getInfoAsync(cacheUri)
            .then((result) => {
                setExistsInCache(result?.exists);
            })
            .catch((err) => {
                console.log('failed to assign cache background image for groups: ', err);
            });
    }, [props?.item]);

    return (
        <TouchableOpacity
            style={{
                flex: 1,
                marginHorizontal: 7,
                marginBottom: 14,
            }}
            onPress={() =>
                navigation.navigate('GroupsScreen', {
                    screenTitle: props?.item?.name,
                    groupId: props?.item?._id,
                    owner: props?.item?.owner,
                    openPostOptionsBottomSheet: props?.openPostOptionsBottomSheet,
                    openSharePostBottomSheet: props?.openSharePostBottomSheet,
                })
            }
        >
            <ImageBackground
                resizeMode="stretch"
                source={{
                    uri: existsInCache
                        ? cacheUri
                        : props?.item?.signedGroupImageUrl != ''
                        ? props?.item?.signedGroupImageUrl
                        : placeholder,
                }}
                //defaultSource={{ uri: placeholder }}
                style={{ aspectRatio: 0.87, flex: 1, flexDirection: 'column' }}
                onError={(err) => {
                    console.log('group card image background error', err?.nativeEvent);
                }}
            >
                <View style={{ flex: 3 }}></View>
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'column',
                        width: '100%',
                        backgroundColor: 'rgba(42,42,42,0.9)',
                        paddingHorizontal: 10,
                        paddingVertical: 7,
                    }}
                >
                    <MemareeText style={{ color: colors.text }} numberOfLines={1}>
                        {props?.item?.name}
                    </MemareeText>
                    <MemareeText style={{ color: colors.tertiary }}>
                        {`${props?.item?.userCount} Member${props?.item?.userCount > 1 ? 's' : ''}`}
                    </MemareeText>
                </View>
            </ImageBackground>
        </TouchableOpacity>
    );
};

export default memo(GroupCard);

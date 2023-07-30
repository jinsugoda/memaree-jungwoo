import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, TouchableOpacity, View, Image, Text, SafeAreaView } from 'react-native';
import { ListItem } from '@rneui/base';

// types
import { StackNavigationProp } from '@react-navigation/stack';
import { CustomTheme } from 'styles/theme/customThemeProps';
import { RootStackParamList } from 'types/Screens';

// 3rd party hooks
import { useQuery } from '@apollo/client';
import { useTheme } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

// gpl queries
import { SEARCH_POSTS } from 'components/screens/searchScreen/gpl/search';

// redux
import { selectUserId } from 'store/slices/userSlice';

// custom components
import GradientAvatar from 'components/common/avatars/single/GradientAvatar';

// styles
import { NotificationsStyles } from 'styles';
import { ImageRotationFix } from 'styles/stylesheets/imagesStyles';
import FeedComponent from '../feed/composables/FeedComponent';
import { MemareeFlipsidePostsQry } from '../feed/gql/MemareeFlipsidePostsQry';

import * as Location from 'expo-location';
import MemareeText from 'components/common/textAndInputs/MemareeText';
import RoundedImage from 'components/common/images/RoundedImage';

const postsKey_flipped = 'getMemareeFlipsidePosts';
export const initialVariables = {
    input: {
        limit: 20,
        lat: 0,
        lon: 0,
        distance: 50000000,
    },
};

export const PostListSearchScreen = ({ route }) => {
    const { colors }: CustomTheme = useTheme();
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const [postDataList, setPostDataList] = useState([]);
    const userId = useSelector(selectUserId);

    const [latitude, setLatitude] = useState(undefined);
    const [longitude, setLongitude] = useState(undefined);

    useEffect(() => {
        (async () => {
            try {
                let { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    console.log('Permission to access location was denied');
                    return;
                }

                let location = await Location.getCurrentPositionAsync({});
                setLatitude(location.coords.latitude);
                setLongitude(location.coords.longitude);
            } catch (error) {
                console.error('Error retrieving location:', error);
            }
        })();
    }, []);

    let userInput = useSelector(
        (state: { search: { userInput: string } }) => state?.search?.userInput,
    );

    const { error: postError } = useQuery(SEARCH_POSTS, {
        variables: { input: userInput?.toLowerCase() },
        fetchPolicy: 'network-only',
        skip: userInput === '',
        onCompleted: (newData) => {
            newData?.searchPosts !== undefined && updateData(newData?.searchPosts);
        },
    });
    const {
        loading: loading_flipped,
        error: error_flipped,
        data: data_flipped,
        fetchMore: fetchMore_flipped,
        refetch: refetch_flipped,
    } = useQuery(MemareeFlipsidePostsQry, {
        variables: initialVariables,
        fetchPolicy: 'cache-and-network',
        skip: !latitude || !longitude, // Skip the query if latitude or longitude is not available
    });

    const updateData = useCallback(
        (list) => {
            setPostDataList([...list]);
        },
        [setPostDataList],
    );

    if (postError && userInput !== '') {
        return (
            <MemareeText style={{ color: colors.text, textAlign: 'center' }}>
                Oops. Something went wrong.
            </MemareeText>
        );
    }

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity
                onPress={() => navigation.navigate('ViewPostScreen', { post: item })}
            >
                <ListItem
                    containerStyle={{
                        paddingVertical: 6,
                        backgroundColor: colors.background,
                    }}
                >
                    <TouchableOpacity
                        onPress={() => {
                            if (userId === item?.user?._id) {
                                navigation.navigate('SelfProfileScreen');
                            } else {
                                navigation.navigate('OtherProfileScreen', { id: item?.user?._id });
                            }
                        }}
                    >
                        <GradientAvatar source={item?.user?.profilePicUrl ?? 'DEFAULT'} size={40} />
                    </TouchableOpacity>
                    <ListItem.Content>
                        <ListItem.Title style={{ color: colors.text, fontFamily: 'Outfit-Bold' }}>
                            {item?.user?.username}
                        </ListItem.Title>
                        <ListItem.Subtitle style={{ color: colors.text }}>
                            {item?.content?.caption > 50
                                ? item?.content?.caption.substring(0, 47) + '...'
                                : item?.content?.caption}
                        </ListItem.Subtitle>
                    </ListItem.Content>
                    <View style={NotificationsStyles.postPreview}>
                        <RoundedImage
                            uri={`${item?.signedUrl}`}
                            cacheKey={`${item?.content?.imageUrls[0]}`}
                            imageStyle={[NotificationsStyles.postPreview, ImageRotationFix]}
                        />
                    </View>
                </ListItem>
            </TouchableOpacity>
        );
    };
    try {
        return (
            <View style={{ height: '100%', width: '100%' }}>
                {userInput !== '' && postDataList?.length === 0 ? (
                    <MemareeText
                        style={{
                            color: colors.text,
                            width: '100%',
                            textAlign: 'center',
                            marginTop: 50,
                        }}
                    >
                        No match found for "{userInput}"
                    </MemareeText>
                ) : userInput === '' ? (
                    <FeedComponent
                        feedType={'memaree'}
                        columnCount={3}
                        emptyComponent={<></>}
                        postsKey={postsKey_flipped}
                        variables={initialVariables}
                        posts={data_flipped?.[postsKey_flipped]}
                        loading={loading_flipped}
                        error={error_flipped}
                        fetchMore={fetchMore_flipped}
                        refetch={refetch_flipped}
                    />
                ) : (
                    <FlatList
                        style={{ backgroundColor: colors.background, width: '100%' }}
                        data={postDataList}
                        renderItem={renderItem}
                        keyExtractor={(item) => 'PLSS1' + item?._id}
                        extraData={postDataList}
                    />
                )}
            </View>
        );
    } catch (error) {
        return <MemareeText style={{ color: colors.text }}>Error: {error.message}</MemareeText>;
    }
};

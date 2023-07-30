import React, { useCallback, useEffect, useState } from 'react';
import {
    SafeAreaView,
    TextInput,
    Text,
    View,
    TouchableOpacity,
    Dimensions,
    Switch,
} from 'react-native';

import { Button, Searchbar, useTheme } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import { ListItem } from '@rneui/base';
import moment from 'moment-timezone';
import { debounce } from 'lodash';

// types
import { RootStackParamList } from 'types/Screens';
import { StackNavigationProp } from '@react-navigation/stack';
import { CustomTheme } from 'styles/theme/customThemeProps';

// 3rd party hooks
import { useMutation, useQuery } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';

// gpl queries
import {
    CREATE_GROUPS,
    GET_USER_BY_NAME,
    INVITE_USER_TO_GROUP,
    JOIN_GROUP,
} from 'components/screens/groups/gpl/queries';

// custom components
import GradientAvatar from 'components/common/avatars/single/GradientAvatar';
import MemareeText from 'components/common/textAndInputs/MemareeText';

// icons
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faXmark, faAdd } from '@fortawesome/free-solid-svg-icons';

// redux
import { useSelector } from 'react-redux';
import { selectUser, selectUserId } from 'store/slices/userSlice';

// styles
import { screenRoot } from 'styles/stylesheets/ScreenStyles';
import { PreviewStyles } from 'styles';
import { GroupCRUDStyles } from '../style/GroupScreenStyle';
import MemareeInput from 'components/common/textAndInputs/MemareeInput';

import { useMedia } from 'hooks/useMedia';
import { ShorttenText } from 'utils/customFormatters';
const LIMIT = 24;

export const CreateGroupScreen = ({ route }) => {
    const { colors }: CustomTheme = useTheme();
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const ref = React.useRef(null);
    const selfUser = useSelector(selectUser);
    const screenWidth = Dimensions.get('window').width;
    const ptValue = screenWidth * 0.9;

    const [searchQuery, setSearchQuery] = useState('');
    const [searchQueryDisplay, setSearchQueryDisplay] = useState('');
    const [activeUserList, setActiveUserList] = useState([]);
    const [searchUserList, setSearchUserList] = useState([]);
    // const [readOnly, setReadOnly] = useState(false);
    const [insertOneGroup, { loading: loadingLazy, error: errorLazy, data: dataLazy }] =
        useMutation(CREATE_GROUPS);
    const [inviteUserToGroup, { loading: loadingInvite }] = useMutation(INVITE_USER_TO_GROUP);
    const [JoinGroup, { loading: loadingAppendId }] = useMutation(JOIN_GROUP);
    const { onMediaVerified } = useMedia();
    const { loading, error, data } = useQuery(GET_USER_BY_NAME, {
        variables: { input: searchQuery.toLowerCase() },
        fetchPolicy: 'network-only',
        skip: searchQuery === '',
    });

    const debouncedOnChangeSearch = useCallback(
        debounce((query) => {
            setSearchQuery(query);
        }, 400), //the debounce delay
        [],
    );
    useEffect(() => {
        navigation.setOptions({
            headerTitle: ShorttenText(route?.params?.name, 15),
        });
    }, []);

    const filterResult = useCallback(() => {
        if (data && data?.searchUsers && activeUserList) {
            let temp = [...data?.searchUsers];
            for (let i = 0; i < temp.length; i++) {
                for (let j = 0; j < activeUserList.length; j++) {
                    if (temp[i]._id === activeUserList[j]._id) {
                        temp.splice(i, 1);
                        i--;
                        break;
                    }
                }
            }
            setSearchUserList(temp);
        }
    }, [data, activeUserList]);

    useEffect(() => {
        if (!loading) filterResult();
    }, [activeUserList, filterResult]);

    if (error) return <MemareeText>error</MemareeText>;

    const onChangeSearch = (query) => {
        setSearchQueryDisplay(query);
        debouncedOnChangeSearch(query);
    };

    const removeUser = (_id: string) => {
        const newArray = activeUserList.filter((obj) => obj._id !== _id);
        setActiveUserList(newArray);
    };
    const addUser = (user) => {
        setActiveUserList([user, ...activeUserList]);
    };

    const CreateSharedGroupScreen = async () => {
        const mediaUri = route?.params?.mediaUri;
        const currentDate = new Date();
        const formattedDate = moment(currentDate).format('YYYY-MM-DDTHH:mm:ss.SSSZ');
        const idList = [selfUser?._id];

        for (let i = 0; i < activeUserList?.length; i++) {
            idList?.push(activeUserList[i]?._id);
        }

        // Wait for the promise to resolve before continuing
        const insertResult = await insertOneGroup({
            variables: {
                data: {
                    metaData: {
                        createdAt: formattedDate,
                        updatedAt: formattedDate,
                        deletedAT: '1970-01-01T00:00:00.000+00:00',
                    },
                    name: route?.params?.name,
                    posts: {
                        link: [],
                    },
                    owner: {
                        link: selfUser?._id,
                    },
                    users: {
                        link: [selfUser?._id],
                    },
                    groupImage: mediaUri.split('/').pop(),
                    // readOnly: readOnly,
                    lastActivityAt: new Date().toISOString(),
                },
            },
        });

        // console.log(insertResult.data?.insertOneGroup._id);
        if (idList?.length > 0) {
            idList?.forEach((element) => {
                if (element === selfUser?._id) {
                    return;
                }
                inviteUserToGroup({
                    variables: {
                        input: {
                            userId: element,
                            groupId: insertResult?.data?.insertOneGroup._id,
                        },
                    },
                });
            });
        }
        JoinGroup({
            variables: {
                userId: selfUser?._id,
                groupId: insertResult?.data?.insertOneGroup?._id,
            },
        });
        await onMediaVerified(false);
        if (!errorLazy && !loadingLazy) {
            // navigation.goBack();
            navigation.navigate('GroupCardScreen', {
                groupId: insertResult.data?.insertOneGroup?._id,
                groupName: route?.params?.name,
                groupImage: mediaUri,
            });
        }
    };
    let notPressable = false;
    try {
        return (
            <ScrollView
                contentContainerStyle={GroupCRUDStyles.ContainerScrollView}
                showsVerticalScrollIndicator={true}
                persistentScrollbar={false}
            >
                <SafeAreaView style={{ flex: 1, height: '100%', alignItems: 'center' }}>
                    <View style={{ width: ptValue, height: '100%' }}>
                        <View style={{ height: 150 }}>
                            <ScrollView
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                style={{ height: 150 }}
                            >
                                <View
                                    key={'v' + selfUser?._id}
                                    style={{ flex: 1, margin: 0, height: 120 }}
                                >
                                    <TouchableOpacity
                                        key={'t' + selfUser?._id}
                                        style={{
                                            flex: 0,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            marginTop: 14,
                                        }}
                                        onPress={() => {
                                            navigation.navigate('SelfProfileScreen');
                                        }}
                                    >
                                        <GradientAvatar
                                            key={'g' + selfUser?._id}
                                            source={selfUser?.profilePicUrl}
                                            size={66}
                                        />
                                        <View
                                            style={{
                                                flex: 0,
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                width: 90,
                                            }}
                                        >
                                            <MemareeText
                                                style={{
                                                    flex: 0,
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    color: colors.text,
                                                    fontSize: 13,
                                                    marginTop: 7,
                                                    maxWidth: 90,
                                                }}
                                            >
                                                {selfUser?.username?.length > 12
                                                    ? selfUser?.username?.substring(0, 9) + '...'
                                                    : selfUser?.username}
                                            </MemareeText>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                {activeUserList?.length > 0 &&
                                    activeUserList?.map((element) => {
                                        return (
                                            <View
                                                key={'v' + element?._id}
                                                style={{ margin: 0, height: 120 }}
                                            >
                                                <TouchableOpacity
                                                    key={'t' + element?._id}
                                                    style={{
                                                        flex: 0,
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        marginTop: 14,
                                                        width: 80,
                                                    }}
                                                    onPress={() => {
                                                        if (selfUser?._id === element?._id) {
                                                            navigation.navigate(
                                                                'SelfProfileScreen',
                                                            );
                                                        } else {
                                                            navigation.navigate(
                                                                'OtherProfileScreen',
                                                                {
                                                                    id: element?._id,
                                                                },
                                                            );
                                                        }
                                                    }}
                                                >
                                                    <GradientAvatar
                                                        key={'g' + element?._id}
                                                        source={element?.profilePicUrl}
                                                        size={66}
                                                    />
                                                    <MemareeText
                                                        style={[
                                                            GroupCRUDStyles.UserSquareNavigateText,
                                                            {
                                                                color: colors.text,
                                                            },
                                                        ]}
                                                    >
                                                        {element?.username?.length > 12
                                                            ? element?.username.substring(0, 9) +
                                                              '...'
                                                            : element?.username}
                                                    </MemareeText>
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    key={'to' + element?._id}
                                                    onPress={() => removeUser(element?._id)}
                                                    style={[
                                                        GroupCRUDStyles.UserSquareRemoveContainer,
                                                        {
                                                            backgroundColor: colors.tertiary,
                                                        },
                                                    ]}
                                                >
                                                    <FontAwesomeIcon
                                                        color="black"
                                                        icon={faXmark}
                                                        size={10}
                                                    />
                                                </TouchableOpacity>
                                            </View>
                                        );
                                    })}
                            </ScrollView>
                        </View>
                        <MemareeText
                            style={[
                                GroupCRUDStyles.Title,
                                {
                                    color: colors.text,
                                },
                            ]}
                        >
                            Add People:
                        </MemareeText>
                        <Searchbar
                            style={[
                                GroupCRUDStyles.Search,
                                {
                                    width: ptValue,
                                },
                            ]}
                            placeholder="Search"
                            placeholderTextColor={colors.text}
                            onChangeText={onChangeSearch}
                            value={searchQueryDisplay}
                            iconColor={colors.text}
                            ref={ref}
                            cursorColor={colors.text}
                            inputStyle={{ color: colors.text }}
                        />
                        <ScrollView
                            style={GroupCRUDStyles.SearchResultContainer}
                            horizontal={false}
                            showsVerticalScrollIndicator={false}
                        >
                            <View style={GroupCRUDStyles.InnerSearchResultContainer} />
                            {loading ? (
                                <MemareeText>Loading...</MemareeText>
                            ) : error ? (
                                <MemareeText>Error</MemareeText>
                            ) : (
                                searchUserList.map((element) => {
                                    if (element?._id === selfUser?._id) return null;
                                    return (
                                        <ListItem
                                            key={'l' + element?._id}
                                            containerStyle={[
                                                GroupCRUDStyles.SearchResultRowContainer,
                                                {
                                                    backgroundColor: colors.background,
                                                },
                                            ]}
                                        >
                                            <TouchableOpacity
                                                onPress={() => {
                                                    if (selfUser?._id === element?._id) {
                                                        navigation.navigate('SelfProfileScreen');
                                                    } else {
                                                        navigation.navigate('OtherProfileScreen', {
                                                            id: element?._id,
                                                        });
                                                    }
                                                }}
                                            >
                                                <GradientAvatar
                                                    key={'gr' + element?._id}
                                                    source={element?.profilePicUrl}
                                                    size={66}
                                                />
                                            </TouchableOpacity>
                                            <ListItem.Content>
                                                <ListItem.Title
                                                    key={'li' + element?._id}
                                                    style={{
                                                        color: colors.text,
                                                        fontFamily: 'Outfit-Bold',
                                                    }}
                                                >
                                                    {element?.username}
                                                </ListItem.Title>
                                            </ListItem.Content>
                                            <TouchableOpacity
                                                key={'tou' + element?._id}
                                                onPress={() => addUser(element)}
                                                style={[
                                                    GroupCRUDStyles.AddButton,
                                                    {
                                                        borderColor: colors.tertiary,
                                                    },
                                                ]}
                                            >
                                                <FontAwesomeIcon
                                                    color={colors.tertiary}
                                                    icon={faAdd}
                                                    size={15}
                                                />
                                            </TouchableOpacity>
                                        </ListItem>
                                    );
                                })
                            )}
                        </ScrollView>
                        {/* <View style={PreviewStyles.switchGroup}>
                        <View style={GroupCRUDStyles.RestrictingContainer}>
                            <MemareeText style={[GroupCRUDStyles.BoldText, { color: colors.text }]}>
                                Restricted
                            </MemareeText>
                            <MemareeText
                                style={[
                                    GroupCRUDStyles.SubText,
                                    {
                                        color: colors.text,
                                    },
                                ]}
                            >
                                No one else can share a post
                            </MemareeText>
                        </View>
                        <Switch
                            value={readOnly}
                            onValueChange={() => setReadOnly(!readOnly)}
                            trackColor={{ false: colors.text, true: colors.tertiary }}
                            thumbColor="white"
                            ios_backgroundColor="white"
                            style={PreviewStyles.switchInput}
                        />
                    </View> */}
                        <View id="bottom_items" style={GroupCRUDStyles.ButtonContainer}>
                            <Button
                                onPress={() => CreateSharedGroupScreen()}
                                disabled={notPressable}
                                labelStyle={{
                                    color: notPressable ? 'white' : 'black',
                                    fontFamily: 'Outfit-Bold',
                                }}
                                style={[
                                    GroupCRUDStyles.CrudButton,
                                    {
                                        backgroundColor: notPressable ? '#2F2F2F' : colors.tertiary,
                                        borderColor: notPressable ? '#2F2F2F' : colors.tertiary,
                                        width: ptValue,
                                    },
                                ]}
                            >
                                Create Group
                            </Button>
                        </View>
                    </View>
                </SafeAreaView>
            </ScrollView>
        );
    } catch (error) {
        return <MemareeText style={{ color: colors.text }}>Error: {error?.message}</MemareeText>;
    }
};

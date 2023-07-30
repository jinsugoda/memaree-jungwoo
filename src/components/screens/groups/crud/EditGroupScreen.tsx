import React, { useCallback, useEffect, useState } from 'react';
import { SafeAreaView, Text, View, TouchableOpacity, Dimensions, Switch } from 'react-native';
import { Button, Searchbar, useTheme } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import { ListItem } from '@rneui/base';
import { debounce } from 'lodash';
import moment from 'moment';

// types
import { RootStackParamList } from 'types/Screens';
import { StackNavigationProp } from '@react-navigation/stack';
import { CustomTheme } from 'styles/theme/customThemeProps';

// 3rd partyhooks
import { useFocusEffect, useIsFocused, useNavigation } from '@react-navigation/native';
import { useMutation, useQuery } from '@apollo/client';

// gpl queries
import {
    GET_USER_BY_NAME,
    INVITE_USER_TO_GROUP,
    UPDATE_GROUPS,
    REMOVE_USER,
    GET_GROUP_ALL_EDIT,
} from 'components/screens/groups/gpl/queries';

// redux
import { useSelector } from 'react-redux';
import { selectUser, selectUserId } from 'store/slices/userSlice';

// utils
import Logger, { ErrorType } from 'utils/logger';

// custom components
import GradientAvatar from 'components/common/avatars/single/GradientAvatar';
import MemareeText from 'components/common/textAndInputs/MemareeText';

// icons
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faXmark, faAdd } from '@fortawesome/free-solid-svg-icons';
import MemareeInput from 'components/common/textAndInputs/MemareeInput';

// styles
import { screenRoot } from 'styles/stylesheets/ScreenStyles';
import { PreviewStyles } from 'styles';
import { GroupCRUDStyles } from '../style/GroupScreenStyle';

const LIMIT = 24;
import { GroupPhotoUploader } from './GroupPhotoUploader';
import { useMedia } from 'hooks/useMedia';

import * as ImagePicker from 'expo-image-picker';

export const EditGroupScreen = ({ route }) => {
    const { colors }: CustomTheme = useTheme();
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const ref = React.useRef(null);
    const [name, setName] = useState(route?.params?.name);
    const userId = useSelector(selectUserId);

    const selfUser = useSelector(selectUser);

    const isFocused = useIsFocused();

    const screenWidth = Dimensions.get('window').width;
    const ptValue = screenWidth * (90 / 100);

    //// Filter out existing members for notification creation

    const [searchQuery, setSearchQuery] = useState('');
    const [searchQueryDisplay, setSearchQueryDisplay] = useState('');

    // const [readOnly, setReadOnly] = useState(false);
    const [total, setTotal] = useState(0);

    const [newImage, setNewImage] = useState(false);
    const [activeUserList, setActiveUserList] = useState([]);
    const [searchUserList, setSearchUserList] = useState([]);

    const {
        onMediaVerified,
        setFileName,
        setImageBase64,
        setMediaType,
        fileName,
        mediaUri,
        setMediaUri,
        setIsGroupImage,
    } = useMedia();

    const {
        loading: GroupsLoading,
        error: GroupsError,
        data: GroupsData,
        refetch,
    } = useQuery(GET_GROUP_ALL_EDIT, {
        variables: {
            query: {
                _id: route?.params?.groupId,
            },
        },
        onCompleted: (data) => {
            setActiveUserList(data?.group?.users);
            setMediaUri(data?.group?.signedGroupImageUrl);
            // if (!data?.group?.readOnly) {
            //     setReadOnly(false);
            // } else {
            //     setReadOnly(data?.group?.readOnly);
            // }
        },
        fetchPolicy: 'cache-first',
    });

    const [updateOneSharedGroup] = useMutation(UPDATE_GROUPS);
    const [inviteUserToGroup, { loading: loadingLazy, error: errorLazy, data: dataLazy }] =
        useMutation(INVITE_USER_TO_GROUP);
    const [removeFromArrayIDField] = useMutation(REMOVE_USER);

    const debouncedOnChangeSearch = useCallback(
        debounce((query) => {
            setSearchQuery(query);
        }, 400), //the debounce delay
        [],
    );

    const { loading, error, data } = useQuery(GET_USER_BY_NAME, {
        variables: { input: searchQuery.toLowerCase() },
        fetchPolicy: 'network-only',
        skip: searchQuery === '',
    });

    const filterResult = useCallback(() => {
        if (data && data?.searchUsers && activeUserList) {
            let temp = [...data?.searchUsers];
            for (let i = 0; i < temp?.length; i++) {
                for (let j = 0; j < activeUserList?.length; j++) {
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
        if (!loading && GroupsData) {
            filterResult();
        }
    }, [GroupsData, filterResult]);
    useFocusEffect(
        React.useCallback(() => {
            if (isFocused) {
                refetch();
            }
        }, [isFocused]),
    );
    if (error) return <MemareeText>error</MemareeText>;
    if (GroupsLoading) return <MemareeText>loading</MemareeText>;
    if (GroupsError) return <MemareeText>error</MemareeText>;
    const idLister = (data) => {
        if (data === undefined) {
            console.log('DATA IS UNDEFINED FOR idLister FOR SOME REASON!');
            Logger(
                ErrorType.OTHER,
                'EditGroupScreen',
                new Error('Custom error: DATA IS UNDEFINED FOR idLister FOR SOME REASON!'),
                'src/components/screens/sharedGroups/EditGroupScreen.tsx',
                134,
                0,
                'DATA IS UNDEFINED FOR idLister FOR SOME REASON!',
                null,
                'NO ENDPOINT',
                {
                    username: route?.params?.username,
                },
            );
            return [];
        }
        let result = [];
        for (let i = 0; i < data?.length; i++) {
            result.push(data[i]._id);
        }
        return result;
    };

    const onChangeSearch = (query) => {
        setSearchQueryDisplay(query);
        debouncedOnChangeSearch(query);
    };
    const CreateSharedGroupScreen = () => {
        const currentDate = new Date();
        const allUserId = idLister(activeUserList);
        const initialMembers = idLister(GroupsData?.group.users);
        const invite = allUserId.filter((id) => !initialMembers.includes(id));
        const remove = initialMembers.filter((id) => !allUserId.includes(id));

        //Invite new users
        try {
            if (invite.length > 0) {
                invite.forEach((element) => {
                    inviteUserToGroup({
                        variables: {
                            input: {
                                userId: element,
                                groupId: route?.params?.groupId,
                            },
                        },
                    });
                });
            }
        } catch (error) {
            console.log('FAILED TO INVITE USERS', error);
            Logger(
                ErrorType.OTHER,
                'EditGroupScreen',
                error,
                'src/components/screens/group/crud/EditGroupScreen.tsx',
                134,
                0,
                'FAILED TO INVITE USERS.',
                null,
                'NO ENDPOINT',
                {
                    username: route?.params?.username,
                    allUserId,
                    initialMembers,
                    invite,
                    remove,
                },
            );
        }

        //Remove users
        try {
            if (remove.length > 0) {
                remove.forEach((element) => {
                    removeFromArrayIDField({
                        variables: {
                            groupId: route?.params?.groupId,
                            userId: element,
                        },
                    });
                });
            }
        } catch (error) {
            console.log('FAILED TO REMOVE USERS', error);
            Logger(
                ErrorType.OTHER,
                'EditGroupScreen',
                error,
                'src/components/screens/group/crud/EditGroupScreen.tsx',
                170,
                0,
                'FAILED TO REMOVE USERS.',
                null,
                'NO ENDPOINT',
                {
                    username: route?.params?.username,
                    allUserId,
                    initialMembers,
                    invite,
                    remove,
                },
            );
        }

        //Update name
        try {
            if (
                route?.params?.name !== name &&
                route?.params?.name !== name
                // ||  readOnly !== groupsData?.group.readOnly
            ) {
                // console.log('edit group screen ready only', readOnly);
                updateOneSharedGroup({
                    variables: {
                        set: {
                            name: name,
                            // readOnly: readOnly,
                        },
                        query: {
                            _id: route?.params?.groupId,
                        },
                    },
                });
            }
        } catch (error) {
            console.log('FAILED TO UPDATE NAME', error);
            Logger(
                ErrorType.OTHER,
                'EditGroupScreen',
                error,
                'src/components/screens/group/crud/EditGroupScreen.tsx',
                204,
                0,
                'FAILED TO UPDATE NAME.',
                null,
                'NO ENDPOINT',
                {
                    username: route?.params?.username,
                    allUserId,
                    initialMembers,
                    invite,
                    remove,
                },
            );
        }
        //update image
        if (newImage) {
            onMediaVerified(false);
            try {
                console.log('Changed Group Image', mediaUri);
                updateOneSharedGroup({
                    variables: {
                        set: {
                            groupImage: fileName,
                        },
                        query: {
                            _id: route?.params?.groupId,
                        },
                    },
                });
            } catch (error) {
                console.log('FAILED TO UPDATE GROUP IMAGE', error);
                Logger(
                    ErrorType.OTHER,
                    'EditGroupScreen',
                    error,
                    'src/components/screens/group/crud/EditGroupScreen.tsx',
                    204,
                    0,
                    'FAILED TO UPDATE GROUP IMAGE.',
                    null,
                    'NO ENDPOINT',
                    {
                        username: route?.params?.username,
                        allUserId,
                        initialMembers,
                        invite,
                        remove,
                        mediaUri,
                    },
                );
            }
        }
        if (!errorLazy && !loadingLazy) navigation.goBack();
    };

    const removeUser = (_id: string) => {
        const newArray = activeUserList.filter((obj) => obj?._id !== _id);
        setActiveUserList(newArray);
    };
    const addUser = (user) => {
        setActiveUserList([user, ...activeUserList]);
    };

    let pressable = !(
        activeUserList?.length > GroupsData?.group?.users.length ||
        name !== route?.params?.name ||
        newImage
    );
    // const changeRestriction = () => {
    //     setReadOnly(!readOnly);
    // };
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            aspect: [4, 5],
            base64: true,
            quality: 1,
        });
        setNewImage(true);
        setFileName(result?.assets[0]?.uri.split('/').pop());
        setMediaUri(result?.assets[0]?.uri);
        setImageBase64(result?.assets[0]?.base64);
        setIsGroupImage(true);
        setMediaType('image');
    };
    try {
        return (
            <ScrollView>
                <SafeAreaView style={{ flex: 0, height: '95%', alignItems: 'center' }}>
                    <View style={{ width: '92%', height: '100%', marginTop: 20 }}>
                        <View
                            style={{
                                flex: 0,
                                width: '100%',
                                alignItems: 'center',
                                marginBottom: 20,
                            }}
                        >
                            <GroupPhotoUploader pickImage={pickImage} />
                        </View>

                        <MemareeText style={{ color: colors.text, marginBottom: 10, fontSize: 14 }}>
                            Rename Group:
                        </MemareeText>
                        <MemareeInput
                            cursorColor={colors.text}
                            placeholderTextColor={colors.text}
                            onChangeText={(newName) => setName(newName)}
                            value={name}
                            defaultValue={name}
                            limit={LIMIT}
                            showLimit={true}
                        />
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
                            {activeUserList?.length === 0 ? (
                                <MemareeText style={{ color: colors.text, height: 150, margin: 5 }}>
                                    No members
                                </MemareeText>
                            ) : (
                                activeUserList?.map((element) => {
                                    if (element?._id === selfUser?._id) return;
                                    return (
                                        <View
                                            key={'v' + element?._id}
                                            style={{ margin: 5, height: 150 }}
                                        >
                                            <TouchableOpacity
                                                key={'t' + element?._id}
                                                style={{
                                                    flex: 0,
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    margin: 10,
                                                }}
                                                onPress={() => {
                                                    if (userId === element?._id) {
                                                        navigation.navigate('SelfProfileScreen');
                                                    } else {
                                                        navigation.navigate('OtherProfileScreen', {
                                                            id: element?._id,
                                                        });
                                                    }
                                                }}
                                            >
                                                <GradientAvatar
                                                    key={'g' + element?._id}
                                                    source={element?.profilePicUrl}
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
                                                        {element?.username?.length > 12
                                                            ? element?.username.substring(0, 9) +
                                                              '...'
                                                            : element?.username}
                                                    </MemareeText>
                                                </View>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                key={'to' + element?._id}
                                                onPress={() => removeUser(element?._id)}
                                                style={{
                                                    flex: 0,
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    backgroundColor: colors.tertiary,
                                                    height: 20,
                                                    width: 20,
                                                    position: 'relative',
                                                    borderRadius: 99,
                                                    bottom: 107,
                                                    left: 73,
                                                }}
                                            >
                                                <FontAwesomeIcon
                                                    key={'f' + element?._id}
                                                    color="black"
                                                    icon={faXmark}
                                                    size={10}
                                                />
                                            </TouchableOpacity>
                                        </View>
                                    );
                                })
                            )}
                        </ScrollView>
                        <View style={screenRoot}>
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

                            <View>
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
                            </View>
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
                                                            height: 20,
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
                                    disabled={pressable}
                                    labelStyle={{
                                        color: pressable ? 'white' : 'black',
                                        fontFamily: 'Outfit-Bold',
                                    }}
                                    style={[
                                        GroupCRUDStyles.CrudButton,
                                        {
                                            backgroundColor: pressable
                                                ? '#2F2F2F'
                                                : colors.tertiary,
                                            borderColor: pressable ? '#2F2F2F' : colors.tertiary,
                                            width: ptValue,
                                        },
                                    ]}
                                >
                                    Update
                                </Button>
                            </View>
                        </View>
                    </View>
                </SafeAreaView>
            </ScrollView>
        );
    } catch (error) {
        return <MemareeText style={{ color: colors.text }}>Error: {error?.message}</MemareeText>;
    }
};

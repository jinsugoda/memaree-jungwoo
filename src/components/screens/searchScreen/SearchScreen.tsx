import React, { useCallback, useState } from 'react';
import { SafeAreaView, View, Dimensions } from 'react-native';
import { Searchbar, useTheme } from 'react-native-paper';
import { debounce } from 'lodash';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

// types
import { CustomTheme } from 'styles/theme/customThemeProps';

// 3rd party hooks
import { useDispatch } from 'react-redux';

// redux
import { setUserInput } from 'store/slices/searchSlice';

// custom components
import { UserListSearchScreen } from './userListSearchScreen';
import { PostListSearchScreen } from './postListSearchScreen';

// styles
import { CircleStyles, ProfileStyles } from 'styles';

// svgs
import PeopleLabelSVG from 'assets/tabBarSVGs/peopleLabel.svg';
import ContentLabelSVG from 'assets/tabBarSVGs/contentLabel.svg';

const Tab = createMaterialTopTabNavigator();

const SearchScreen = () => {
    const ref = React.useRef(null);
    const screenWidth = Dimensions.get('window').width;
    const dispatch = useDispatch();
    const ptValue = screenWidth * 0.9;

    const { colors }: CustomTheme = useTheme();
    const [searchQueryDisplay, setSearchQueryDisplay] = useState('');
    const [hasFocus, setHasFocus] = React.useState(false);

    // const [searchType, setSearchType] = React.useState('users'); // ['users', 'posts']
    const debouncedOnChangeSearch = useCallback(
        debounce((query) => {
            dispatch(setUserInput(query));
        }, 400), //the debounce delay
        [],
    );
    const onChangeSearch = (query) => {
        setSearchQueryDisplay(query);
        debouncedOnChangeSearch(query);
    };

    return (
        <SafeAreaView style={[CircleStyles.circleContainer, { height: '100%', width: '100%' }]}>
            <Searchbar
                style={{
                    color: 'white',
                    height: 40,
                    width: ptValue,
                    backgroundColor: '#2F2F2F',
                    fontFamily: 'Outfit-Bold',
                    borderRadius: 99,
                }}
                placeholder="Search"
                placeholderTextColor={colors.text}
                onChangeText={onChangeSearch}
                value={searchQueryDisplay}
                iconColor={colors.text}
                cursorColor={colors.text}
                inputStyle={{
                    color: colors.text,
                    fontFamily: 'Outfit-Bold',
                    marginTop: -2,
                    textAlignVertical: 'center',
                    paddingBottom: 10,
                }}
                // onIconPress={()=>ref.current.focus()}5
                onFocus={() => setHasFocus(true)}
                onBlur={() => setHasFocus(false)}
                ref={ref}
            />
            <Tab.Navigator
                style={[
                    ProfileStyles.TabNavigator,
                    { borderBottomWidth: 0, flex: 1, width: '100%', height: '100%' },
                ]}
                screenOptions={({ route }) => ({
                    borderColor: colors.tab,
                    tabBarInactiveTintColor: colors.text,
                    tabBarIndicatorStyle: { borderColor: colors.tab, borderWidth: 1 },
                    headerShown: false,
                    presentation: 'transparentModal',
                    headerTitleStyle: {
                        fontFamily: 'Outfit-Bold',
                        color: colors.text,
                    },
                    tabBarStyle: {
                        width: '100%',
                        alignSelf: 'center',
                        borderBottomWidth: 10,
                        borderBottomColor: 'white',
                    },
                    tabBarIconStyle: {
                        alignItems: 'center',
                        alignContent: 'center',
                        justifyContent: 'center',
                    },
                    tabBarShowLabel: false,
                    cardStyle: { backgroundColor: colors.background },
                })}
            >
                <Tab.Screen
                    name="UserComponent"
                    options={{
                        // tabBarLabel: 'People',
                        tabBarIcon: (props) => <PeopleLabelSVG fill={props?.color} />,
                        tabBarStyle: { backgroundColor: colors.background },
                    }}
                    component={UserListSearchScreen}
                />
                <Tab.Screen
                    name="PostComponent"
                    options={{
                        tabBarIcon: (props) => (
                            <ContentLabelSVG style={{ marginTop: 1 }} fill={props?.color} />
                        ),
                        tabBarStyle: { backgroundColor: colors.background },
                    }}
                    component={PostListSearchScreen}
                />
            </Tab.Navigator>
        </SafeAreaView>
    );
};

export default SearchScreen;

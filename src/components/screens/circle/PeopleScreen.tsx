import React, { useState } from 'react';
import { KeyboardAvoidingView, ScrollView, TouchableOpacity, View } from 'react-native';
import { Searchbar, useTheme } from 'react-native-paper';
import { CustomTheme } from 'styles/theme/customThemeProps';
import { searchContainerStyle, tabBtnStyle, tabListStyle } from './PeopleStyles';
import MemareeText from 'components/common/textAndInputs/MemareeText';
import CircleUserList from './CircleUserList';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RememberedByUserList from './RememberedByUserList';
import RememberingUserList from './RememberingUserList';

const peopleTabs = [
    {
        key: 'circle',
        label: 'Circle',
    },
    {
        key: 'remembered-by',
        label: 'Remembered By',
    },
    {
        key: 'remembering',
        label: 'Remembering',
    },
];

export default function PeopleScreen() {
    const { colors }: CustomTheme = useTheme();

    // State
    const [searchValue, setSearchValue] = useState('');
    const [selectedTab, setSelectedTab] = useState('circle');

    const handleUpdateSearch = (value) => {
        setSearchValue(value);
    };

    const ListComponent = ({ searchString }) => {
        let listComponent;

        switch (selectedTab) {
            case 'remembered-by':
                listComponent = <RememberedByUserList searchString={searchString} />;
                break;
            case 'remembering':
                listComponent = <RememberingUserList searchString={searchString} />;
                break;
            default:
                listComponent = <CircleUserList searchString={searchString} />;
                break;
        }

        return listComponent;
    };

    return (
        <SafeAreaProvider>
            <KeyboardAvoidingView>
                <View style={searchContainerStyle}>
                    <Searchbar
                        style={{
                            backgroundColor: '#2F2F2F',
                            borderRadius: 99,
                            paddingHorizontal: 24,
                            height: 50,
                        }}
                        placeholder="Search"
                        placeholderTextColor={colors.text}
                        onChangeText={handleUpdateSearch}
                        value={searchValue}
                        iconColor={colors.text}
                        cursorColor={colors.text}
                        inputStyle={{
                            color: colors.text,
                            fontFamily: 'Outfit-Bold',
                            paddingBottom: 5,
                        }}
                    />
                </View>
                <ScrollView horizontal style={tabListStyle}>
                    {peopleTabs.map(({ key, label }, i) => (
                        <TouchableOpacity
                            key={key}
                            style={[
                                tabBtnStyle,
                                {
                                    backgroundColor:
                                        selectedTab === key ? colors.tertiary : '#2F2F2F',
                                    marginLeft: i === 0 ? 0 : 8,
                                },
                            ]}
                            onPress={() => setSelectedTab(key)}
                        >
                            <MemareeText
                                style={{
                                    color: selectedTab === key ? colors.background : colors.text,
                                    fontSize: 13,
                                }}
                            >
                                {label}
                            </MemareeText>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </KeyboardAvoidingView>
            <ListComponent searchString={searchValue} />
        </SafeAreaProvider>
    );
}

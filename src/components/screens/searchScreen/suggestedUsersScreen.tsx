import React, { useState } from 'react';
import { FlatList, View, ActivityIndicator } from 'react-native';
import { Icon, ListItem } from '@rneui/base';

// types
import { CustomTheme } from 'styles/theme/customThemeProps';

// 3rd party hooks
import { useTheme } from 'react-native-paper';
import { ApolloError } from '@apollo/client';

// gpl queries
import MemareeText from 'components/common/textAndInputs/MemareeText';

// Icon
import { SearchUserList } from './list/searchUserList';
import { UserContentEntity } from 'types/DataModels';

type SuggestedUsersScreenProps = {
    userInput: string;
    suggestedRecent: {
        getRecentUserSearch: UserContentEntity[];
    };
    suggestedDataList: {
        getMySuggestedUsers: UserContentEntity[];
    };
    errorRecent: ApolloError;
    errorSuggestion: ApolloError;
    loadingRecent: boolean | undefined;
    loadingSuggestion: boolean | undefined;
    navigateToProfile: (object) => void;
    onFetchMore: (object) => void;
};
export const SuggestedUsersScreen = ({
    userInput,
    suggestedDataList,
    errorSuggestion,
    loadingSuggestion,
    navigateToProfile,
    onFetchMore,
    suggestedRecent,
    errorRecent,
    loadingRecent,
}: SuggestedUsersScreenProps) => {
    const { colors }: CustomTheme = useTheme();
    const [expanded, setExpanded] = useState(false);
    const [expandedSuggested, setExpandedSuggested] = useState(true);

    if (errorSuggestion) {
        console.log('suggestedUsersScreen', errorSuggestion);
        return (
            <MemareeText
                style={{
                    color: colors.text,
                    textAlign: 'center',
                }}
            >
                Oops! Something went wrong
            </MemareeText>
        );
    }

    try {
        return (
            <View style={{ flex: 1 }}>
                {suggestedRecent?.getRecentUserSearch?.length !== 0 && (
                    <View>
                        {errorRecent ? (
                            <View style={{ flexGrow: 1, justifyContent: 'center' }}>
                                <MemareeText
                                    style={{
                                        color: colors.text,
                                        textAlign: 'center',
                                    }}
                                >
                                    Oops! Something went wrong
                                </MemareeText>
                            </View>
                        ) : loadingRecent ? (
                            <View style={{ flexGrow: 1, justifyContent: 'center' }}>
                                <ActivityIndicator />
                            </View>
                        ) : (
                            <ListItem.Accordion
                                icon={
                                    <Icon
                                        name="chevron-down"
                                        type="material-community"
                                        color={colors.text}
                                        size={30}
                                    />
                                }
                                containerStyle={{
                                    backgroundColor: 'transparent',
                                    borderColor: 'gray',
                                    //borderTopWidth: 1,
                                }}
                                content={
                                    <ListItem.Content>
                                        <MemareeText
                                            style={{
                                                color: colors.text,
                                                marginLeft: 10,
                                                marginTop: 10,
                                            }}
                                        >
                                            Recent:
                                        </MemareeText>
                                    </ListItem.Content>
                                }
                                isExpanded={expanded}
                                onPress={() => {
                                    setExpanded((prev) => !prev);
                                }}
                            >
                                <FlatList
                                    style={{
                                        backgroundColor: colors.background,
                                        width: '100%',
                                    }}
                                    contentContainerStyle={{
                                        paddingBottom: 10,
                                    }}
                                    data={suggestedRecent?.getRecentUserSearch}
                                    renderItem={(data) => (
                                        <SearchUserList
                                            data={data}
                                            type="recent"
                                            navigateToProfile={navigateToProfile}
                                        />
                                    )}
                                    keyExtractor={(item) => 'Li0' + item?._id}
                                    onEndReached={onFetchMore}
                                />
                            </ListItem.Accordion>
                        )}
                    </View>
                )}
                <View style={{ flex: 1 }}>
                    {errorSuggestion ? (
                        <View style={{ flexGrow: 1, justifyContent: 'center' }}>
                            <MemareeText style={{ color: colors.text, textAlign: 'center' }}>
                                Oops! Something went wrong
                            </MemareeText>
                        </View>
                    ) : loadingSuggestion ? (
                        <View style={{ flexGrow: 1, justifyContent: 'center' }}>
                            <ActivityIndicator />
                        </View>
                    ) : (
                        <ListItem.Accordion
                            icon={
                                <Icon
                                    name="chevron-down"
                                    type="material-community"
                                    color={colors.text}
                                    size={30}
                                />
                            }
                            containerStyle={{
                                backgroundColor: colors.background,
                                borderColor: 'gray',
                                //borderTopWidth: 1,
                            }}
                            content={
                                <ListItem.Content>
                                    <MemareeText
                                        style={{
                                            color: colors.text,
                                            marginLeft: 10,
                                            marginTop: 10,
                                        }}
                                    >
                                        People you may know:
                                    </MemareeText>
                                </ListItem.Content>
                            }
                            isExpanded={expandedSuggested}
                            onPress={() => {
                                setExpandedSuggested((prev) => !prev);
                            }}
                        >
                            <FlatList
                                style={{
                                    backgroundColor: colors.background,
                                    width: '100%',
                                    // paddingBottom: 50,
                                }}
                                data={suggestedDataList.getMySuggestedUsers}
                                contentContainerStyle={{ paddingBottom: 100 }}
                                renderItem={(data) => (
                                    <SearchUserList
                                        data={data}
                                        type="mayKnow"
                                        navigateToProfile={navigateToProfile}
                                    />
                                )}
                                keyExtractor={(item) => 'Li1' + item?._id}
                                onEndReached={onFetchMore}
                            />
                        </ListItem.Accordion>
                    )}
                </View>
            </View>
        );
    } catch (error) {
        return <MemareeText style={{ color: colors.text }}>Error: {error.message}</MemareeText>;
    }
};

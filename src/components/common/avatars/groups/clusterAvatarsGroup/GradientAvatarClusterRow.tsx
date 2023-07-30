import React from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';

// types
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from 'types/Screens';
import { CustomTheme } from 'styles/theme/customThemeProps';

// 3rd party hooks
import { useQuery } from '@apollo/client';
import { useFocusEffect, useIsFocused, useNavigation } from '@react-navigation/native';
import { useTheme } from 'react-native-paper';

//queries
// import { GET_SHARED_LANE } from 'components/screens/groups/gpl/queries';

// custom components
import AddPostButton from 'components/common/buttons/navigation/AddPostButton';
import { GradientAvatarCluster } from './GradientAvatarCluster';
//import RoundAvatarButton, { AvatarData, RoundAvatarButtonProps } from "components/common/buttons/RoundAvatarButton";
import MemareeText from 'components/common/textAndInputs/MemareeText';

// styles
import CircleGroupsRowStyles from 'styles/stylesheets/CircleGroupsRowStyles';

const GradientAvatarClusterRow = (props) => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    const { colors }: CustomTheme = useTheme();
    const isFocused = useIsFocused();

    const { loading, error, data: LanesData, refetch } = useQuery(GET_SHARED_LANE);
    // const {loading: myLanesLoading, error: myLanesError, data: myLanesData, refetch} = useQuery(GET_MY_SHARED_LANE,{
    //     variables:{
    //         query:{
    //             _id:userID
    //         }
    //     }
    // });

    useFocusEffect(
        React.useCallback(() => {
            if (isFocused) {
                refetch();
            }
        }, [LanesData]),
    );

    // useEffect(() => {
    //     if(!myLanesLoading && !myLanesError && myLanesData){
    //         const idList = [];
    //         for (let i = 0; i < myLanesData.user.sharedLanes.length; i++) {
    //           idList.push(myLanesData.user.sharedLanes[i]._id);
    //         }

    //         sharedLanes({

    //         })
    //     }

    // }, [myLanesLoading, myLanesError, myLanesData,LanesData])

    // if (myLanesLoading) return <Text>loading...</Text>;
    // if (myLanesError) return <Text>error </Text>;

    if (error) console.log('gradient avatar cluster row query err: ', error);
    // 116 is the total height of all the child components
    if (loading)
        return (
            <View
                style={{
                    flex: 0,
                    justifyContent: 'center',
                    marginLeft: 10,
                    minHeight: 80,
                    marginBottom: 10,
                }}
            >
                <ActivityIndicator />
            </View>
        );
    if (error)
        return (
            <View
                style={{
                    flex: 0,
                    justifyContent: 'center',
                    marginLeft: 10,
                    minHeight: 80,
                    marginBottom: 10,
                }}
            >
                <ActivityIndicator />
            </View>
        );

    return (
        <View style={{ marginLeft: 10 }}>
            <View style={{ flex: 0, flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    style={[CircleGroupsRowStyles.container, { minHeight: 80 }]}
                >
                    <View
                        style={{
                            flex: 0,
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 50,
                            height: 80,
                        }}
                    >
                        <View style={{ flex: 0, alignItems: 'center', justifyContent: 'center' }}>
                            <AddPostButton
                                style={{ paddingRight: 0 }}
                                {...props}
                                size={25}
                                onPress={() => navigation.navigate('CreateGroupScreen')}
                            />
                        </View>
                        <MemareeText style={{ fontSize: 11, marginTop: 7, color: colors.text }}>
                            Groups
                        </MemareeText>
                    </View>
                    <View style={{ width: 40 }} />
                    {LanesData?.mySharedLanes?.map((element, index) => (
                        <GradientAvatarCluster
                            key={element._id}
                            laneId={element._id}
                            users={element.users}
                            name={element.name}
                            owner={element.owner}
                            size={60}
                        />
                    ))}
                </ScrollView>
            </View>
        </View>
    );
};

export { GradientAvatarClusterRow };

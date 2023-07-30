import React, { useEffect, useState } from 'react';
import { Animated, Keyboard, View } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

// types
import { RootStackParamList } from 'types/Screens';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CustomTheme } from 'styles/theme/customThemeProps';
import { FeedContext, FeedContextProps } from './FeedContext';

// 3rd party hooks
import { useTheme } from 'react-native-paper';

// custom components
import FlipSideButton from 'components/common/buttons/other/FlipsideButton';

// custom components -feed screens
import MemareeScreen from './memaree/MemareeScreen';
import CircleScreen from './circle/CircleScreen';
import VisionScreen from './vision/VisionScreen';

// svg icons
import { MemareeTitle, CircleTitle, VisionTitle } from 'components/common/misc/Titles';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import MemareeButton from 'assets/generalSVGs/MemareeButton.svg';
import FlipsideGradient from 'assets/generalSVGs/FlipsideGradient.svg';

const Tab = createMaterialTopTabNavigator();
type FeedScreenProps = NativeStackScreenProps<RootStackParamList, 'FeedScreen'>;

const FeedScreen = (props: FeedScreenProps) => {
    const [isFlippedMemaree, setIsFlippedMemaree] = useState(false);
    const [isFlippedCircle, setIsFlippedCircle] = useState(false);
    const [isFlippedVision, setIsFlippedVision] = useState(false);
    const [keyBoardState, setKeyBoardState] = useState(false);
    const contextValue: FeedContextProps = {
        isFlippedMemaree,
        setIsFlippedMemaree,
        isFlippedCircle,
        setIsFlippedCircle,
        isFlippedVision,
        setIsFlippedVision,
    };

    const [currentActiveTab, setCurrentActiveTab] = useState<number>(0);
    const { colors }: CustomTheme = useTheme();

    const navigation = useNavigation();
    const isFocused = useIsFocused();

    useEffect(() => {
        console.log(
            'route: ',
            props?.navigation.getState()?.routes?.find((r) => r.name === 'FeedScreen')?.state
                ?.index,
        );
        const receivedRoute = props?.navigation
            ?.getState()
            ?.routes?.find((r) => r.name === 'FeedScreen')?.state?.index;
        setCurrentActiveTab(receivedRoute ? receivedRoute : 0);
    }, [props?.navigation?.getState()?.routes?.find((r) => r.name === 'FeedScreen')?.state?.index]);

    useEffect(() => {
        let flipedSideTitle = false;
        switch (currentActiveTab) {
            case 0:
                flipedSideTitle = isFlippedMemaree;
                break;
            case 1:
                flipedSideTitle = isFlippedCircle;
                break;
            case 2:
                flipedSideTitle = isFlippedVision;
                break;
            default:
                flipedSideTitle = false;
                break;
        }
        if (flipedSideTitle) {
            navigation?.setOptions({
                headerTitle: () => (
                    <View style={{ flex: 0, justifyContent: 'center', alignItems: 'center' }}>
                        <FlipsideGradient />
                    </View>
                ),
            });
        } else {
            navigation?.setOptions({
                headerTitle: () => <MemareeButton width={40} height={40} />,
            });
        }
    }, [isFlippedMemaree, isFlippedCircle, isFlippedVision, currentActiveTab]);
    const position = new Animated.Value(keyBoardState ? 0 : 1);

    const animatePosition = () => {
        Animated.timing(position, {
            toValue: keyBoardState ? 1 : 0,
            duration: 250,
            useNativeDriver: false,
        }).start();
    };

    useEffect(() => {
        Keyboard.addListener('keyboardDidShow', () => setKeyBoardState(true));
        Keyboard.addListener('keyboardDidHide', () => setKeyBoardState(false));

        return () => {
            Keyboard.removeAllListeners('keyboardDidShow');
            Keyboard.removeAllListeners('keyboardDidHide');
        };
    }, []);

    useEffect(() => {
        animatePosition();
    }, [keyBoardState]);

    const positionInterpolation = position.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 100],
    });
    return (
        <View style={{ height: '100%' }}>
            <FeedContext.Provider value={contextValue}>
                <Tab.Navigator
                    backBehavior={'history'}
                    initialRouteName={'MemareeScreen'}
                    screenOptions={() => ({
                        tabBarIndicatorStyle: {
                            borderColor: colors.tab,
                            borderWidth: 2,
                        },
                        headerTitleStyle: {
                            fontFamily: 'Outfit-Bold',
                            color: colors.text,
                        },
                        headerShown: false,
                        presentation: 'transparentModal',
                        tabBarStyle: {
                            backgroundColor: colors.background,
                            fontFamily: 'Outfit-Bold',
                        },
                        tabBarLabelStyle: { color: colors.text, fontFamily: 'Outfit-Bold' },
                    })}
                >
                    <Tab.Screen
                        name="MemareeScreen"
                        component={MemareeScreen}
                        initialParams={{
                            openPostOptionsBottomSheet:
                                props?.route?.params?.openPostOptionsBottomSheet,
                            openSharePostBottomSheet:
                                props?.route?.params?.openSharePostBottomSheet,
                        }}
                        options={{
                            tabBarLabel: MemareeTitle,
                        }}
                    />
                    <Tab.Screen
                        name="CircleScreen"
                        component={CircleScreen}
                        initialParams={{
                            openPostOptionsBottomSheet:
                                props?.route?.params?.openPostOptionsBottomSheet,
                            openSharePostBottomSheet:
                                props?.route?.params?.openSharePostBottomSheet,
                        }}
                        options={{
                            tabBarLabel: CircleTitle,
                        }}
                    />

                    <Tab.Screen
                        name="VisionScreen"
                        component={VisionScreen}
                        initialParams={{
                            openPostOptionsBottomSheet:
                                props?.route?.params?.openPostOptionsBottomSheet,
                            openSharePostBottomSheet:
                                props?.route?.params?.openSharePostBottomSheet,
                        }}
                        options={{
                            tabBarLabel: VisionTitle,
                        }}
                    />
                </Tab.Navigator>
                <Animated.View
                    style={{
                        transform: [{ translateY: positionInterpolation }],
                    }}
                >
                    <FlipSideButton
                        isFlipped={
                            currentActiveTab === 0
                                ? isFlippedMemaree
                                : currentActiveTab === 1
                                ? isFlippedCircle
                                : currentActiveTab === 2
                                ? isFlippedVision
                                : isFlippedMemaree
                        }
                        setIsFlipped={
                            currentActiveTab === 0
                                ? setIsFlippedMemaree
                                : currentActiveTab === 1
                                ? setIsFlippedCircle
                                : currentActiveTab === 2
                                ? setIsFlippedVision
                                : setIsFlippedMemaree
                        }
                    />
                </Animated.View>
            </FeedContext.Provider>
        </View>
    );
};

export default FeedScreen;

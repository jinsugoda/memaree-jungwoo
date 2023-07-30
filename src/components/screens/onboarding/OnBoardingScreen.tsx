import React, { useRef, useState } from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    SafeAreaView,
    StatusBar,
} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { Ionicons } from '@expo/vector-icons';
import { Auth, Hub } from 'aws-amplify';

// types
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from 'types/Screens';

// 3rd party hooks
import useAuth from 'hooks/useAuth';
import { useSelector } from 'react-redux';

// redux - user slice reducers
import { selectUserId } from 'store/slices/userSlice';

// custom components
import OnBoardingPage from './carouselItems/OnBoardingPage';
import OnboardingWelcomeScreen from './OnBoardingWelcomeScreen';

// svg - buttons
import SkipButtonSVG from 'assets/buttonIcons/onboarding/SkipIcon.svg';

const { width, height } = Dimensions.get('window');
const aspectRatio = width / height;

const images = [
    {
        firstImage: require('assets/images/onboardingImages/Onboarding_Home.png'),
        secondImage: require('assets/images/onboardingImages/Onboarding_Home_2.png'),
    },
    {
        firstImage: require('assets/images/onboardingImages/Onboarding_Circle.png'),
        secondImage: require('assets/images/onboardingImages/Onboarding_Circle_2.png'),
    },
    {
        firstImage: require('assets/images/onboardingImages/Onboarding_Vision.png'),
        secondImage: require('assets/images/onboardingImages/Onboarding_Vision_2.png'),
    },
    {
        firstImage: require('assets/images/onboardingImages/Onboarding_Groups.png'),
        secondImage: require('assets/images/onboardingImages/Onboarding_Groups_2.png'),
    },
    {
        firstImage: require('assets/images/onboardingImages/Onboarding_Flipside.png'),
        secondImage: require('assets/images/onboardingImages/Onboarding_Flipside_2.png'),
    },
    {
        firstImage: require('assets/images/onboardingImages/Onboarding_Remember.png'),
        secondImage: require('assets/images/onboardingImages/Onboarding_Remember_2.png'),
    },
    {
        firstImage: require('assets/images/onboardingImages/Onboarding_Help.png'),
        secondImage: require('assets/images/onboardingImages/Onboarding_Help_2.png'),
    },
];

type OnboardingScreenProps = NativeStackScreenProps<RootStackParamList, 'OnboardingScreen'>;
const OnboardingScreen = (props: OnboardingScreenProps) => {
    const { navigation } = props;
    const { cognitoUser } = useAuth();
    const userID = useSelector(selectUserId);

    const [activeIndex, setActiveIndex] = useState(0);
    const [started, setStarted] = useState<boolean>(false);
    const [skipped, setSkipped] = useState<boolean>(false);

    const carouselRef = useRef(null);
    const isSignedIn = !!cognitoUser;

    const goToHome = () => {
        console.log('OnBoardingscreen go to home', userID);
        if (skipped) {
            return;
        }

        setSkipped(true);
        let goToScreen: 'HomeScreen' | 'LoginSignupScreen' = 'HomeScreen';
        if (isSignedIn) {
            goToScreen = 'HomeScreen';
        } else {
            goToScreen = 'LoginSignupScreen';
        }
        const newFirstTimeVal = '0';
        Auth.currentAuthenticatedUser()
            .then((user) => {
                console.log('Current firsttime value: ', user?.attributes['custom:firstTime']);
                if (user?.attributes['custom:firstTime'] === '0') {
                    navigation.reset({
                        index: 0,
                        routes: [{ name: goToScreen }],
                    });
                } else {
                    Auth.updateUserAttributes(user, { 'custom:firstTime': newFirstTimeVal })
                        .then((value) => {
                            console.log('updated user attribute custom firstTime, val: ', value);
                            Hub.dispatch('userAttributeUpdates', {
                                event: 'custom:firstTime',
                                data: { newValue: newFirstTimeVal },
                                message: 'updatedFirstTime',
                            });

                            navigation.reset({
                                index: 0,
                                routes: [{ name: goToScreen }],
                            });
                        })
                        .catch((err) => {
                            console.log(
                                'failed to update custom attribute custom:firstTime on cognito user, error: ',
                                err,
                            );
                        });
                }
            })
            .catch((err) => {
                console.log(
                    'failed to get cognito user for onboarding screen update first time to 0, error: ',
                    err,
                );
            })
            .finally(() => {
                setTimeout(() => setSkipped(false), 2000);
            });
    };

    const handleClick = () => {
        if (activeIndex !== images?.length - 1) {
            carouselRef.current?.next();
        } else {
            goToHome();
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={'black'} />
            {started ? (
                <>
                    <TouchableOpacity onPressOut={() => handleClick()} activeOpacity={1}>
                        <Carousel
                            ref={carouselRef}
                            loop={false}
                            width={width}
                            data={images}
                            renderItem={(prop) => (
                                <OnBoardingPage
                                    {...prop}
                                    itemWidth={width}
                                    isActiveIndex={activeIndex === prop.index && started}
                                />
                            )}
                            onSnapToItem={(index) => setActiveIndex(index)}
                        />
                    </TouchableOpacity>
                    <View style={styles.footer}>
                        <View style={styles.pagination}>
                            {images.map((_, index) => (
                                <View
                                    key={index}
                                    style={[
                                        styles.paginationDot,
                                        activeIndex === index && styles.paginationDotActive,
                                    ]}
                                />
                            ))}
                        </View>
                        <TouchableOpacity
                            style={styles.buttonContinue}
                            onPress={() => handleClick()}
                        >
                            <Ionicons
                                // style={{opacity: activeIndex !== (images.length - 1) ? 1 : 0}}
                                // might use later if we want to swap the button on the last page with a launch button
                                size={60}
                                color={'white'}
                                name={'chevron-forward-circle-sharp'}
                            />
                        </TouchableOpacity>
                    </View>
                </>
            ) : (
                <OnboardingWelcomeScreen startOnBoardingAction={() => setStarted(true)} />
            )}
            {activeIndex !== images.length - 1 && (
                <TouchableOpacity
                    disabled={skipped}
                    style={styles.buttonSkip}
                    onPress={() => goToHome()}
                >
                    <SkipButtonSVG width={34} height={34} />
                </TouchableOpacity>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    buttonSkip: {
        position: 'absolute',
        top: 50,
        right: 20,
        padding: 10,
        marginTop: 10,
        borderRadius: 5,
    },
    buttonContinue: {
        padding: 0,
    },
    footer: {
        marginHorizontal: 30,
        position: 'absolute',
        marginBottom: aspectRatio >= 0.48 ? 10 : 40,
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    pagination: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    paginationDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        marginHorizontal: 5,
    },
    paginationDotActive: {
        backgroundColor: '#BEF43E',
    },
});

export default OnboardingScreen;

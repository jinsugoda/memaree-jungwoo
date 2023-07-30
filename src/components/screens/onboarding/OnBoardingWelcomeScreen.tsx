import React, { useRef } from 'react';
import { SafeAreaView, View, Animated } from 'react-native';
import { Button } from 'react-native-paper';

// svg pages
import WelcomeToMemaree from 'assets/generalSVGs/WelcomeToMemaree.svg';

// constants
const START_BUTTON_TEXT = "Let's Get Started!";

interface OnboardingWelcomeScreenProps {
    startOnBoardingAction: () => void;
}

const OnboardingWelcomeScreen = (props: OnboardingWelcomeScreenProps) => {
    const fadeAnim = useRef(new Animated.Value(1)).current;
    const fadeIn = () => {
        Animated.sequence([
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 1000,
                useNativeDriver: true,
            }),
        ]).start(props?.startOnBoardingAction);
    };
    return (
        <SafeAreaView style={styles.container}>
            <Animated.View style={[{ opacity: fadeAnim }]}>
                <View style={{ flex: 2 }}></View>
                <View style={styles.logoContainer}>
                    <WelcomeToMemaree fill="white" width={200} height={200} />
                </View>
                <View style={{ flex: 2 }}>
                    <Button
                        mode="outlined"
                        dark={true}
                        textColor="white"
                        accessibilityHint={START_BUTTON_TEXT}
                        accessibilityLabel={START_BUTTON_TEXT}
                        style={styles.button}
                        labelStyle={{ fontFamily: 'Outfit-Bold' }}
                        onPress={fadeIn}
                    >
                        {START_BUTTON_TEXT}
                    </Button>
                </View>
            </Animated.View>
        </SafeAreaView>
    );
};

export default OnboardingWelcomeScreen;

const styles = {
    container: {
        flex: 1,
        justifyContent: 'space-around' as 'space-around',
        alignItems: 'center' as 'center',
    },
    logoContainer: {
        flex: 3,
        justifyContent: 'center' as 'center',
        alignItems: 'center' as 'center',
    },
    logoImage: {
        width: '100%',
        height: '100%',
    },
    welcomeText: {
        color: 'white',
        textAlign: 'center' as 'center',
        fontSize: 18,
    },
    boldText: {
        color: 'white',
    },
    buttonContainer: {
        justifyContent: 'center' as 'center',
    },
    button: {
        width: 300,
        marginTop: -20,
        borderWidth: 2,
        borderColor: 'white' as 'white',
        backgroundColor: 'transparent' as 'transparent',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
    },
};

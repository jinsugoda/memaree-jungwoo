import React, { useEffect, useRef, useState } from 'react';
import { View, Image, StyleSheet, Animated, ImageBackground } from 'react-native';

// types
import { CarouselRenderItemInfo } from 'react-native-reanimated-carousel/lib/typescript/types';

// styles
import { ImageRotationFix } from 'styles/stylesheets/imagesStyles';

interface FadeImageProps {
    firstImage;
    secondImage;
}

interface OnBoardingPageProps extends CarouselRenderItemInfo<FadeImageProps> {
    itemWidth: number;
    isActiveIndex: boolean;
}

const OnBoardingPage = (props: OnBoardingPageProps) => {
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        if (props?.isActiveIndex && isLoaded) {
            fadeIn();
        }
    }, [props?.isActiveIndex, isLoaded]);

    const fadeAnim = useRef(new Animated.Value(0)).current;
    const fadeIn = () => {
        Animated.sequence([
            Animated.delay(2000),
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }),
        ]).start();
    };

    return (
        <View style={[styles.item, { width: props?.itemWidth }]}>
            {/* <View style={styles.image}> */}
            <ImageBackground style={styles.image} source={props?.item.firstImage}>
                <Animated.View
                    style={[styles.item, { width: props?.itemWidth }, { opacity: fadeAnim }]}
                >
                    <Image
                        source={props?.item?.secondImage}
                        style={[styles.image, ImageRotationFix]}
                        onLoad={() => setIsLoaded(true)}
                    />
                </Animated.View>
            </ImageBackground>
            {/* </View> */}
        </View>
    );
};
// useLayoutEffect(() => {
//     props?.navigation.setOptions({
//         headerTitle: ShorttenText(user.username ?? "", 20),
//         headerLeft: () => <BackButton />,
//         headerRight: () => (
//         <ProfileHeaderRight
//             isCurrentUser={true}
//             bottomSheetRef={bottomSheetRef}
//         />
//         ),
//     });
//   }, [])

const styles = StyleSheet.create({
    item: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        position: 'relative',
    },
    image: {
        flex: 1,
        height: '100%',
        width: '100%',
        resizeMode: 'cover',
        overflow: 'hidden',
    },
    secondImage: {
        width: '100%',
        resizeMode: 'cover',
    },
});

export default OnBoardingPage;

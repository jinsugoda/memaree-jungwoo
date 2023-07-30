import React, { useEffect, useRef, useState } from 'react';
import { TouchableOpacity, Animated, StyleSheet, SafeAreaView, ScrollView } from 'react-native';

// custom components
import MemareeText from '../../textAndInputs/MemareeText';

// possible emojis constant
import { EMOJIDATA } from 'utils/emojiData';

// svgs
import EmojiButtonSVG from 'assets/buttonIcons/interactions/emojiButton.svg';

type EmojiProps = {
    value?: string;
    onSelected?: (value) => void;
    size?: number;
};

const AnimatedEmoji = ({ value, size, onSelected }: EmojiProps) => {
    const [emojiSize, setEmojiSize] = useState(size || 24);
    const [hValue, SetHValue] = useState(-190);
    const [toggleEmojiList, setToggleEmojiList] = useState(false);
    const popUpAnim = useRef(new Animated.Value(0)).current;
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const selectAnim = useRef(new Animated.Value(1)).current;

    const fadeIn = () => {
        setToggleEmojiList(true);
        // Will change fadeAnim value to 1 in 5 seconds
        Animated.spring(popUpAnim, {
            toValue: -100,
            friction: value === EMOJIDATA[5].title ? 12 : 6,
            // stiffness: 150,
            // bounciness: 10,

            useNativeDriver: true,
        }).start();
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
        }).start();
        Animated.timing(selectAnim, {
            toValue: 0,
            duration: 100,
            useNativeDriver: true,
        }).start();
    };

    const fadeOut = (title: string) => {
        setToggleEmojiList(false);
        // Will change fadeAnim value to 0 in 3 seconds
        Animated.spring(popUpAnim, {
            toValue: 0,
            friction: title === EMOJIDATA[5].title ? 12 : 6,
            // stiffness: 100,
            useNativeDriver: true,
        }).start();
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
        }).start();
        Animated.timing(selectAnim, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
        }).start();
        console.log('emoji value fadeout', title, value);
        if (value === null && title === null) {
            return;
        }
        if (value === title) {
            onSelected(null);
            return;
        }
        onSelected(title);
    };

    const EmojiList = () => {
        return (
            <Animated.View
                style={[
                    styles.fadingContainer,
                    {
                        // Bind opacity to animated value
                        opacity: fadeAnim,
                        position: 'absolute',
                    },
                ]}
            >
                <Animated.View
                    style={[
                        {
                            // Bind opacity to animated value
                            transform: [{ translateY: popUpAnim }],
                        },
                    ]}
                >
                    <ScrollView style={[styles.emojiList]} showsVerticalScrollIndicator={false}>
                        {EMOJIDATA.map((item, i) => (
                            <TouchableOpacity
                                key={item?.id + item.title + i.toString()}
                                onPress={() => fadeOut(item?.title)}
                            >
                                <MemareeText style={{ fontSize: emojiSize, paddingTop: 5 }}>
                                    {item?.title}
                                </MemareeText>
                            </TouchableOpacity>
                        ))}
                        <TouchableOpacity
                            onPress={() => {
                                fadeOut(null);
                            }}
                        >
                            <EmojiButtonSVG
                                fill={'white'}
                                style={{ marginLeft: 1, marginTop: 5 }}
                                width={emojiSize + 3}
                                height={emojiSize + 3}
                            />
                        </TouchableOpacity>
                    </ScrollView>
                </Animated.View>
            </Animated.View>
        );
    };
    const SelectedEmoji = () => {
        return (
            <Animated.View
                style={[
                    styles.fadingContainer,
                    {
                        // Bind opacity to animated value
                        opacity: selectAnim,
                    },
                ]}
            >
                <Animated.View
                    style={[
                        {
                            // Bind opacity to animated value
                            transform: [{ translateY: popUpAnim }],
                        },
                    ]}
                >
                    <TouchableOpacity onPress={() => fadeIn()}>
                        {value === null ? (
                            <EmojiButtonSVG
                                fill={'white'}
                                width={emojiSize + 3}
                                height={emojiSize + 3}
                            />
                        ) : (
                            <MemareeText style={{ fontSize: emojiSize }}>{value}</MemareeText>
                        )}
                    </TouchableOpacity>
                </Animated.View>
            </Animated.View>
        );
    };
    // useEffect(() => {
    //     if (size) {
    //         const height = (size * 8 + 25) * -1;
    //         SetHValue(height);
    //         setEmojiSize(size);
    //     }
    //     //}, [size, value]);
    // }, [value]);
    return (
        <SafeAreaView style={[styles.container, { width: size + 5 }]}>
            {toggleEmojiList ? <EmojiList /> : <SelectedEmoji />}
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    fadingContainer: {
        flexDirection: 'column',
    },
    emojiList: {
        // padding: 20,
        // position: 'absolute',
        // alignSelf: 'center',
    },
});

export default AnimatedEmoji;

import React, { MutableRefObject } from 'react';
import { Pressable, View, LogBox } from 'react-native';
import { Divider } from '@rneui/base';
import BottomSheet, { BottomSheetBackdropProps, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome/index';
import { List } from 'react-native-paper';

// types
import { RootStackParamList } from 'types/Screens';
import { StackNavigationProp } from '@react-navigation/stack';
import { CustomTheme } from 'styles/theme/customThemeProps';

// 3rd party hooks
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'react-native-paper';

// custom components
import MemareeText from 'components/common/textAndInputs/MemareeText';

// styles
import { HomeStyles } from 'styles';

// assets - svg icons

LogBox.ignoreLogs(['Non-serializable values were found in the navigation state']);

type SharePostModalProps = {
    bottomSheetRef: MutableRefObject<BottomSheet>;
    postId: string;
};

const SharePostModal = (props: SharePostModalProps) => {
    const { colors }: CustomTheme = useTheme();
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    //   console.log(props);

    return (
        <BottomSheet
            ref={props?.bottomSheetRef}
            snapPoints={['35%']}
            index={-1}
            detached={false}
            backdropComponent={(props: BottomSheetBackdropProps) => {
                return (
                    <BottomSheetBackdrop
                        {...props}
                        pressBehavior={'close'}
                        appearsOnIndex={0}
                        disappearsOnIndex={-1}
                    />
                );
            }}
            enablePanDownToClose={true}
            handleComponent={null}
            enableOverDrag={true}
            backgroundStyle={{ backgroundColor: colors.background }}
        >
            {
                <View>
                    <View style={HomeStyles.sheetHeaderContainer}>
                        <Divider orientation="horizontal" width={1} />
                        <MemareeText
                            style={[
                                HomeStyles.sheetHeader,
                                { color: colors.text, borderRadius: 99 },
                            ]}
                        >
                            Share Post
                        </MemareeText>
                        <Pressable onPress={() => props?.bottomSheetRef?.current?.close()}>
                            <FontAwesomeIcon color={colors.text} icon={'xmark'} />
                        </Pressable>
                    </View>
                    <List.Item
                        onPress={() => {
                            props?.bottomSheetRef?.current?.close();
                            navigation.navigate('GroupPreviewScreen', {
                                postId: props.postId,
                            });
                        }}
                        title="Add to Group"
                        titleStyle={{ color: 'white', fontFamily: 'Outfit-Bold' }}
                    />
                </View>
            }
        </BottomSheet>
    );
};

export default SharePostModal;

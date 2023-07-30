import React, { useMemo } from 'react';
import { View } from 'react-native';
import BottomSheetModal, {
    BottomSheetBackdropProps,
    BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';
import { List } from 'react-native-paper';
import { Icon } from '@rneui/base';

// types
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { CustomTheme } from 'styles/theme/customThemeProps';

// 3rd party hooks
import { useTheme } from 'react-native-paper';

// styles
import { ProfileStyles } from 'styles';

interface ProfileBottomSheetInterface {
    bottomSheetRef: React.Ref<BottomSheetMethods>;
}

const ProfileModal = (props: ProfileBottomSheetInterface) => {
    const { colors }: CustomTheme = useTheme();
    const snapPoints = useMemo(() => ['25%', '50%'], []);

    return (
        <BottomSheetModal
            ref={props?.bottomSheetRef}
            index={-1}
            snapPoints={snapPoints}
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
            enableOverDrag={true}
            backgroundStyle={{ backgroundColor: colors.background }}
        >
            <View style={[ProfileStyles.BottomContainer, { backgroundColor: colors.background }]}>
                <List.Section style={{ backgroundColor: colors.background }}>
                    <List.Item
                        style={{ backgroundColor: colors.background }}
                        titleStyle={{ color: colors.text, fontFamily: 'Outfit-Bold' }}
                        title="Block"
                        left={() => <Icon color={colors.text} name="block" type="material" />}
                        onPress={() => alert('Block user')}
                    />
                    <List.Item
                        style={{ backgroundColor: colors.background }}
                        titleStyle={{ color: colors.text, fontFamily: 'Outfit-Bold' }}
                        title="Report"
                        left={() => (
                            <Icon color={colors.text} name="alert-octagon" type="feather" />
                        )}
                        onPress={() => alert('Report user')}
                    />
                </List.Section>
            </View>
        </BottomSheetModal>
    );
};
export default ProfileModal;

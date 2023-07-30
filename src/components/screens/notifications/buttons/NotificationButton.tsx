import React, { useEffect } from 'react';
import { View, ViewStyle } from 'react-native';
import { Item } from 'react-navigation-header-buttons';

// types
import { CustomTheme } from 'styles/theme/customThemeProps';

// 3rd party hooks
import { useQuery } from '@apollo/client';
import { useTheme } from 'react-native-paper';

// gpl queries
import TotalUnreadNotificationsQry from '../gpl/TotalUnreadNotificationsQry';
import MemareeText from 'components/common/textAndInputs/MemareeText';
// constants
const REFETCH_INTERVAL = 5000;

interface NotificationButtonProps {
    onPress: () => any;
    containerStyle?: ViewStyle;
}

export default function NotificationButton({ onPress, containerStyle }: NotificationButtonProps) {
    const { colors }: CustomTheme = useTheme();

    const { data, refetch } = useQuery(TotalUnreadNotificationsQry);

    useEffect(() => {
        let refetchInterval;
        try {
            refetchInterval = setInterval(async () => {
                const res = await refetch();
                // console.log("notification - refetch - res: ", res);
            }, REFETCH_INTERVAL);
        } catch (err) {
            console.log(`err - fetching new commetns: `, err);
        }

        return () => {
            clearInterval(refetchInterval);
        };
    }, []);

    return (
        <View style={containerStyle}>
            <Item
                title="Notification"
                buttonStyle={{ fontFamily: 'Outfit-Bold' }}
                iconName="notifications-outline"
                onPress={onPress}
                color={colors.tertiary}
                iconSize={25}
            />
            {data?.totalUnreadNotifications ? (
                <View
                    style={{
                        backgroundColor: colors.secondary,
                        borderRadius: 10,
                        height: 15,
                        width: 15,
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'absolute',
                        right: 10,
                    }}
                >
                    <MemareeText style={{ fontSize: 9 }}>
                        {data.totalUnreadNotifications}
                    </MemareeText>
                </View>
            ) : null}
        </View>
    );
}

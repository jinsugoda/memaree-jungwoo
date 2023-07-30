import React from 'react';
import { TouchableOpacity, FlatList } from 'react-native';
import { ListItem } from '@rneui/base';

// types
import { User } from 'types/DataModels';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from 'types/Screens';
import { CustomTheme } from 'styles/theme/customThemeProps';

// 3rd party hooks
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'react-native-paper';
import { useSelector } from 'react-redux';

// redux
import { selectUserId } from 'store/slices/userSlice';

// custom components
import GradientAvatar from 'components/common/avatars/single/GradientAvatar';

// styles
import { UserListStyles } from 'styles';

type UserlistProps = {
    users: User[];
};

const UserList = (prop: UserlistProps) => {
    const { colors }: CustomTheme = useTheme();
    const userId = useSelector(selectUserId);
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    //const [userList, setUserList] = useState();
    // replace with something that actually fetches the user profile image
    const TempFetchProfileImage = (id: string) => {
        return `https://i.pravatar.cc/400?img=${id}`;
    };
    // const QuerySearch = async() => {
    // query SearchQuery string and setUserList
    // }

    return (
        <FlatList
            data={prop?.users}
            style={UserListStyles.container}
            renderItem={(data) => (
                <TouchableOpacity
                    key={`T${data?.item?._id}`}
                    onPress={() => {
                        if (userId === data?.item?._id) {
                            navigation.navigate('SelfProfileScreen');
                        } else {
                            navigation.navigate('OtherProfileScreen', { id: data?.item?._id });
                        }
                    }}
                >
                    <ListItem
                        containerStyle={{
                            paddingVertical: 6,
                            backgroundColor: colors.background,
                        }}
                    >
                        <GradientAvatar size={60} source={TempFetchProfileImage(data?.item?._id)} />
                        <ListItem.Content>
                            <ListItem.Title
                                style={{ color: colors.text, fontFamily: 'Outfit-Bold' }}
                            >
                                {data?.item?.username}
                            </ListItem.Title>
                            <ListItem.Subtitle
                                style={{ color: colors.text, fontFamily: 'Outfit-Bold' }}
                            >
                                @{data?.item?.username}
                            </ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>
                </TouchableOpacity>
            )}
        />
    );
};

export default UserList;

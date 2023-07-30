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

// custom components
import GradientAvatar from 'components/common/avatars/single/GradientAvatar';

// styles
import { UserListStyles } from 'styles';

type UserlistProps = {
    selectedUsers: User[];
    setSelectedUsers: (users: User[]) => void;
    unselectedUsers: User[];
    setUnselectedUsers: (users: User[]) => void;
};

const GroupUserListAdd = (prop: UserlistProps) => {
    const { colors }: CustomTheme = useTheme();

    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    //const [userList, setUserList] = useState();
    // replace with something that actually fetches the user profile image
    const TempFetchProfileImage = (id: string) => {
        return `https://i.pravatar.cc/400?img=${id}`;
    };
    // const QuerySearch = async() => {
    // query SearchQuery string and setUserList
    // }

    const addUser = (user: User) => {
        const newUsers = prop?.selectedUsers?.concat(user);
        prop?.setSelectedUsers(newUsers);
        const newUnselectedUsers = prop?.unselectedUsers?.filter((u) => u?._id !== user?._id);
        prop?.setUnselectedUsers(newUnselectedUsers);
    };

    return (
        <FlatList
            data={prop?.unselectedUsers}
            style={UserListStyles.container}
            renderItem={(data) => (
                <TouchableOpacity key={`T${data?.item?._id}`} onPress={() => addUser(data?.item)}>
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

export default GroupUserListAdd;

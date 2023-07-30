import { TextStyle, ViewStyle } from 'react-native';

export const ProfileScreenIconSize = 28;
export const UserProfileIconSize = 36;

export const contentContainer: ViewStyle = {
    flex: 1,
};

export const BottomContainer: ViewStyle = {
    flex: 1,
    marginLeft: 20,
    borderBottomColor: 'red',
};

export const TabNavigator: ViewStyle = {
    flex: 1,
};

export const textInput: ViewStyle = {
    backgroundColor: '#EFF0F6',
    marginVertical: 2,
    marginHorizontal: 10,
};

//Profile Screen
export const container: ViewStyle = {
    flex: 1,
    marginTop: 10,
};

export const ProfileStatContainer: ViewStyle = {
    height: 60,
    flexDirection: 'row',
    marginBottom: 0,
    maxWidth: 300,
    alignSelf: 'center',
};
export const ProfileStatText: TextStyle = {
    fontSize: 9,
};

export const topContainer: ViewStyle = {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginHorizontal: 20,
};

export const profileSumContainer: ViewStyle = {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
};

export const avatarContainer: ViewStyle = {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
};

export const nameButtonContainer: ViewStyle = {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginLeft: 10,
};

export const firstName: TextStyle = {
    fontSize: 18,
};

export const userNameText: TextStyle = {
    fontSize: 16,
    marginBottom: 10,
};

export const buttonContainer: ViewStyle = {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
};

export const bioText: TextStyle = {
    textAlign: 'center',
};

export const divider: ViewStyle = {
    width: '94%',
    borderWidth: 1.7,
    marginVertical: 0,
    marginTop: 5,
    marginBottom: 5,
    left: 0,
    alignSelf: 'center',
};

export const filterContainer: ViewStyle = {
    width: '100%',
    paddingVertical: 0,
    marginTop: 6,
    alignItems: 'center',
};
//User Avatar
export const UserAvatar: ViewStyle = {
    width: 100,
    height: 100,
    borderWidth: 2,
    borderRadius: 28,
};

export const ProfileContentContainer: ViewStyle = {
    flex: 5,
    marginTop: 20,
};

export const EditUserInfoScreenHeaderRightButton: ViewStyle = {
    marginRight: 10,
};

export const EditUserInfoScreenHeaderRightButtonLabel: TextStyle = {
    fontSize: 13,
    marginVertical: 5,
};

export const EditUserInfoScreenSafeAreaProvider: ViewStyle = {
    flex: 1,
    backgroundColor: 'white',
};

export const containerStyle: ViewStyle = {
    alignSelf: 'center',
    marginVertical: 30,
};

export const outlineStyle: ViewStyle = {
    borderWidth: 0,
};

//profile stat
export const profileStatTouchableOpacity: ViewStyle = {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
};

export const profileStatText: TextStyle = {
    fontSize: 20,
    alignItems: 'center',
};
export const subStatsTitle: TextStyle = {
    fontSize: 12,
    alignItems: 'center',
};

export const profileStatTextTitle: ViewStyle = {};

// profile header right
export const profileHeaderRightIcon: ViewStyle = {
    padding: 10,
};

export const tabBar: ViewStyle = {
    width: '90%',
    elevation: 0,
    alignSelf: 'center',
    paddingHorizontal: 0,
    paddingTop: 0,
    borderTopWidth: 0,
    borderBottomWidth: 10,
    borderBottomColor: 'white',
};

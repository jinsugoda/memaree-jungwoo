import { TextStyle, ViewStyle } from 'react-native';

//people Filters
export const avatarSize = 56;
export const addIconSize = 14;
export const BORDER_WIDTH = 1.7;

export const AvatarContainer: ViewStyle = {
    flexDirection: 'row',
    marginBottom: 24,
    height: 120,
    flexGrow: 0,
};

export const addButtonContainer: ViewStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 42,
    width: 62,
    height: 62,
};

export const userAvatar: ViewStyle = {
    width: 64,
    height: 64,
    marginTop: 3,
    paddingLeft: 33,
};

export const addButtonIcon: ViewStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    alignContent: 'center',
    borderStyle: 'solid',
    backgroundColor: 'white',
    bottom: 47,
    right: 12,
    height: 28,
    width: 28,
    borderRadius: 99,
    borderWidth: BORDER_WIDTH,
};

// feed filter
export const buttonBackgroundOn = '#BEF43E';
export const buttonBackgroundOff = '#262A2B';
export const buttonTextOn = '#151818';
export const buttonTextOff = '#ffffff';

export const laneFilterContainer: ViewStyle = {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 10,
    marginRight: 10,
    paddingLeft: 0,
    marginBottom: 8,
    width: '100%',
    alignItems: 'center',
};

export const laneFilterContainerDown: ViewStyle = {
    flexWrap: 'wrap',
    marginLeft: 10,
    marginRight: 10,
    width: '100%',
};

export const button: ViewStyle = {
    borderColor: '#ffffff',
};

export const filterButtonContainer: ViewStyle = {
    marginRight: 10,
    marginVertical: 6,
};
export const filterButton: ViewStyle = {
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
    height: 32,
    borderRadius: 14,
    paddingLeft: 24,
    paddingRight: 24,
    borderColor: 'black',
    borderStyle: 'solid',
    borderWidth: 0,
};
export const filterText: TextStyle = {
    fontSize: 11,
};

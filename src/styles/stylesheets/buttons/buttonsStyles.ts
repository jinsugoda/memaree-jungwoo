import { darkText, lightText } from '../../theme/colors';
import { Dimensions } from 'react-native';

//Back Button
export const backButtonSize = 22;

export const BORDER_LANES_AVATAR = 2;

export const backButtonIcon = {
    color: 'black' as 'black',
    alignContent: 'center' as 'center',
};

//Post Buttons
export const postButtonSizeTwoColumn = 33;
export const postButtonSizeOneColumn = 60;

//Navigation Buttons

const NAVIGATION_BUTTON_SIZE = 35;

export const textsDark = {
    color: darkText,
};

export const textsLight = {
    color: lightText,
};

//Creating this const to fix the icon position when selected
export const TAB_ICON_BOTTOM_ALIGNMENT = 7;

export const selectedNavigationBorderTopWidth = {
    borderTopWidth: 2,
    // paddingTop:TAB_ICON_BOTTOM_ALIGNMENT + 3
};

export const selectedNavigationBorderBotWidth = {
    borderBottomWidth: 2,
    // paddingTop:TAB_ICON_BOTTOM_ALIGNMENT + 3
};

export const selectedNavigationBottom = {
    bottom: 4,
};

export const containerNavigationButton = {
    boxSizing: 'border-box' as 'border-box',
    alignItems: 'center' as 'center',
    height: '100%' as '100%',
    width: '100%' as '100%',
    borderStyle: 'solid' as 'solid',
};

export const navigationIcons = {
    width: NAVIGATION_BUTTON_SIZE,
    height: NAVIGATION_BUTTON_SIZE,
};

//Header Button
export const headerButtonIconSize = 28;

//Round avatar button
// const size = 56;
// const border = 3;

export const innerBorder = {
    borderColor: '#ffffff' as '#ffffff',
    borderStyle: 'solid' as 'solid',
    borderWidth: BORDER_LANES_AVATAR + 2,
    borderRadius: 24,
};

export const outerAvatarContainer = {
    flex: 0,
    alignItems: 'center' as 'center',
};

export const avatarContainer = {
    // borderStyle: 'solid' as 'solid',
    // borderColor: 'black' as 'black',
    marginRight: 3,
    marginLeft: 3,
};

export const BorderImage = {
    position: 'absolute' as 'absolute',
};

export const Avatar = {
    borderRadius: 20,
};

export const AvatarNameText = {
    fontSize: 12,
    bottom: 10,
};

export const AvatarButtonRowContainer = {
    flex: 1,
    flexDirection: 'row' as 'row',
};

// export const notifiedAvatarContainer = {
//     flex:0,
//     alignItems:'center' as 'center',
//     justifyContent:'center',
//     borderWidth: 3,
//     width: 66,
//     height: 66,
//     borderRadius: 99,
// };

// export const unNotifiedAvatarContainer = {
//     borderWidth: 3,
//     width: 62,
//     height: 62,
//     borderRadius:99,
// };

export const notifiedAvatarContainer = {
    flex: 0,
    alignItems: 'center' as 'center',
    justifyContent: 'center' as 'center',
    //borderWidth: BORDER_LANES_AVATAR,
    // width: 66,
    // height: 66,
    borderRadius: 24,
};
export const unNotifiedAvatarContainer = {
    //borderWidth: BORDER_LANES_AVATAR,
    // borderColor: 'black' as 'black',
    //borderColor: ['red', 'orange', 'blue', 'green'],
    justifyContent: 'center' as 'center',
    alignItems: 'center' as 'center',
    width: 68,
    height: 68,
    borderRadius: 24,
};
export const FABAdd = {
    borderWidth: 1,
    borderColor: 'black',
};

export const notification = {
    position: 'relative' as 'relative',
    height: 7.2,
    width: 7.2,
    bottom: 30,
    left: 30,
    borderWidth: 1,
    borderRadius: 99,
};

export const notificationOff = {
    borderColor: 'white',
    backgroundColor: 'white',
};

export const notificationOn = {
    borderColor: 'black',
    backgroundColor: '#E0FF4F',
};

export const Container = {};

//FlipSideButton
export const flipSideButtonContainer = {
    position: 'absolute' as 'absolute',
    flex: 0,
    justifyContent: 'center' as 'center',
    alignItems: 'center' as 'center',
    borderRadius: 22,
    borderWidth: 1.7,
    borderColor: 'black',
    borderStyle: 'solid' as 'solid',
    margin: 16,
    right: 5,
    bottom: 4,
    zIndex: 99,
};
// Avatar row notification
export const AvatarNotification = {
    position: 'relative' as 'relative',
    height: 11,
    width: 11,
    bottom: 65,
    left: 22,
    borderWidth: 1.7,
    borderRadius: 99,
};

export const AvatarNotificationOff = {
    borderColor: 'rgba(255, 0, 0, 0)',
    backgroundColor: 'rgba(255, 0, 0, 0)',
};

export const AvatarNotificationOn = {
    borderColor: 'black',
    backgroundColor: '#E0FF4F',
};

//Dropdown Button
export const DROPDOWN_BUTTON_SIZE = 12;
export const DROPDOWN_BUTTON_COLOR = '#BEF43E';

export const DropdownButton = {
    justifyContent: 'center' as 'center',
    alignItems: 'center' as 'center',
    height: 28,
    width: 28,
    borderWidth: 1.7,
    borderStyle: 'solid' as 'solid',
    borderRadius: 99,
    borderColor: '#BEF43E',
    color: '#BEF43E',
    marginRight: 10,
};

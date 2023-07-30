import { ImageStyle, TextStyle, ViewStyle } from 'react-native';
import { marginBottom } from './spacing';

export const ELLIPSIS_HORIZONTAL_ICON_SIZE = 10;

//Small post
export const container: ViewStyle = {
    marginHorizontal: 2,
};

//Medium post
export const experienceImage: ImageStyle = {
    flex: 1,
    margin: 0.5,
};

export const experienceText: TextStyle = {
    marginStart: 10,
    marginBottom: 2,
    fontSize: 14,
};

export const experienceBottomBar: ViewStyle = {
    flex: 1,
    flexDirection: 'row' as 'row',
    justifyContent: 'space-evenly' as 'space-evenly',
    marginVertical: 10,
};

export const experienceTopBar: ViewStyle = {
    flex: 1,
    flexDirection: 'row' as 'row',
    alignItems: 'center' as 'center',
    marginVertical: 5,
    marginStart: 10,
};

export const optionOverflowContainer: ViewStyle = {
    flex: 1,
    flexDirection: 'row' as 'row',
    justifyContent: 'space-between' as 'space-between',
};
// justifyContent: 'flex-end' as 'flex-end'

//Large post
export const largePostCardContainer: ViewStyle = {
    flex: 1,
    alignItems: 'center' as 'center',
    justifyContent: 'center',
    width: '100%',
};

export const visionTopBar: ViewStyle = {
    flexDirection: 'row' as 'row',
    justifyContent: 'flex-end' as 'flex-end',
    alignItems: 'flex-end' as 'flex-end',
    marginVertical: 15,
};

export const visionImageContainer: ViewStyle = {
    //height: '100%',
    // maxHeight: 400,
    // maxWidth: 400,
    marginBottom: 5,
    alignItems: 'center',
};

export const visionImage: ImageStyle = {
    //   maxWidth: 400,
    //   maxHeight: 400,
    width: '100%',
};

export const visionActionBtnContainer: ViewStyle = {
    flex: 1,
    flexDirection: 'row' as 'row',
    justifyContent: 'center' as 'center',
    alignItems: 'center' as 'center',
};
export const visionActionBtn: ViewStyle = {
    flexDirection: 'row' as 'row',
    justifyContent: 'space-between' as 'space-between',
    // flexGrow: 0,
};
export const likedByContainer: ViewStyle = {
    flexDirection: 'row' as 'row',
    alignItems: 'center' as 'center',
};
export const likedByText: ViewStyle = {
    marginRight: 6,
};
export const visionBottomBarContainer: ViewStyle = {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    paddingHorizontal: 18,
    paddingTop: 80,
    paddingBottom: 8,
};
export const visionBottomBar: ViewStyle = {
    width: '94%',
    flexDirection: 'row' as 'row',
    justifyContent: 'space-between' as 'space-between',
};
export const postingUserContainer: ViewStyle = {
    flexDirection: 'row' as 'row',
    alignItems: 'center' as 'center',
    marginVertical: 5,
    flexGrow: 1,
};

//PostOptionsBottomSheet
export const actionContainer: ViewStyle = {
    flexDirection: 'row' as 'row',
    alignItems: 'center' as 'center',
    width: '80%',
    height: '18%',
    marginLeft: 10,
};

export const postMenuScreenModelText: TextStyle = {
    fontSize: 20,
    marginLeft: 21,
};

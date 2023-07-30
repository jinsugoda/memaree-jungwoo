import {
    Dimensions,
    ImageStyle,
    Platform,
    StyleProp,
    StyleSheet,
    TextStyle,
    ViewStyle,
} from 'react-native';

export const navBar: ViewStyle = {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
};

export const switchGroup: ViewStyle = {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
};

export const textInput: TextStyle = {
    // backgroundColor: "#EFF0F6",
    backgroundColor: 'white',
    marginBottom: 16,
};

export const textInputOutline: TextStyle = {
    borderWidth: 1,
    borderColor: '#D0E6E6',
    borderRadius: 16,
};

export const container: ViewStyle = {
    paddingHorizontal: 16,
};

export const safeAreaProvider: ViewStyle = {
    flex: 1,
    backgroundColor: 'white',
};

export const imageContainer: ViewStyle = {
    flex: 1,
    marginVertical: 24,
};

export const image: ImageStyle = {
    borderRadius: 4,
    flex: 1,
    width: '100%',
    height: undefined,
};

export const taggedUsers: ViewStyle = {
    flexDirection: 'row',
    marginBottom: 20,
};

export const taggedUserList: ViewStyle = {
    flexDirection: 'row',
};

export const tag: TextStyle = {
    color: '#1C1B1F',
    backgroundColor: '#BEF43E',
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 16,
    margin: 2,
};

export const memareeText: TextStyle = {
    marginRight: 15,
};

export const avatarsRowContainer: ViewStyle = {
    marginBottom: 15,
};

export const peopleStyle: TextStyle = {
    marginBottom: 9,
};

export const searchInput: ViewStyle = {
    backgroundColor: '#DCEBED',
    height: 42,
    borderRadius: 16,
    shadowColor: 'transparent',
    shadowOffset: {
        width: 0,
        height: 0,
    },
    shadowOpacity: 0,
    shadowRadius: 0,
    marginBottom: 15,
};

export const switchInput: ViewStyle = {
    transform: Platform.OS === 'android' ? [{ scaleX: 1.5 }, { scaleY: 1.5 }] : [],
};

export const actions: ViewStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',

    width: '100%',

    // paddingTop: 24,
    // paddingBottom: 32,
    // borderTopWidth: 2,
    // borderColor: '#D0E6E6'
};

export const action: ViewStyle = {
    justifyContent: 'center' as 'center',
    width: '45%',
    height: 50,
    borderRadius: 100,
    borderWidth: 2,
};

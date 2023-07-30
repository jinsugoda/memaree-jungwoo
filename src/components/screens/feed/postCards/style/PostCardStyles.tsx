import { ImageStyle, TextStyle, ViewStyle } from 'react-native';

export const container: ViewStyle = {
    flex: 1,
    paddingHorizontal: 16,
};

export const imageContainer: ViewStyle = {
    flex: 0,
    width: '100%',
    marginBottom: 12,
};

export const image: ImageStyle = {
    flex: 0,
    borderRadius: 16,
};

export const userContainer: ViewStyle = {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
};

export const bodyText: TextStyle = {
    marginStart: 5,
    marginBottom: 2,
    fontSize: 12,
};

export const footerHead: ViewStyle = {
    flexDirection: 'row',
    marginBottom: 12,
};

export const divider: ViewStyle = { marginVertical: 24 };

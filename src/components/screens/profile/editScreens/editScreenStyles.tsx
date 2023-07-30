import { TextStyle, ViewStyle } from 'react-native';

export const inputLabel: TextStyle = {};

export const input: TextStyle = {
    fontSize: 17,
    backgroundColor: '#2F2F2F',
    borderRadius: 6,
    marginBottom: 10,
    padding: 16,
    fontFamily: 'Outfit-Bold',
};

export const inputGroup: ViewStyle = {
    marginBottom: 16,
};

export const inputHead: ViewStyle = {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 8,
};

export const inputCounter: TextStyle = {
    fontSize: 11,
    color: '#D9D9D9',
};

export const inputError: TextStyle = {
    color: 'red',
};

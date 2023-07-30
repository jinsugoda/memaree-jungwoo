import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

// types
import { RootState } from 'store/store';

const persistConfig = {
    key: 'user',
    storage: AsyncStorage,
    whitelist: ['_id', 'username'],
};

const initialState = {
    _id: null,
    username: null,
    displayName: null,
    rememberedPosts: [],
    bio: 'Enter your biography here.',
    profilePicUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg',
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            const { _id, username, rememberedPosts, profilePicUrl, displayName } = action.payload;
            // console.log(action.payload)
            state._id = _id;
            state.username = username;
            state.displayName = displayName;
            state.rememberedPosts = rememberedPosts ? rememberedPosts : [];
            state.profilePicUrl = profilePicUrl;
            state.bio = action.payload?.bio ? action.payload?.bio : initialState.bio;
        },
        resetUserToInitial: (state) => {
            state = initialState;
        },
        toggleRememberedPost(state, action: PayloadAction<string>) {
            const postId = action.payload;
            const index = state.rememberedPosts.indexOf(postId);
            // console.log(state.rememberedPosts)
            if (index === -1) {
                state.rememberedPosts.push(postId);
            } else {
                state.rememberedPosts.splice(index, 1);
            }
        },
        setUserProfilePicUrl(state, action: PayloadAction<string>) {
            state.profilePicUrl = action.payload;
        },
        setUserBio(state, action: PayloadAction<string>) {
            state.bio = action.payload;
        },
        deleteUser: () => {
            return null;
        },
    },
});

export const selectUser = (state: RootState) => {
    return state.user;
};
export const selectUserId = (state: RootState) => {
    return state.user?._id;
};

export const selectUserBio = (state: RootState) => {
    return state.user?.bio;
};

export const selectIsPostRemembered = (postId: string) => (state: RootState) => {
    // console.log(state.user)
    return state.user?.rememberedPosts?.includes(postId);
};

export const {
    setUser,
    resetUserToInitial,
    toggleRememberedPost,
    setUserProfilePicUrl,
    setUserBio,
} = userSlice.actions;

const persistedUserReducer = persistReducer(persistConfig, userSlice.reducer);
export default persistedUserReducer;

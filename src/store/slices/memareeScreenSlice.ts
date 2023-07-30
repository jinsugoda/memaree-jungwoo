import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    remembered: false,
};

const searchSlice = createSlice({
    name: 'memareeScreen',
    initialState,
    reducers: {
        setRemembered: (state, action) => {
            state.remembered = action.payload;
        },
    },
});

export const { setRemembered } = searchSlice.actions;

export default searchSlice.reducer;

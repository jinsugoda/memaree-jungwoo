import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userInput: '',
};

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setUserInput: (state, action) => {
            state.userInput = action.payload;
        },
    },
});

export const { setUserInput } = searchSlice.actions;

export default searchSlice.reducer;

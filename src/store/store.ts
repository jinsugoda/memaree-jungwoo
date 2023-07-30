import { configureStore } from '@reduxjs/toolkit';
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistStore } from 'redux-persist';

// slices
import persistedUserReducer from './slices/userSlice';
import searchReducer from './slices/searchSlice';
import memareeScreenReducer from './slices/memareeScreenSlice';
// Redux Thunk is included by default with toolkit
const store = configureStore({
    reducer: {
        user: persistedUserReducer,
        // auth: authReducer,
        search: searchReducer,
        memaree: memareeScreenReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

const persistor = persistStore(store);

export { store, persistor };
export type RootState = ReturnType<typeof store.getState>;

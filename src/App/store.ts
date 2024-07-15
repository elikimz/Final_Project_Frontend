import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { UserAPI } from '../Features/users/usersAPI';
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist/es/constants';
import { registerAPI } from '../Features/register/RegisterAPI'
import { loginAPI } from "../Features/login/login.API";
import { SpecsAPI } from "../Features/cars_specifications/spectAPI";


const persistConfig = {
    key: 'root',
    storage,
};

const rootReducer = combineReducers({
    [UserAPI.reducerPath]: UserAPI.reducer,
    [registerAPI.reducerPath]: registerAPI.reducer,
    [loginAPI.reducerPath]: loginAPI.reducer,
    [SpecsAPI.reducerPath] : SpecsAPI.reducer
    
    // Add other reducers here
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(UserAPI.middleware, registerAPI.middleware, loginAPI.middleware ,SpecsAPI.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

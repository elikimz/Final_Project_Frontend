import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { UserAPI } from '../Features/users/usersAPI';
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist/es/constants';
import { registerAPI } from '../Features/register/RegisterAPI'
import { loginAPI } from "../Features/login/login.API";
import { SpecsAPI } from "../Features/cars_specifications/spectAPI";
import {BookingAPI} from "../Features/Bookings/bookingAPI"
import {VehicleAPI} from "../Features/Vehicles/vehicleAPI"
import {LocationAPI} from "../Features/locations/locationAPI"
import {CustomerSupportTicketsAPI} from "../Features/customer_support_ticket/customersupportAPI"
import {FleetManagementAPI}  from "../Features/FleetManagement/fleetAPI"
import {PaymentsAPI } from "../Features/payment/paymentAPI"

const persistConfig = {
    key: "root",
    storage,
};

const rootReducer = combineReducers({
    [UserAPI.reducerPath]: UserAPI.reducer,
    [registerAPI.reducerPath]: registerAPI.reducer,
    [loginAPI.reducerPath]: loginAPI.reducer,
    [SpecsAPI.reducerPath] : SpecsAPI.reducer,
    [BookingAPI.reducerPath]: BookingAPI.reducer,
    [VehicleAPI.reducerPath] :VehicleAPI.reducer,
    [LocationAPI.reducerPath] :LocationAPI.reducer,
    [CustomerSupportTicketsAPI.reducerPath] : CustomerSupportTicketsAPI.reducer,
    [FleetManagementAPI.reducerPath] : FleetManagementAPI.reducer,
    [PaymentsAPI.reducerPath] :PaymentsAPI.reducer,    // Add other reducers here
    
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
        }).concat(UserAPI.middleware, registerAPI.middleware, loginAPI.middleware ,SpecsAPI.middleware ,BookingAPI.middleware ,VehicleAPI.middleware ,LocationAPI.middleware,CustomerSupportTicketsAPI.middleware,FleetManagementAPI.middleware,CustomerSupportTicketsAPI.middleware,PaymentsAPI.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

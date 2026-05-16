import { configureStore } from '@reduxjs/toolkit';
import servicesReducer from './servicesSlice';
import formReducer from './formSlice';

export const store = configureStore({
    reducer: {
        services: servicesReducer,
        form: formReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
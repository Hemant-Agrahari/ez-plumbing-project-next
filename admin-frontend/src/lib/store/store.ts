// src/lib/store.ts
import { configureStore } from '@reduxjs/toolkit';
import modalReducer from '@/lib/features/modal/modalSlice';
import selectedImageReducer from '@/lib/features/selectedImageSlice/selectedImageSlice';
import pagesReducer from '@/lib/features/pagesSlice/pagesSlice';
import permissionsReducer from '@/lib/features/permissionsSlice/permissionSlice';

export const createStore = () => {
    return configureStore({
        reducer: {
            modal: modalReducer,
            selectedImage: selectedImageReducer,
            permissions: permissionsReducer,
            pages: pagesReducer,
        },
    });
};

export type AppStore = ReturnType<typeof createStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

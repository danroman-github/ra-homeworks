import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormState, Service } from '../types';

const initialState: FormState = {
    name: '',
    price: '',
    editingId: null,
    errors: {},
};

const formSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
        setFormField: (state, action: PayloadAction<{ field: 'name' | 'price'; value: string }>) => {
            state[action.payload.field] = action.payload.value;
            // Clear error for this field when user starts typing
            if (state.errors[action.payload.field]) {
                delete state.errors[action.payload.field];
            }
        },
        startEditing: (state, action: PayloadAction<{ service: Service }>) => {
            state.name = action.payload.service.name;
            state.price = action.payload.service.price.toString();
            state.editingId = action.payload.service.id;
            state.errors = {};
        },
        cancelEditing: (state) => {
            state.name = '';
            state.price = '';
            state.editingId = null;
            state.errors = {};
        },
        clearForm: (state) => {
            state.name = '';
            state.price = '';
            state.editingId = null;
            state.errors = {};
        },
        setValidationError: (state, action: PayloadAction<{ field: string; error: string }>) => {
            state.errors[action.payload.field as keyof typeof state.errors] = action.payload.error;
        },
        clearValidationErrors: (state) => {
            state.errors = {};
        },
    },
});

export const {
    setFormField,
    startEditing,
    cancelEditing,
    clearForm,
    setValidationError,
    clearValidationErrors,
} = formSlice.actions;
export default formSlice.reducer;
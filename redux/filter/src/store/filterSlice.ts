import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilterState } from '../types';

const initialState: FilterState = {
    searchTerm: '',
};

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setSearchTerm: (state, action: PayloadAction<string>) => {
            state.searchTerm = action.payload;
        },
        clearSearch: (state) => {
            state.searchTerm = '';
        },
    },
});

export const { setSearchTerm, clearSearch } = filterSlice.actions;
export default filterSlice.reducer;
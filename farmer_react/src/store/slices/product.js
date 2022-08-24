import { createSlice } from '@reduxjs/toolkit';

export const productSlice = createSlice({
    name: 'product',
    initialState: {
        hashTag: '0',
        tableSelect: {
            type: null,
            status: null,
            inventory: null,
        },
    },
    reducers: {
        toggleHashTag: (state, action) => {
            const hashTagKey = `${action.payload}`;
            if (state.hashTag === hashTagKey) {
                state.hashTag = '0';
            } else {
                state.hashTag = hashTagKey;
            }
        },
        clearHashTag: (state, action) => {
            state.hashTag = '0';
        },
        updateTableSelect: (state, action) => {
            // updateTableSelect({ type: 1 })
            const prev = state.tableSelect;
            const newValue = action.payload;
            state.tableSelect = {
                ...prev,
                ...newValue,
            };
        },
    },
});

export default productSlice.reducer;
export const { toggleHashTag, updateTableSelect, clearHashTag } =
    productSlice.actions;

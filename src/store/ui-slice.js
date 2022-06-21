import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        alert: {
            open: false,
            message: '',
            type: 'success'
        }
    },
    reducers: {
        alert(state, action) {
            state.alert = { ...action.payload };
        }
    }
});

export const uiActions = uiSlice.actions;

export default uiSlice;
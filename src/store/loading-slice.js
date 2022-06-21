import { createSlice } from "@reduxjs/toolkit";

const loadingSlice = createSlice({
    name: 'loading',
    initialState: {status : true},
    reducers: {
        loading(state) {
            state.status = false;
        }
    }
});



export const loadingSliceActions = loadingSlice.actions;

export default loadingSlice;
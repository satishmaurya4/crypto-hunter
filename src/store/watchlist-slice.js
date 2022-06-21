import { createSlice } from "@reduxjs/toolkit";

const watchlistSlice = createSlice({
    name: 'watchlist',
    initialState: {
        watchlist: [],
    },
    reducers: {
        getWatchlist(state, action) {
            state.watchlist = action.payload;
        }
    }
});



export const watchlistActions = watchlistSlice.actions;

export default watchlistSlice;